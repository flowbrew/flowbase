FROM python:3.8.1

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get update && apt-get install -y --no-install-recommends \
        wget \
        unzip \
        webp \
        && rm -rf /var/lib/apt/lists/*

# Terraform
RUN wget --quiet https://releases.hashicorp.com/terraform/0.12.21/terraform_0.12.21_linux_amd64.zip \
        && unzip terraform_0.12.21_linux_amd64.zip \
        && mv terraform /usr/bin \
        && rm terraform_0.12.21_linux_amd64.zip

# AWS
RUN pip3 --no-cache-dir install --upgrade awscli

# Node
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 10.19.0
RUN mkdir -p $NVM_DIR && curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
RUN node -v
RUN npm -v

#  Gatsby
RUN npm install -g gatsby-cli && gatsby telemetry --disable

# Deps
COPY /gatsbybrew/package*.json /flowbase/gatsbybrew/
RUN cd /flowbase/gatsbybrew && npm install && cd ../../

# Context
WORKDIR /flowbase
COPY . /flowbase
