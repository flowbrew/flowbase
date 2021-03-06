ARG BACKEND_PYTHON_VERSION=3.8
ARG BACKEND_AWS_PROFILE=default
ARG BACKEND_AWS_REGION=eu-west-1

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG CLOUDFLARE_API_TOKEN
ARG BRANCH
ARG SHA

# 

FROM hashicorp/terraform:light AS terraform-base
RUN apk add --no-cache gettext
ARG AWS_ACCESS_KEY_ID
ENV AWS_ACCESS_KEY_ID $AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ENV AWS_SECRET_ACCESS_KEY $AWS_SECRET_ACCESS_KEY
ARG BRANCH
ENV BRANCH $BRANCH 
ARG BACKEND_AWS_PROFILE
ENV BACKEND_AWS_PROFILE $BACKEND_AWS_PROFILE
ARG BACKEND_AWS_REGION
ENV BACKEND_AWS_REGION $BACKEND_AWS_REGION
ARG CLOUDFLARE_API_TOKEN
ENV CLOUDFLARE_API_TOKEN $CLOUDFLARE_API_TOKEN
ARG BACKEND_PYTHON_VERSION
ENV BACKEND_PYTHON_VERSION $BACKEND_PYTHON_VERSION
WORKDIR /flowbase/terrabrew
COPY terrabrew/modules ./modules

# 

FROM terraform-base AS destroyer
COPY terrabrew/roots/ ./roots/

WORKDIR /flowbase/terrabrew/roots/frontend
RUN     envsubst < main.tfx | tee main.tf && \
        terraform init && terraform destroy -auto-approve

WORKDIR /flowbase/terrabrew/roots/backend
RUN     envsubst < main.tfx | tee main.tf && \
        terraform init && terraform destroy -auto-approve
