ARG BACKEND_PYTHON_VERSION=3.8
ARG BACKEND_AWS_PROFILE=default
ARG BACKEND_AWS_REGION=eu-west-1

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG CLOUDFLARE_API_TOKEN
ARG CLOUDFLARE_ZONE
ARG BRANCH
ARG SHA
ARG YANDEX_BOT_EMAIL
ARG YANDEX_BOT_TOKEN
ARG GOOGLE_PAGESPEED_KEY
ARG TWILIO_AUTH_TOKEN

# 

FROM hashicorp/terraform:latest AS terraform-base
RUN apk add --no-cache gettext curl
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
ARG CLOUDFLARE_ZONE
ENV CLOUDFLARE_ZONE $CLOUDFLARE_ZONE
ARG BACKEND_PYTHON_VERSION
ENV BACKEND_PYTHON_VERSION $BACKEND_PYTHON_VERSION
WORKDIR /flowbase/terrabrew
COPY terrabrew/modules ./modules

# 

FROM python:3.8.2-alpine3.11 AS pybrew
RUN apk add --no-cache \
        util-linux \
        build-base gcc autoconf automake libtool zlib-dev libpng-dev nasm
WORKDIR /flowbase/pybrew
COPY pybrew/requirements.txt .
RUN pip install -r requirements.txt
COPY pybrew/ .
USER root
RUN pip install -e .

# BUILDING BACKEND

FROM python:$BACKEND_PYTHON_VERSION-alpine AS backend-builder
RUN apk add --no-cache zip

WORKDIR /flowbase/lambda/
COPY lambda/requirements.txt .
RUN pip3 install -r requirements.txt -t lib
COPY lambda/ .
RUN zip -r ./output/lambda.zip ./*

# DEPLOYING BACKEND

FROM terraform-base AS backend-deployer
ARG TWILIO_AUTH_TOKEN
ENV TWILIO_AUTH_TOKEN $TWILIO_AUTH_TOKEN
COPY terrabrew/roots/backend ./roots/backend
WORKDIR /flowbase/terrabrew/roots/backend
COPY --from=backend-builder \
        /flowbase/lambda/output/ ./lambda
RUN     envsubst < main.tfx | tee main.tf && \
        terraform init && terraform apply -auto-approve && \
        terraform output rest_api_url > rest_api_url

# BUILDING FRONTEND

FROM node:13.8.0-alpine3.10 AS frontend-builder
ARG BRANCH
ENV GATSBY_BRANCH $BRANCH 
ARG SHA
ENV GATSBY_SHA $SHA 
RUN apk add --no-cache \
        libwebp-tools \
        libjpeg-turbo-utils \
        util-linux \
        build-base gcc autoconf automake libtool zlib-dev libpng-dev nasm
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  apk del native-deps
WORKDIR /flowbase/gatsbybrew
RUN npm install -g gatsby-cli && gatsby telemetry --disable
COPY gatsbybrew/package*.json .
RUN apk add --update python make g++\
   && rm -rf /var/cache/apk/*
RUN npm install

COPY gatsbybrew/ .
COPY --from=backend-deployer \
        /flowbase/terrabrew/roots/backend/rest_api_url rest_api_url
RUN GATSBY_REST_API=$(cat rest_api_url) gatsby build

# TESTING FRONTEND BUILD

FROM pybrew AS build-tester
WORKDIR /flowbase/pybrew
COPY --from=frontend-builder /flowbase/gatsbybrew/public/ ./public/
RUN pytest --runslow \
        --WEBSITE_BUILD_PATH=./public/ \
        ./tests/test_glvrd.py \
        ./tests/test_gramma.py \
        ./tests/test_website_build.py

FROM 18fgsa/html-proofer:latest AS html-proofer
COPY --from=build-tester /flowbase/pybrew/public/ ./public/
RUN htmlproofer ./public/

# DEPLOYING FRONTEND

FROM terraform-base AS frontend-deployer
RUN apk add --no-cache python3 && pip3 install awscli
COPY terrabrew/roots/frontend ./roots/frontend

WORKDIR /flowbase/terrabrew/roots/frontend
COPY /gatsbybrew/routing_rules.json ./public/
COPY --from=html-proofer ./public/ ./public
RUN     envsubst < main.tfx | tee main.tf && \
        terraform init && terraform apply -auto-approve && \
        terraform output website_dns_endpoint > website_url
RUN curl -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE/purge_cache" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data '{"purge_everything":true}'

# E2E TESTS

FROM cypress/browsers:node10.16.0-chrome77 AS e2e-tester
ARG YANDEX_BOT_EMAIL
ENV CYPRESS_YANDEX_BOT_EMAIL $YANDEX_BOT_EMAIL
ARG YANDEX_BOT_TOKEN
ENV CYPRESS_YANDEX_BOT_TOKEN $YANDEX_BOT_TOKEN

WORKDIR /flowbase/cypressbrew
COPY cypressbrew/package*.json .
RUN npm install

COPY cypressbrew/ .
COPY --from=frontend-deployer \
        /flowbase/terrabrew/roots/frontend/website_url website_url
COPY --from=backend-deployer \
        /flowbase/terrabrew/roots/backend/rest_api_url rest_api_url
RUN CYPRESS_WEBSITE_URL=http://$(cat website_url)/ npx cypress run --headless -b chrome

# FROM pybrew AS python-e2e-tester
# ARG GOOGLE_PAGESPEED_KEY
# ENV GOOGLE_PAGESPEED_KEY $GOOGLE_PAGESPEED_KEY
# WORKDIR /flowbase/pybrew
# COPY --from=frontend-deployer \
#         /flowbase/terrabrew/roots/frontend/website_url website_url
# RUN pytest --runslow \
#         --WEBSITE_URL=$(cat website_url) \
#         ./tests/test_lighthouse.py \
#         ./tests/test_website_deployment.py
