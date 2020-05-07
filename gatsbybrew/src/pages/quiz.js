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
  results && cookies.set("test_results", results, DEFAULT_COOKIE_PARAMS)
}

const fetchResults = () => {
  const cookies = new Cookies()
  const results = cookies.get("test_results")
  return results
}

const AH = ({ speed }) => {
  return (
    <Box textAlign="center" mb={2}>
      <QuizTransition step={speed * 0}>
        <Typography variant="subtitle1">
          основываясь на ваших ответах
        </Typography>
      </QuizTransition>
      <QuizTransition step={speed * 1}>
        <H3>Я рекомендую</H3>
      </QuizTransition>
    </Box>
  )
}

const ABB = ({ shop }) => (
  <Box mt={4}>
    {shop && (
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          id="quiz_buy_button"
          size="large"
          variant="contained"
          color="secondary"
          fullWidth={true}
        >
          магазин чая матча
        </Button>
      </Link>
    )}
    <Box mt={2}>
      <Link to="/quiz" style={{ textDecoration: "none" }}>
        <Button
          id="quiz_restart_button"
          size="large"
          variant="outlined"
          color="secondary"
          fullWidth={true}
        >
          заново пройти тест
        </Button>
      </Link>
    </Box>
  </Box>
)

const makeWhisk = answers => {
  switch (answers[1]) {
    default:
      return ``
    case 0:
      return (
        <>
          Вы планируете заваривать чай <Strong>венчиком</Strong>. Сегодня по
          коду WELCOME10 я бесплатно подарю вам бамбуковый венчик с первым
          заказом.
        </>
      )
    case 1:
      return (
        <>
          Вы планируете заваривать чай{" "}
          <Strong>блендером или вспенивателем для молока</Strong>. Так, без
          сомнения, будет быстрей, однако из-за этого в чае останутся комочки.
          Если вы хотите чай без комочков, то по коду WELCOME10 я бесплатно
          подарю вам бамбуковый венчик с первым заказом.
        </>
      )
    case 2:
      return (
        <>
          Вы планируете заваривать чай <Strong>ложкой</Strong>. Так, без
          сомнения, будет быстрей, однако из-за этого в чае останутся комочки.
          Если вы хотите чай без комочков, то по коду WELCOME10 я бесплатно
          подарю вам бамбуковый венчик.
        </>
      )
  }
}

const makeImportant = answers => {
  switch (answers[2]) {
    default:
      switch (answers[0]) {
        default:
        case 0:
          return ``
        case 1:
        case 2:
          return `, и вам он нравится`
      }
    case 0:
      switch (answers[0]) {
        default:
        case 0:
          return (
            <>
              , и вам еще не знаком его <Strong>божественный</Strong> вкус
            </>
          )
        case 1:
        case 2:
          return (
            <>
              , и вам знаком его <Strong>божественный</Strong> вкус
            </>
          )
      }
  }
}

const makeQuizBlock = ({ answers, whisk, important }) => {
  switch (answers[0]) {
    default:
      return ``
    case 0:
      return (
        <>
          <P>
            Вы <Strong>никогда не пробовали</Strong> чай матча{important}.
          </P>
          <P>
            Первое впечатление бывает только раз, важно его не испортить.
            Поэтому рекомендую впервые пить настоящий японский чай матча.
          </P>
        </>
      )
    case 1:
      return (
        <>
          <P>
            Вы <Strong>уже пробовали</Strong> чай матча{important}. Вы по
            достоинству оцените настоящий японский церемониальный сорт чая
            матча.
          </P>
        </>
      )
    case 2:
      return (
        <>
          <P>
            Вы <Strong>разбираетесь</Strong> в чае матча{important}. Вы по
            достоинству оцените настоящий японский церемониальный сорт чая
            матча.
          </P>
        </>
      )
  }
}

