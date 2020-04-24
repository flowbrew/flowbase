import os
import pytest
import re

from pybrew import *
from pybrew.gramma import yandex_speller_io
from pybrew.glvrd import glvrd_proofread_io

import html2text

# HELPRES

import requests_cache
requests_cache.install_cache(
    'flb_cache',
    allowable_methods=('GET', 'POST')
)


def all_texts_io(path):
    def _check(txt):
        return not any(
            x in txt for x in [
                'ОтзывыЧастые',
                'НазадКупить',
                'Купить',
                '/2020'
            ]
        )

    h = html2text.HTML2Text()
    h.ignore_links = True
    h.ignore_images = True
    h.body_width = 0

    def _get_text_io(path):
        if any(x in path for x in [
            'политика+конфиденциальности',
            'quiz'
        ]):
            return

        with open(path, 'rb') as f:
            html = f.read().decode('utf-8')

            chunks = pipe(
                (
                    h.handle(html)
                    .replace('#', ' ')
                    .replace('*', ' ')
                    .replace('()', ' ')
                    .replace(r'\.', ' ')
                    .split('\n')
                ),
                map(lambda x: x.strip()),
                filterempty,
                filter(_check),
                list
            )

            return (path, chunks)

    return filterempty(
        _get_text_io(x) for x in files_io(path) if x.endswith('.html')
    )

# TESTS


def test_texts_with_yandex_speller_io(WEBSITE_BUILD_PATH):

    def __validate_io(path, text):
        r = yandex_speller_io(text)
        if len(r) == 0:
            return True
        print(r)
        return False

    assert all(
        all(x)
        for x in [
            [__validate_io(path, text) for text in texts]
            for path, texts in all_texts_io(WEBSITE_BUILD_PATH)
        ]
    )


def test_texts_with_glvrd_io(WEBSITE_BUILD_PATH):
    def __validate_io(path, text):
        r = glvrd_proofread_io(text)
        assert r['red'] >= 7.9
        assert r['blue'] >= 7.9

    [
        [__validate_io(path, text) for text in texts]
        for path, texts in all_texts_io(WEBSITE_BUILD_PATH)
    ]
