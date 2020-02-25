locals {
  main_path         = format("%s/main.py", var.path_to_lambda)
  requirements_path = format("%s/requirements.txt", var.path_to_lambda)
  lib_path          = format("%s/lib", var.path_to_lambda)
  zip_path          = format("%s/lambda.zip", var.path_to_lambda)
  arp_path          = format("%s/assume_role_policy.json", var.path_to_lambda)
  policy_path       = format("%s/policy.json", var.path_to_lambda)
}

resource "null_resource" "pip" {
  triggers = {
    main         = filebase64sha256(local.main_path)
    requirements = filebase64sha256(local.requirements_path)
  }

  provisioner "local-exec" {
    command = format(
      "rm -rf %s && pip3 install -r %s -t %s",
      local.lib_path,
      local.requirements_path,
      local.lib_path
    )
  }
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = var.path_to_lambda
  output_path = local.zip_path
  excludes = [
    "requirements.txt",
    "lambda.zip",
    "policy.json",
    "assume_role_policy.json"
  ]

  depends_on = [null_resource.pip]
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = format("role_%s", var.name)
  assume_role_policy = file(local.arp_path)
}

resource "aws_lambda_function" "lambda" {
  function_name    = var.name
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = "python3.8"
  handler          = "main.lambda_handler"
  timeout          = 60
  role             = aws_iam_role.iam_for_lambda.arn
}

resource "aws_iam_policy" "lambda_policy" {
  name        = format("policy_%s", var.name)
  path        = "/"
  description = format("IAM policy for - %s", var.name)
  policy      = file(local.policy_path)
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

# --------- API START

# This thing will aggregate and hold API data before deployment
resource "aws_api_gateway_rest_api" "lambda_api" {
  name        = format("api_%s", var.name)
  description = format("Serverless Application API for - %s", var.name)
}

# Allow root path
resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = aws_api_gateway_rest_api.lambda_api.id
  resource_id   = aws_api_gateway_rest_api.lambda_api.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}
resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id = aws_api_gateway_rest_api.lambda_api.id
  resource_id = aws_api_gateway_method.proxy_root.resource_id
  http_method = aws_api_gateway_method.proxy_root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda.invoke_arn
}

# Allow all other paths
resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.lambda_api.id
  parent_id   = aws_api_gateway_rest_api.lambda_api.root_resource_id
  path_part   = "{proxy+}"
}
resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.lambda_api.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}

# Connecting API tp lambda
resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = aws_api_gateway_rest_api.lambda_api.id
  resource_id = aws_api_gateway_method.proxy.resource_id
  http_method = aws_api_gateway_method.proxy.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda.invoke_arn
}

# Permission for API to invoke lambda
resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = join(
    "",
    [aws_api_gateway_rest_api.lambda_api.execution_arn, "/*/*"]
  )
}

# The deployment of API itself
resource "aws_api_gateway_deployment" "lambda_gateway" {
  rest_api_id = aws_api_gateway_rest_api.lambda_api.id

  depends_on = [
    aws_api_gateway_integration.lambda,
    aws_api_gateway_integration.lambda_root,
  ]

  stage_name = "main"
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = format("/aws/lambda/%s", var.name)
  retention_in_days = 3
}