const A1 = ({ answers }) => {
  const speed = 1

  const text = makeQuizBlock({
    answers: answers,
    whisk: "", //makeWhisk(answers),
    important: makeImportant(answers),
  })

  return (
    <Box>
      <AH speed={speed} />
      <QuizTransition step={speed * 2}>
        <ImageBlock image="flowbrew" caption={false} mb={2} />
      </QuizTransition>
      <QuizTransition step={speed * 3}>
        <H3>Церемониальный чай матча</H3>
      </QuizTransition>
      <QuizTransition step={speed * 4}>{text}</QuizTransition>
      <QuizTransition step={speed * 5}>
        <P>
          Для этого я дарю вам скидку 10% на японский церемониальный чай матча.
        </P>
        <ABB />
      </QuizTransition>
      <QuizTransition step={speed * 6}>
        <Box mt={2} mb={2}>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineOutlined color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="Вкус"
                secondary="Яркий насыщенный растительный вкус и кремово-ореховое послевкусие."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineOutlined color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="Аромат"
                secondary="Божественный сладкий ягодный аромат."
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineOutlined color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="Сделан в Японии"
                secondary="Наш чай вырос в предгорьях города Удзи в регионе Киото."
              />
            </ListItem>
          </List>
        </Box>
      </QuizTransition>
    </Box>
  )
}

const NoCafeOnCOVID = () => {
  return (
    <>
      <P>
        В обычное время я порекомендовал бы вам прийти и попробовать чай в
        японское <Strong>матча-кафе</Strong>. Но сейчас все закрыто из-за
        карантина.
      </P>
      <P>
        Но не расстраиваетесь, я помогу вам и сориентирую вас в мире чая матча.
      </P>
    </>
  )
}

const MatchaGrades = ({ taste, price }) => {
  const TW = taste
    ? ({ children }) => <Strong>{children}</Strong>
    : ({ children }) => <>{children}</>
  const PW = price
    ? ({ children }) => <Strong>{children}</Strong>
    : ({ children }) => <>{children}</>

  return (
    <>
      {taste && (
        <P>
          <Strong>Вкус</Strong>, аромат и эффект чая матча сильно зависит от его
          сорта:
        </P>
      )}
      {price && (
        <P>
          <Strong>Цена</Strong> чая матча сильно зависит от его сорта:
        </P>
      )}
      <UL>
        <LI>
          Кулинарный сорт <PW>по стоимости на уровне кофе</PW>, из него делают
          прекрасные десерты, смузи или коктейли. Но в чистом виде кулинарный
          сорт горчит. Такой чай употребляют только в комбинации с чем-то
          другим.
        </LI>
        <LI>
          Церемониальный сорт чая матча стоит в 10 раз дороже кофе, а иногда и в
          100. Такой чай имеет выраженный тонизирующий эффект, наполняющий тело
          радостью. Церемониальный сорт имеет <TW>божественный яркий вкус</TW>.
          Его пьют как и в чистом виде, так и добавляют в напитки.
        </LI>
      </UL>
    </>
  )
}

const MyStoreSellsCeremonealGrade = ({ taste, price }) => {
  return (
    <>
      <P>
        Мой магазин специализируется на подлинном японском церемониальном сорте
        чая матча.
      </P>
      {taste && (
        <P>
          Я продаю тот чай, который сам пьют каждый день – выросший на склонах
          Киото, перемолотый каменными жерновами, отобранный сомелье.
        </P>
      )}
      {/* {price && (
        <P>
          Церемониальный сорт чая матча по определению стоит в 10 раз дороже
          кофе.
        </P>
      )} */}
      {taste && (
        <>
          <P>
            Мой чай имеет божественный насыщенный растительный{" "}
            <Strong>вкус</Strong>, кремово-ореховое послевкусие, а также
            порадует вас сладким ягодный ароматом.
          </P>
          <P>
            Уже через 5 минут церемониальный сорт чай матча наполнит ваше тело
            энергией, а ваш разум радостью.
          </P>
        </>
      )}
    </>
  )
}

