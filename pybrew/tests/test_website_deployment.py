import os
import pytest
import re

from pybrew import *
from pybrew.lighthouse import google_test_page_speed_io, google_test_page_seo_io


def test_website_performance_io(WEBSITE_URL):
    def ___test_io(f, url, is_mobile):
        _f = comp(
            partial(sorted, key=lambda x: x[1]['score']),
            lambda x: x.items(),
            f
        )
        for name, audit in _f(
            google_pagespeed_key=secret_io('GOOGLE_PAGESPEED_KEY'),
            url=url,
            is_mobile=is_mobile,
        ):
            if name == 'uses-long-cache-ttl':
                assert audit['score'] >= 0.3

            elif name == 'max-potential-fid':
                assert audit['score'] >= 0.5

            elif name == 'is-crawlable':
                if 'www.' in WEBSITE_URL:
                    assert audit['score'] >= 0.75

            elif is_mobile and name == 'first-contentful-paint-3g':
                assert audit['score'] >= 0.3

            elif is_mobile and name == 'first-cpu-idle':
                assert audit['score'] >= 0.4

            elif is_mobile and name == 'estimated-input-latency':
                assert audit['score'] >= 0.0

            elif is_mobile and name == 'interactive':
                assert audit['score'] >= 0.4

            elif is_mobile and name == 'mainthread-work-breakdown':
                assert audit['score'] >= 0.6

            elif is_mobile and name == 'max-potential-fid':
                if url.endswith('checkout.html'):
                    assert audit['score'] >= 0.3
                else:
                    assert audit['score'] >= 0.4

            elif is_mobile and name == 'first-meaningful-paint':
                assert audit['score'] >= 0.7

            elif is_mobile and name == 'third-party-summary':
                assert audit['details']['summary']['wastedMs'] < 650

            elif is_mobile and name == 'total-blocking-time':
                assert audit['score'] >= 0.6

            else:
                assert audit['score'] >= 0.75

    tests = product(
        [google_test_page_speed_io, google_test_page_seo_io],
        [
            'https://' + WEBSITE_URL
        ],
        [False, True],
    )

    [___test_io(*x) for x in tests]
