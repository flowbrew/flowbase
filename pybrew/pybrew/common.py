import os
import re
import json
import math

import requests

from toolz import compose, curry, pipe
from toolz.functoolz import identity
from toolz.curried import map

from itertools import chain

from functools import reduce as reduce_

filter = curry(filter)
filterempty = filter(identity)

comp = compose


def chain_(x): return chain(*x)


@curry
def reduce(f, initializer, iterable):
    return reduce_(f, iterable, initializer)


def files_io(path):
    for r, _, fs in os.walk(path):
        for f in fs:
            yield os.path.join(r, f)


def try_n_times_decorator(n=5, timeout=5):
    def helper1(f):
        def helper2(*args, **kwargs):
            for i in range(n):
                try:
                    return f(*args, **kwargs)
                except:
                    if i >= n - 1:
                        raise
                    time.sleep(timeout)
        return helper2
    return helper1