const BoldClaimResolution = () => {
  return (
    <>
      <P>
        <Em>
          Я настолько уверен в своем чае, что вы можете оплатить его после того,
          как попробуете.
        </Em>
      </P>
      <ABB shop />
    </>
  )
}

const LowPricerResolution = () => {
  return (
    <>
      <P>
        Если вы хотите чай матча по <Strong>доступной цене</Strong>, то вам
        нужно найти магазин с кулинарным сортом. Такого чая у меня, к сожалению,
        нет.
      </P>
      <ABB />
    </>
  )
}

// Ни разу
// Вкус
const XA1 = () => {
  return (
    <Box>
      <P>
        Вам подойдет матча-латте из <Strong>церемониального</Strong> или
        кулинарного сорта чая матча. Взбитое теплое обычное или кокосовое молоко
        влитое в заваренный чай матча.
      </P>
      <NoCafeOnCOVID />
      <P>
        Если вы <Strong>ни разу</Strong> не пробовали чай матча, то вы
        столкнетесь с определенными трудностями при выборе.
      </P>
      <P>
        <Em>
          Как перед покупкой узнать, понравится ли вам <Strong>вкус</Strong> чая
          матча? Какой чай выбрать?
        </Em>
      </P>
      <MatchaGrades taste />
      <MyStoreSellsCeremonealGrade taste />
      <BoldClaimResolution />
    </Box>
  )
}

// Ни разу
// Доступная цена
const XA2 = () => {
  return (
    <Box>
      <P>
        Вам подойдет матча-латте из <Strong>кулинарного</Strong> сорта чая
        матча. Взбитое теплое обычное или кокосовое молоко влитое в заваренный
        чай матча.
      </P>
      <NoCafeOnCOVID />
      <P>
        Если вы <Strong>ни разу</Strong> не пробовали чай матча, то вы
        столкнетесь с определенными трудностями при выборе.
      </P>
      <P>
        <Em>
          Как выбрать качественный чай по <Strong>доступной цене</Strong>? Как
          перед покупкой узнать, понравится ли вам вкус чая матча?
        </Em>
      </P>
      <MatchaGrades price />
      <MyStoreSellsCeremonealGrade price />
      <LowPricerResolution />
    </Box>
  )
}

// Несколько раз
// Вкус
const XA3 = () => {
  return (
    <Box>
      <P>
        Вы уже <Strong>несколько раз</Strong> пробовали чай матча, и вы цените
        его <Strong>вкус</Strong> и добрый тонизирующий эффект.
      </P>
      <P>Вам подходит чистый японский церемониальный сорт чая матча.</P>
      {/* <P>
        <Em>Но как перед покупкой узнать, что вам понравится чай?</Em>
      </P> */}
      <MatchaGrades taste />
      <MyStoreSellsCeremonealGrade taste />
      <BoldClaimResolution />
    </Box>
  )
}

// Несколько раз
// Доступная цена
const XA4 = () => {
  return (
    <Box>
      <P>
        Вы уже <Strong>несколько раз</Strong> пробовали чай матча, вы цените его
        вкус и добрый тонизирующий эффект, и вы ищете{" "}
        <Strong>доступную цену</Strong>.
      </P>
      <P>
        Вам подойдет матча-латте из <Strong>кулинарного</Strong> сорта чая
        матча. Взбитое теплое обычное или кокосовое молоко влитое в заваренный
        чай матча.
      </P>
      {/* <P>
        <Em>
          Где приобрести чай матча по <Strong>доступной цене</Strong>?
        </Em>
      </P> */}
      <MatchaGrades price />
      <MyStoreSellsCeremonealGrade price />
      <LowPricerResolution />
    </Box>
  )
}

