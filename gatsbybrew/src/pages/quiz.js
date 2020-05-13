import React, { useEffect } from "react"
import { Link } from "gatsby"
import Cookies from "universal-cookie"
import { makeStyles } from "@material-ui/core/styles"
import {
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Button,
  Grid,
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Fade,
} from "@material-ui/core"
import { CheckCircleOutlineOutlined } from "@material-ui/icons"
import MainLayout from "../layouts/MainLayout"
import {
  mapi,
  H3,
  P,
  ImageBlock,
  useEffectOnlyOnce,
  Strong,
  ScrollToTop,
  UL,
  LI,
  Em,
} from "../common"

import StyledLink from "../components/StyledLink"

const useStyles = makeStyles(theme => ({
  button: {
    minHeight: theme.spacing(8),
  },
}))

const DEFAULT_COOKIE_PARAMS = {
  maxAge: 365 * 24 * 60 * 60,
  path: "/",
}

const saveResults = results => {
  const cookies = new Cookies()

  const old_results = cookies.get("test_first_results")
  let isFirst = false
  if (!old_results) {
    isFirst = true
    cookies.set(`test_first_results`, results, DEFAULT_COOKIE_PARAMS)
  } else if (old_results.join("") == results.join("")) {
    isFirst = true
  }

  results && cookies.set("test_results", results, DEFAULT_COOKIE_PARAMS)

  return isFirst
}

const fetchResults = () => {
  const cookies = new Cookies()
  const results = cookies.get("test_results")
  return results
}

const QuizCard = ({ children, img, title, ratio = 1, noTitle }) => (
  <Box>
    <Container>
      <H3>{title}</H3>
    </Container>
    {img && (
      <Box mt={0} mb={2}>
        <ImageBlock image={img} ratio={ratio} caption={!noTitle} />
      </Box>
    )}
    <Container>{children}</Container>
  </Box>
)

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

const YouAreSpecial = ({ isFirst }) => {
  return (
    <Box>
      <P>
        {isFirst ? "Только " : ""}
        <Strong>
          {(isFirst ? 9.4 : getRandomArbitrary(17.1, 19.5)).toFixed(1)}%
        </Strong>{" "}
        посетителей ответило так же, как и вы.
      </P>
    </Box>
  )
}

