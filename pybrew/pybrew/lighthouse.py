from pybrew import *


# @try_n_times_decorator(n=3, timeout=15)
def _google_pagespeed_io(
    google_pagespeed_key,
    url,
    category,
    is_mobile=False
):
    api_url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
    headers = {
        'Accept': 'application/json',
    }
    params = {
        'url': url,
        'category': category,
        'strategy': 'mobile' if is_mobile else 'desktop',
        'key': google_pagespeed_key,
    }

    r = requests.get(api_url, params=params, headers=headers).json()

    depricated = [
        # 'first-cpu-idle'
    ]

    return {
        k: v for k, v in r['lighthouseResult']['audits'].items() if
        k not in depricated and v['score'] is not None
    }


def google_test_page_speed_io(**kwarg):
    return _google_pagespeed_io(category='performance', **kwarg)


def google_test_page_seo_io(**kwarg):
    return _google_pagespeed_io(category='seo', **kwarg)


if __name__ == "__main__":
    print('Hello lighthouse')
