from pybrew import *


@try_n_times_decorator(5, 10)
def glvrd_proofread_io(text, use_cache=True):
    url = 'https://glvrd.ru/api/v0/@proofread/'
    headers = {}
    content = {
        'chunks': text
    }

    r = requests.post(url, data=content, headers=headers).json()

    total_length = comp(len, re.sub)(
        r'[А-Яа-яA-Za-z0-9-]+([^А-Яа-яA-Za-z0-9-]+)?',
        '.',
        text.strip('\n').strip()
    )

    def _process_fragment(text, hints, fragment):
        hint = hints[fragment['hint']]
        text_ = text[fragment['start']:fragment['end']]

        if (hint['name'] == 'Неверное использование косой черты'):
            return
        if (text == 'Шуршащий венчик в подарок'):
            return
        if ('Оплата после того, как вы попробуете чай' in text):
            return
        if (hint['name'] == 'Необъективная оценка' and
                text_.lower() == 'простуда'):
            return
        if (hint['name'] == 'Необъективная оценка' and
                text_.lower() == 'простуда'):
            return
        if (hint['name'] == 'Предлог «от»'):
            return
        if (hint['name'] == 'Канцеляризм' and
                text_.lower() == 'лицо'):
            return
        if (hint['name'] == 'Возможно, причастие' and
                text_.lower() == 'шуршащий'):
            return

        return {
            'tab': hint['tab'],
            'penalty': hint['penalty'],
            'weight': hint['weight'],
            'name': hint['name'],
            'text': text_,
        }

    hints_ = comp(list, filterempty)([
        _process_fragment(text, r['hints'], x)
        for x in chain_(r['fragments'])
    ])

    def _calc_score(hints_, tab):
        penalty, weight_ = pipe(
            hints_,
            filter(lambda x: x['tab'] == tab),
            map(lambda x: (x['penalty'], x['weight'])),
            reduce(lambda x, y: (x[0] + y[0], x[1] + y[1]), (0.0, 0.0)),
            tuple
        )

        weight = weight_ / 100

        score1 = (
            math.floor(100.0 * math.pow(1.0 - weight /
                                        total_length, 3)) - penalty
        )

        return min(max(score1, 0.0), 100.0) / 10.0

    return {
        'red': _calc_score(hints_, 'red'),
        'blue': _calc_score(hints_, 'blue'),
        'hints': sorted(
            hints_,
            key=lambda x: x['weight'] + x['penalty'],
            reverse=True
        )
    }


if __name__ == "__main__":
    print('Hello glvrd')