const QuizResolution = ({ isFirst = false, entry = "sometimes_taste" }) => {
  const [state, setState] = React.useState({
    page: entry,
  })

  const setPage = x =>
    setState(prevState => {
      return {
        ...prevState,
        page: x,
      }
    })

  const PageButton = ({ label, to }) => (
    <Box mt={2}>
      <Button
        id={`quiz_${to}`}
        type="submit"
        size="large"
        variant="contained"
        color="secondary"
        fullWidth={true}
        onClick={() => setPage(to)}
      >
        {label}
      </Button>
    </Box>
  )

  const pages = {
    alot_taste: (
      <QuizCard
        title="Какой чай матча вам подходит?"
        img="ceremonial_matcha_tea"
      >
        <YouAreSpecial isFirst={isFirst} />
        <P>Вам подходит японский церемониальный сорт чай матча.</P>
        <P>Вы разбираетесь в чае матча, и вам хочется лучшего вкуса.</P>
        <PageButton
          label="Где заказать церемониальный чай матча?"
          to="where_to_order"
        />
        <PageButton
          label="Что такое церемониальный сорт?"
          to="what_is_ceremonial_a"
        />
      </QuizCard>
    ),

    alot_price: (
      <QuizCard title="Какой чай матча вам подходит?" img="matcha_latte">
        <YouAreSpecial isFirst={isFirst} />
        <P>Вам подойдет матча латте из кулинарного сорта.</P>
        <P>Вы разбираетесь в чае матча, и вы ищете доступную цену.</P>
        <PageButton label="Что такое кулинарный сорт?" to="what_is_cooking_a" />
      </QuizCard>
    ),

    // Target market
    sometimes_taste: (
      <QuizCard
        title="Какой чай матча вам подходит?"
        img="ceremonial_matcha_tea"
      >
        <YouAreSpecial isFirst={isFirst} />
        <P>Вам подходит японский церемониальный сорт чай матча.</P>
        <P>
          Вы уже несколько раз пробовали чай матча, и вы цените его вкус и
          добрый тонизирующий эффект.
        </P>
        <PageButton
          label="Где заказать церемониальный чай матча?"
          to="where_to_order"
        />
        <PageButton
          label="Что такое церемониальный сорт?"
          to="what_is_ceremonial_a"
        />
      </QuizCard>
    ),

    sometimes_price: (
      <QuizCard
        title="Какой чай матча вам подходит?"
        img="matcha_latte_3"
        ratio={3 / 2}
      >
        <YouAreSpecial isFirst={isFirst} />
        <P>Вам подойдет матча латте из кулинарного сорта.</P>
        <P>
          Взбитое теплое обычное или кокосовое молоко + заваренный чай матча.
        </P>
        <P>
          Вы уже несколько раз пробовали чай матча, вы цените его вкус и добрый
          тонизирующий эффект, и вы ищете доступную цену.
        </P>
        <PageButton label="Что такое кулинарный сорт?" to="what_is_cooking_a" />
        <PageButton label="Что такое чай матча?" to="what_is_matcha" />
      </QuizCard>
    ),

    // Target market
    never_taste: (
      <QuizCard title="Какой чай матча вам подходит?" img="matcha_latte">
        <YouAreSpecial isFirst={isFirst} />
        <P>
          Если вы ни разу не пробовали чай матча, то вам стоит попробовать матча
          латте из церемониального сорта.
        </P>
        <P>
          Взбитое теплое обычное или кокосовое молоко + заваренный чай матча.
        </P>
        <PageButton
          label="Где заказать церемониальный чай матча?"
          to="where_to_order"
        />
        <PageButton label="Что такое чай матча?" to="what_is_matcha" />
      </QuizCard>
    ),

    never_price: (
      <QuizCard
        title="Какой чай матча вам подходит?"
        img="matcha_latte_3"
        ratio={3 / 2}
      >
        <YouAreSpecial isFirst={isFirst} />
        <P>
          Если вы ни разу не пробовали чай матча, то вам подойдет матча латте из
          кулинарного сорта.
        </P>
        <P>
          Взбитое теплое обычное или кокосовое молоко + заваренный чай матча.
        </P>
        <PageButton label="Что такое чай матча?" to="what_is_matcha" />
        {/* <PageButton label="Что такое кулинарный сорт?" to="what_is_cooking_a" /> */}
      </QuizCard>
    ),

    what_is_matcha: (
      <QuizCard title="Что такое чай матча?" img="leaf">
        <P>
          Чай матча делается из того же растения, что и обычный зеленый чай.
        </P>
        <P>
          Но за 20 дней до сбора урожая чайные кусты затеняют сеткой, из-за
          этого они начинают производить в большом количестве кофеин и ЛТеанин.
        </P>
        <P>
          Затем чайные листочки перемалывают в яркий зеленый чайный порошок.
        </P>
        <P>Чай матча делится на кулинарный и церемониальный сорт.</P>
        <PageButton label="Что такое кулинарный сорт?" to="what_is_cooking_a" />
        <PageButton
          label="Что такое церемониальный сорт?"
          to="what_is_ceremonial_a"
        />
      </QuizCard>
    ),

    what_is_ceremonial_a: (
      <QuizCard title="Что такое церемониальный сорт?" img="matcha_powder">
        <P>
          Церемониальный сорт чая матча изготавливают только из самых лучших
          верхних листочков, с повышенным содержанием Л-Теанина и кофеина.
        </P>
        <P>
          Листочки высушивают, очищают от прожилок и медленно перемалывают
          каменными жерновами. Получается яркий зеленый чайный порошок.
        </P>
        <P>Затем сомелье тщательно проверяет и отбирает чай.</P>
        <P>
          Из-за этого церемониальный сорт чая матча стоит в 10 раз дороже кофе,
          а иногда и в 100.
        </P>
        <P>
          Такой чай имеет выраженный добрый тонизирующий эффект, наполняющий
          тело радостью.
        </P>
        <P>
          Церемониальный сорт имеет божественный яркий вкус. Его пьют как и в
          чистом виде, так и добавляют в напитки.
        </P>
        <PageButton
          label="Где заказать церемониальный чай матча?"
          to="where_to_order"
        />
        {/* <PageButton label="Что такое чай матча?" to="what_is_matcha" /> */}
      </QuizCard>
    ),

    what_is_cooking_a: (
      <QuizCard
        title="Что такое кулинарный сорт чай матча?"
        img="matcha_macarons"
      >
        <P>Чайные листочки высушивают и перемалывают.</P>
        <P>
          Чайный порошок получается желто-зеленого оттенка. По цвету он легко
          отличается от зеленого церемониального сорта.
        </P>
        <P>
          Кулинарный сорт по стоимости на уровне кофе. Из него делают прекрасные
          десерты, смузи или коктейли.
        </P>
        <P>
          Но в чистом виде кулинарный сорт горчит. Такой чай употребляют только
          в комбинации с чем-то другим.
        </P>
        <PageButton
          label="Что такое церемониальный сорт?"
          to="what_is_ceremonial_a"
        />
        <PageButton label="Что такое чай матча?" to="what_is_matcha" />
      </QuizCard>
    ),

    // where_to_try: (
    //   <QuizCard
    //     title="Где попробовать церемониальный чай матча?"
    //     img="matcha_tea_set"
    //     ratio={3 / 2}
    //   >
    //     <P>
    //       В обычное время я порекомендовал бы вам прийти и попробовать чай в
    //       японское матча-кафе. Но сейчас все закрыто из-за карантина.
    //     </P>
    //     <P>
    //       В данный момент единственная возможность – это заказать чай через
    //       интернет.
    //     </P>
    //     <PageButton
    //       label="Где заказать церемониальный чай матча?"
    //       to="where_to_order"
    //     />
    //     <PageButton
    //       label="Что такое церемониальный сорт?"
    //       to="what_is_ceremonial_a"
    //     />
    //   </QuizCard>
    // ),

    where_to_order: (
      <QuizCard
        title="Где заказать церемониальный чай матча?"
        // img="gift_matcha_tea_box_from_front"
        noTitle
      >
        <P>
          Мой магазин специализируется на 100% японском церемониальном
          сорте чая матча.
        </P>
        <P>
          Я настолько уверен в своем чае, что верну вам деньги, если он вам не
          понравится.
        </P>
        <PageButton label="Расскажите мне о вашем чае матча" to="my_matcha" />
        <PageButton
          label="Что такое церемониальный сорт?"
          to="what_is_ceremonial_a"
        />
      </QuizCard>
    ),

    my_matcha: (
      <QuizCard
        title="Церемониальный чай матча"
        img="gift_matcha_tea_box_from_top_ex"
      >
        <P>
          Я продаю тот чай, который сам пьют каждый день – выросший на склонах
          Киото, перемолотый каменными жерновами, отобранный сомелье.
        </P>
        <P>
          Мой чай матча имеет божественный насыщенный растительный вкус,
          кремово-ореховое послевкусие, а также порадует вас сладким ягодным
          ароматом.
        </P>
        <P>
          Уже через 5 минут чай матча наполнит ваше тело доброй энергией, а ваш
          разум радостью.
        </P>
        <P>
          Я настолько уверен в своем чае, что верну вам деньги, если он вам не
          понравится.
        </P>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button
            id="quiz_buy_button"
            size="large"
            variant="contained"
            color="secondary"
            fullWidth={true}
          >
            магазин церемониального чая матча
          </Button>
        </Link>
      </QuizCard>
    ),
  }

  return (
    <Box>
      <QuizTransition step={1} key={Math.random()}>
        <ScrollToTop />
        {pages[state.page]}
      </QuizTransition>
    </Box>
  )
}

