import os
import sys

base_path = os.path.dirname(__file__)
sys.path.append(base_path + "/lib")

#

import json
from toolz import compose, curry, pipe
from toolz.curried import map


# import boto3
# from botocore.exceptions import ClientError


def lambda_handler(event, context):
    
    # params = json.loads(event.get("body", dict()))

    res = pipe(
        'hello world',
        map(lambda x: x + x),
        lambda x: ''.join(x)
    )

    return {
        'statusCode': 200,
        'body': json.dumps({'result': res}),
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    }
