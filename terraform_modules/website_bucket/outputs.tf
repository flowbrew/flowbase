output "website_endpoint" {
  value       = aws_s3_bucket.bucket.website_endpoint
  description = "Website endpoint"
}