import io
import os
import re

from setuptools import find_packages
from setuptools import setup

with open('requirements.txt') as f:
    requirements = f.read().splitlines()

setup(
    name="pybrew",
    version="0.1.0",
    url="https://github.com/flowbrew/flowbase",
    license='MIT',
    author="Aleksey Kozin",
    author_email="cirnotoss@gmail.com",
    description="Flow Brew python tools",
    packages=find_packages(exclude=('tests',)),
    install_requires=requirements,
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
    ],
)