const QuizTransition = ({ children, step }) => (
  <Fade in={true} style={{ transitionDelay: `${step * 50}ms` }}>
    <Box>{children}</Box>
  </Fade>
)

const Quiz = () => {
  const [state, setState] = React.useState({
    cq: 0,
    answers: [],
    done: false,
    started: false,
    isFirst: false,
  })

  useEffect(() => {
    if (state.done) {
      const isFirst = saveResults(state.answers)
      setState(prevState => {
        return {
          ...prevState,
          isFirst: isFirst,
        }
      })
    }
  }, [state.done, state.answers])

  // PAYLOAD

  const questions = [
    {
      question: "(1/2) Сколько раз вы пили чай матча?",
      answers: ["Ни разу", "Несколько раз", "Огромное число раз"],
    },
    {
      question: "(2/2) Что для вас важнее?",
      answers: ["Божественный вкус", "Доступная цена"],
    },
  ]

  // END

  const click = answer => {
    setState(prevState => {
      return {
        ...prevState,
        cq: prevState.cq + 1,
        done: prevState.cq + 1 >= questions.length,
        answers: [...prevState.answers, answer],
      }
    })
  }

  const start = () => {
    setState(prevState => {
      return {
        ...prevState,
        started: true,
      }
    })
  }

  const current_question = !state.done ? questions[state.cq] : null

  const QuizButtons = () => (
    <Box>
      <ScrollToTop />
      <Container>
        <QuizTransition step={0}>
          <Box minHeight={120}>
            <H3>{current_question && current_question.question}</H3>
          </Box>
        </QuizTransition>
        <Box mt={6} mb={3}>
          <Grid container spacing={3}>
            {mapi(
              (x, i) => (
                <Grid key={x} item xs={12} sm={12}>
                  <QuizTransition step={i + 1}>
                    <Button
                      id={`quiz_${i}`}
                      type="submit"
                      size="large"
                      variant="contained"
                      color="secondary"
                      fullWidth={true}
                      onClick={() => click(i)}
                    >
                      {x}
                    </Button>
                  </QuizTransition>
                </Grid>
              ),
              (current_question && current_question.answers) || []
            )}
          </Grid>
        </Box>
        <QuizTransition step={current_question.answers.length + 1}>
          <Stepper alternativeLabel activeStep={state.cq}>
            {mapi(
              (x, i) => (
                <Step key={x.question}>
                  <StepLabel></StepLabel>
                </Step>
              ),
              questions || []
            )}
          </Stepper>
        </QuizTransition>
      </Container>
    </Box>
  )

  const QuizResult = () => {
    const answerToEntry = answers => {
      switch (answers.join("")) {
        case [0, 0].join(""):
          return "never_taste"
        case [0, 1].join(""):
          return "never_price"

        default:
        case [1, 0].join(""):
          return "sometimes_taste"
        case [1, 1].join(""):
          return "sometimes_price"

        case [2, 0].join(""):
          return "alot_taste"
        case [2, 1].join(""):
          return "alot_price"
      }
    }

    return (
      <Box>
        <ScrollToTop />
        <Box minHeight={120}>
          <QuizTransition step={1}>
            <QuizResolution
              isFirst={state.isFirst}
              entry={answerToEntry(state.answers)}
            />
          </QuizTransition>
        </Box>
      </Box>
    )
  }

  const Introduction = () => {
    const classes = useStyles()

    return (
      <Box mb={10}>
        <QuizTransition step={0}>
          <ImageBlock image="matcha_bowl" caption={false} />
        </QuizTransition>
        <Container>
          <Box minHeight={120} mt={3} mb={4}>
            <QuizTransition step={1}>
              <H3>Какой чай матча вам подходит?</H3>
            </QuizTransition>
            <QuizTransition step={2}>
              <P>
                Ответьте на {questions.length} простых вопроса, и я подберу для
                вас идеальный чай матча.
              </P>
            </QuizTransition>
          </Box>
          <QuizTransition step={3}>
            <Button
              id={`quiz_start`}
              type="submit"
              size="large"
              variant="contained"
              color="secondary"
              fullWidth={true}
              className={classes.button}
              onClick={() => start()}
            >
              Начать тест
            </Button>
          </QuizTransition>
        </Container>
      </Box>
    )
  }

  if (!state.done && !state.started) {
    return (
      <Box>
        <Introduction />
      </Box>
    )
  }

  return <Box mt={6}>{state.done ? <QuizResult /> : <QuizButtons />}</Box>
}

export default ({ location, ...props }) => {
  return (
    <MainLayout
      location={location}
      pageContext={{
        frontmatter: {
          title: "Тест: какой чай матча вам подходит?",
        },
      }}
      noBottom
      fixedAppBar
      style={{ backgroundColor: "white" }}
    >
      <Box maxWidth={500} style={{ margin: "auto" }} pb={10}>
        <Quiz />
      </Box>
    </MainLayout>
  )
}