// Огромное число раз
// Вкус
const XA5 = () => {
  return (
    <Box>
      <P>
        Вы <Strong>разбираетесь</Strong> в чае матча, вы знаете разницу между
        кулинарным и церемониальным сортом, усуча и коича, и вам хочется лучшего{" "}
        <Strong>вкуса</Strong>.
      </P>
      <P>Вам подходит чистый японский церемониальный сорт чая матча.</P>
      {/* <P>Японский церемониальный сорт чая матча.</P> */}
      <MyStoreSellsCeremonealGrade taste />
      <BoldClaimResolution />
    </Box>
  )
}

// Огромное число раз
// Цена
const XA6 = () => {
  return (
    <Box>
      <P>
        Вы <Strong>разбираетесь</Strong> в чае матча, вы знаете разницу между
        кулинарным и церемониальным сортом, усуча и коича, и вы ищете{" "}
        <Strong>доступную цену</Strong>.
      </P>
      <P>
        Вам подойдет матча-латте из <Strong>кулинарного</Strong> сорта чая
        матча.
      </P>
      <MyStoreSellsCeremonealGrade price />
      <LowPricerResolution />
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
  })

  // useEffectOnlyOnce(() => {
  //   setState(prevState => {
  //     const results = fetchResults()
  //     if (!results) {
  //       return prevState
  //     }
  //     return {
  //       ...prevState,
  //       cq: questions.length,
  //       done: true,
  //       answers: results.map(x => +x),
  //     }
  //   })
  // })

  useEffect(() => {
    if (state.done) {
      saveResults(state.answers)
    }
  }, [state.done, state.answers])

  // PAYLOAD

  const questions = [
    {
      question: "(1/2) Сколько раз вы пили чай матча?",
      answers: ["Ни разу", "Несколько раз", "Огромное число раз"],
    },
    {
      question: "(2/2) Что для вас важнее в чае матча?",
      answers: ["Божественный вкус", "Доступная цена"],
    },
  ]

  const getAnswer = answers => {
    switch (answers.join("")) {
      case [0, 0].join(""):
        return <XA1 />
      case [0, 1].join(""):
        return <XA2 />

      default:
      case [1, 0].join(""):
        return <XA3 />
      case [1, 1].join(""):
        return <XA4 />

      case [2, 0].join(""):
        return <XA5 />
      case [2, 1].join(""):
        return <XA6 />
    }
  }

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
    </Box>
  )

  const QuizResult = () => {
    return (
      <Box>
        <ScrollToTop />
        <Box minHeight={120}>
          <QuizTransition step={1}>
            <H3>Какой чай матча вам подходит?</H3>
          </QuizTransition>
          {/* <QuizTransition step={1}>
            <H3>Основываясь на ваших ответах, я рекомендую</H3>
          </QuizTransition> */}
          <QuizTransition step={2}>{getAnswer(state.answers)}</QuizTransition>
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
                Ответьте на {questions.length} простых вопроса, и я подберу для вас
                идеальный чай матча.
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

  return (
    <Box mt={6}>
      <Container>{state.done ? <QuizResult /> : <QuizButtons />}</Container>
    </Box>
  )
}

export default ({ location, ...props }) => {
  // const [state, setState] = React.useState({loaded: false})

  // const handleInputChange = event => {
  //   const target = event.target
  //   const value = target.type === "checkbox" ? target.checked : target.value
  //   const name = target.name

  //   const value2 = name === "order_offer" ? parseInt(value) : value

  //   setState(prevState => {
  //     return {
  //       ...prevState,
  //       [name]: value2,
  //     }
  //   })
  // }

  // useEffectOnlyOnce(() => {
  //   setState(prevState => {
  //     return {
  //       ...prevState,
  //       loaded: true,
  //     }
  //   })
  // })

  return (
    <MainLayout
      location={location}
      pageContext={{
        frontmatter: {
          title: "Тест: какой чай матча вам подходит?",
        },
      }}
      noBottom
      noShopLnk
      fixedAppBar
      style={{ backgroundColor: "white" }}
    >
      <Box maxWidth={500} style={{ margin: "auto" }} pb={10}>
        <Quiz />
      </Box>
    </MainLayout>
  )
}
