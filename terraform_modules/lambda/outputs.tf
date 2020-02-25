output "rest_api_url" {
  value       = aws_api_gateway_deployment.lambda_gateway.invoke_url
  description = "URL to invoke the lambda"
}
