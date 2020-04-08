from pybrew import *


def yandex_speller_io(_text):
    # «Проверка правописания: Яндекс.Спеллер» http://api.yandex.ru/speller/
    text = _text.replace('γδ', '')

    url = 'https://speller.yandex.net/services/spellservice.json/checkText'
    headers = {}
    params = {
        'text': text
    }

    r = requests.get(url, params=params, headers=headers).json()

    def _make_result(x):
        def _error(code):
            if code == 1:
                return 'Слова нет в словаре.'
            if code == 2:
                return 'Повтор слова.'
            if code == 3:
                return 'Неверное употребление прописных и строчных букв.'
            if code == 4:
                return 'Текст содержит слишком много ошибок.'
            return 'Неизвестная ошибка'

        err = _error(x['code'])

        if err == 'Слова нет в словаре.':
            valid_words = [
                'NToss', 'улуна', 'замурчите', 'Telegram', 'Л-Теанин', 'Теанин', 'часеном', 'часен', 'антиоксиданту'
            ]
            if x['word'].lower() in (x.lower() for x in valid_words):
                return

        return {
            'error': err,
            'word': x['word'],
            'hints': x['s']
        }

    return comp(list, filterempty)(_make_result(x) for x in r)


if __name__ == "__main__":
    print('Hello gramma')
