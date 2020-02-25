locals {
  branch             = "master"
  domain             = "matchaharmony.ru"
  cloudflare_zone_id = "201b8a9c3f715c567326b99e6d7a3080"
}

provider "aws" {
  profile = "default"
  region  = "eu-west-1"
}

provider "cloudflare" {
  version = "~> 2.0"
}

# -----

module "lambda" {
  source         = "./terraform_modules/lambda"
  path_to_lambda = "./lambda"
  name           = format("flowbase_lambda_%s", local.branch)
}

module "distribution" {
  source               = "./terraform_modules/website_bucket"
  path_to_distribution = "./public"
  name                 = format("flowbase-distribution-%s", local.branch)
}

resource "cloudflare_record" "root" {
  zone_id = local.cloudflare_zone_id
  name    = local.domain
  value   = module.distribution.website_endpoint
  type    = "CNAME"
}

resource "cloudflare_record" "www" {
  zone_id = local.cloudflare_zone_id
  name    = "www"
  value   = module.distribution.website_endpoint
  type    = "CNAME"
}

# -----

output "rest_api_url" {
  value = module.lambda.rest_api_url
}

output "website_endpoint" {
  value = module.distribution.website_endpoint
}
