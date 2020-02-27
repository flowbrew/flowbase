locals {
  routing_rules_path = format("%s/routing_rules.json", var.path_to_distribution)
}

resource "aws_s3_bucket" "bucket" {
  bucket        = var.name
  acl           = "public-read"
  force_destroy = true

  website {
    index_document = "index.html"
    error_document = "error.html"
    routing_rules  = file(local.routing_rules_path)
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
