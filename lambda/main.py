import os
import sys

base_path = os.path.dirname(__file__)
sys.path.append(base_path + "/lib")

#

import json
import boto3
import decimal
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')


def product(pid):
    if not pid:
        return
    table = dynamodb.Table("ProductsTable")
    result = table.get_item(Key={'ProductID': pid})
    return {
        'pid': result['Item']['ProductID'],
        'quantity': int(result['Item']['Quantity'])
    }


def decrease_product_quantity(pid, n=1):
    if not pid:
        return
    table = dynamodb.Table("ProductsTable")
    table.update_item(
        Key={'ProductID': pid},
        UpdateExpression="set Quantity = Quantity - :val",
        ConditionExpression="Quantity > :min",
        ExpressionAttributeValues={
            ':val': decimal.Decimal(n),
            ':min': decimal.Decimal(0)
        },
        ReturnValues="UPDATED_NEW"
    )


def email(addr, subject, body):
    SENDER = "Checkout Bot <checkout@flowbrew.ru>"
    RECIPIENT = addr
    AWS_REGION = "us-east-1"
    CHARSET = "UTF-8"

    client = boto3.client('ses', region_name=AWS_REGION)

    try:
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    RECIPIENT,
                ],
            },
            Message={
                'Body': {
                    'Text': {
                        'Charset': CHARSET,
                        'Data': body,
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': subject,
                },
            },
            Source=SENDER,
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
        return False
    else:
        print("Email sent! Message ID:"),
        print(response['MessageId'])
        return True


def on_checkout(params):
    is_test_run = 'TEST PURCHASE' in params.get('comment', '')

    subject = 'Новый заказ от ' + params.get('name', '???')
    params_str = '\n'.join(f'{k} = {v}' for k, v in params.items())
    body = 'Получен новый заказ!\n\n' + params_str

    addr = "bot@flowbrew.ru" if is_test_run else "ak@flowbrew.ru"

    if not email(addr, subject, body):
        return {
            'statusCode': 500,
            'body': json.dumps({'result': 'error'}),
            'headers': {
                'Access-Control-Allow-Origin': '*',
            }
        }

    if not is_test_run:
        try:
            pids = set(
                [x['pid'] for x in params.get('order') if 'pid' in x]
            )
            [decrease_product_quantity(x) for x in pids]
        except Exception as e:
            print('error', e)
            pass

    return {
        'statusCode': 200,
        'body': json.dumps({'result': 'ok'}),
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    }


def on_product(params):
    return {
        'statusCode': 200,
        'body': json.dumps({
            'result': 'ok',
            'product': product(params['pid']),
        }),
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    }


def on_error():
    return {
        'statusCode': 403,
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    }


def lambda_handler(event, context):
    print(event)
    print(context)

    def post_params():
        return json.loads(event.get("body", dict()))

    if event['httpMethod'] == 'POST' and event['path'] == '/checkout':
        return on_checkout(post_params())
    elif event['httpMethod'] == 'GET' and event['path'] == '/product':
        return on_product(event['queryStringParameters'])

    return on_error()
