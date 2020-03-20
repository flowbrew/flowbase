variable "path_to_lambda" {
  description = "Folder with all lambda resources"
  type        = string
}

variable "TWILIO_AUTH_TOKEN" {
  description = "For SMS sending"
  type        = string
}

variable "name" {
  description = "Lambda name"
  type        = string
}

variable "python_version" {
  type = string
}
