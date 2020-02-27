import pytest
import os
import json


def pytest_addoption(parser):
    parser.addoption(
        "--runslow",
        action="store_true",
        default=False,
        help="run slow tests"
    )
    parser.addoption(
        "--WEBSITE_BUILD_PATH",
        action="store",
        default=""
    )
    parser.addoption(
        "--WEBSITE_URL",
        action="store",
        default=""
    )


def pytest_collection_modifyitems(config, items):
    if config.getoption("--runslow"):
        return
    skip_slow = pytest.mark.skip(reason="need --runslow option to run")
    for item in items:
        if "slow" in item.keywords:
            item.add_marker(skip_slow)


@pytest.fixture
def WEBSITE_BUILD_PATH(request):
    return request.config.getoption("--WEBSITE_BUILD_PATH")


@pytest.fixture
def WEBSITE_URL(request):
    return request.config.getoption("--WEBSITE_URL")
