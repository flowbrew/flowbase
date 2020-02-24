# variable "lambda_path" {
#   description = "Path to lambda zip artifact"
# }

# ---------

provider "aws" {
  profile = "default"
  region  = "eu-west-1"
}

# resource "aws_s3_bucket" "dbucket" {
#   bucket = "flowbase-deployment-bucket"
#   acl    = "private"
# }

# --------- LAMBDA

resource "null_resource" "pip" {
  triggers = {
    main         = filebase64sha256("./lambda/main.py")
    requirements = filebase64sha256("./lambda/requirements.txt")
  }

  provisioner "local-exec" {
    command = "pip3 install -r ./lambda/requirements.txt -t ./lambda/lib"
  }
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "./lambda/"
  output_path = "./lambda/lambda.zip"
  excludes = [
    "requirements.txt",
    "lambda.zip",
    "policy.json",
    "assume_role_policy.json"
  ]

  depends_on = [null_resource.pip]
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = file("./lambda/assume_role_policy.json")
}

resource "aws_lambda_function" "flowbase_lambda" {
  function_name    = "flowbase_lambda"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = "python3.8"
  handler          = "main.lambda_handler"
  timeout          = 60
  role             = aws_iam_role.iam_for_lambda.arn
}

resource "aws_iam_policy" "lambda_policy" {
  name        = "lambda_policy"
  path        = "/"
  description = "IAM policy for lambda"
  policy      = file("./lambda/policy.json")
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

# --------- API START

# This thing will aggregate and hold API data before deployment
resource "aws_api_gateway_rest_api" "flowbase" {
  name        = "flowbase_api"
  description = "Flowbase Serverless Application API"
}

# Allow root path
resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = aws_api_gateway_rest_api.flowbase.id
  resource_id   = aws_api_gateway_rest_api.flowbase.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}
resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id = aws_api_gateway_rest_api.flowbase.id
  resource_id = aws_api_gateway_method.proxy_root.resource_id
  http_method = aws_api_gateway_method.proxy_root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.flowbase_lambda.invoke_arn
}

# Allow all other paths
resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.flowbase.id
  parent_id   = aws_api_gateway_rest_api.flowbase.root_resource_id
  path_part   = "{proxy+}"
}
resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.flowbase.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}

# Connecting API tp lambda
resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = aws_api_gateway_rest_api.flowbase.id
  resource_id = aws_api_gateway_method.proxy.resource_id
  http_method = aws_api_gateway_method.proxy.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.flowbase_lambda.invoke_arn
}

# Permission for API to invoke lambda
resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.flowbase_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = join(
    "",
    [aws_api_gateway_rest_api.flowbase.execution_arn, "/*/*"]
  )
}

# The deployment of API itself
resource "aws_api_gateway_deployment" "flowbase" {
  rest_api_id = aws_api_gateway_rest_api.flowbase.id

  depends_on = [
    aws_api_gateway_integration.lambda,
    aws_api_gateway_integration.lambda_root,
  ]

  stage_name = "main"
}

# --------- API END

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/flowbase_lambda"
  retention_in_days = 3
}

# ---------

output "base_url" {
  value = aws_api_gateway_deployment.flowbase.invoke_url
}
