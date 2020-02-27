locals {
  routing_rules_path = format("%s/routing_rules.json", var.path_to_distribution)
  policy_path        = format("%s/policy.json", path.module)
}

resource "aws_s3_bucket" "bucket" {
  bucket        = var.name
  acl           = "public-read"
  force_destroy = true
  policy        = format(file(local.policy_path), var.name)

  website {
    index_document = "index.html"
    error_document = "error.html"
    routing_rules  = file(local.routing_rules_path)
  }

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST"]
    allowed_origins = [
      format("https://%s", var.name),
      format("http://%s", var.name)
    ]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

resource "null_resource" "remove_and_upload_to_s3" {
  depends_on = [aws_s3_bucket.bucket]

  triggers = {
    path_to_distribution = var.path_to_distribution
    timestamp            = timestamp()
  }

  provisioner "local-exec" {
    command = format(
      "aws s3 sync --acl public-read %s s3://%s --delete",
      var.path_to_distribution,
      aws_s3_bucket.bucket.id
    )
  }
}
