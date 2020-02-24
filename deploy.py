#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import tempfile
from path import Path

if __name__ == "__main__":
    pass
    # with tempfile.TemporaryDirectory() as d:
    #     lambda_path = os.path.join(d, 'lambda.zip')

    #     with Path('./lambda'):
    #         os.system(f'zip -r {lambda_path} *')

    #     os.system(
    #         f'terraform apply \
    #             -var="lambda_path={lambda_path}" \
    #             -auto-approve'
    #     )
