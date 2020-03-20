import pytest
from pybrew import *
from pybrew.lighthouse import google_test_page_speed_io


def test_google_pagespeed_io():
    r1 = google_test_page_speed_io(
        google_pagespeed_key=secret_io('GOOGLE_PAGESPEED_KEY'),
        url='https://example.com/'
    )
    assert r1['speed-index']['score'] == 1
    assert 'Speed Index shows' in r1['speed-index']['description']
