ARG BACKEND_PYTHON_VERSION=3.8
ARG BACKEND_AWS_PROFILE=default
ARG BACKEND_AWS_REGION=eu-west-1

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG CLOUDFLARE_API_TOKEN
ARG BRANCH

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

FROM jupyter/datascience-notebook:latest AS pybrew
WORKDIR /flowbase/pybrew
COPY pybrew/requirements.txt .
RUN pip install -r requirements.txt
COPY pybrew/ .
RUN pip install .

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
COPY terrabrew/roots/backend ./roots/backend

WORKDIR /flowbase/terrabrew/roots/backend
COPY --from=backend-builder \
        /flowbase/lambda/output/ ./lambda
RUN     envsubst < main.tfx | tee main.tf && \
        terraform init && terraform apply -auto-approve && \
        terraform output rest_api_url > rest_api_url

# BUILDING FRONTEND

FROM node:13.8.0-alpine3.10 AS frontend-builder
RUN apk add --no-cache \
        libwebp-tools \
        libjpeg-turbo-utils \
        util-linux \
        build-base gcc autoconf automake libtool zlib-dev libpng-dev nasm

WORKDIR /flowbase/gatsbybrew
RUN npm install -g gatsby-cli && gatsby telemetry --disable
COPY gatsbybrew/package*.json .
RUN npm install

COPY gatsbybrew/ .
COPY --from=backend-deployer \
        /flowbase/terrabrew/roots/backend/rest_api_url rest_api_url
RUN GATSBY_REST_API=$(cat rest_api_url) gatsby build

# TEST FRONTEND BUILD

FROM pybrew AS build-tester
WORKDIR /flowbase/pybrew
COPY --from=frontend-builder /flowbase/gatsbybrew/public/ ./public/
RUN pytest --runslow \
        --WEBSITE_BUILD_PATH=./public/ \
        ./tests/test_website_build.py

# DEPLOYING FRONTEND

FROM terraform-base AS frontend-deployer
RUN apk add --no-cache python3 && pip3 install awscli
COPY terrabrew/roots/frontend ./roots/frontend

WORKDIR /flowbase/terrabrew/roots/frontend
COPY /gatsbybrew/routing_rules.json ./public/
COPY --from=build-tester /flowbase/pybrew/public/ ./public
RUN     envsubst < main.tfx | tee main.tf && \
        terraform init && terraform apply -auto-approve && \
        terraform output website_dns_endpoint > website_url

# E2E TESTS

FROM cypress/included:4.0.2 AS e2e-tester
WORKDIR /flowbase/cypressbrew
COPY cypressbrew/package*.json .
RUN npm install

COPY cypressbrew/ .
COPY --from=frontend-deployer \
        /flowbase/terrabrew/roots/frontend/website_url website_url
RUN CYPRESS_WEBSITE_URL=$(cat website_url) cypress run
