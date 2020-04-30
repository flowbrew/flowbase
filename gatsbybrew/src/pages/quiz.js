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
} from "../common"

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

const ABB = () => {
  const classes = useStyles()

  return (
    <Box mt={4}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          id="quiz_buy_button"
          size="large"
          variant="contained"
          color="secondary"
          className={classes.button}
          fullWidth={true}
        >
          Магазин чая матча
        </Button>
      </Link>
    </Box>
  )
}

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
          return `, и вам еще не знаком его божественный вкус`
        case 1:
        case 2:
          return `, и вы любите его божественный вкус`
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
            Первое впечатление бывает только раз, важно его не испортить.
          </P>
          <P>
            Поэтому рекомендую впервые пить настоящий японский чай матча. Для
            этого я дарю вам код WELCOME10 со скидкой 10% на японский
            церемониальный чай матча.
          </P>
          <P>{whisk}</P>
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
          <P>{whisk}</P>
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
          <P>{whisk}</P>
        </>
      )
  }
}

const A1 = ({ answers }) => {
  const speed = 1

  const text = makeQuizBlock({
    answers: answers,
    whisk: makeWhisk(answers),
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
        <ABB />
      </QuizTransition>
      <QuizTransition step={speed * 6}>
        <Box mt={3}>
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

  useEffectOnlyOnce(() => {
    setState(prevState => {
      const results = fetchResults()
      if (!results) {
        return prevState
      }
      return {
        ...prevState,
        cq: questions.length,
        done: true,
        answers: results.map(x => +x),
      }
    })
  })

  useEffect(() => {
    if (state.done) {
      saveResults(state.answers)
    }
  }, [state.done, state.answers])

  // PAYLOAD

  const questions = [
    {
      question: "(1/3) Сколько раз вы пили чай матча?",
      answers: ["Ни разу", "Несколько раз", "Огромное число раз"],
    },
    {
      question: "(2/3) Как вы планируете заваривать чай матча?",
      answers: [
        "Венчиком",
        "Блендером или вспенивателем для молока",
        "Ложкой",
        "Другое",
      ],
    },
    {
      question: "(3/3) Что для вас самое важное в чае матча?",
      answers: [
        "Божественный вкус",
        "Здоровая альтернатива кофе",
        "Антиоксиданты для поддержания здорового образа жизни",
        "Другое",
      ],
    },
  ]

  const getAnswer = answers => {
    return <A1 answers={answers} />
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
        <Box minHeight={120}>{getAnswer(state.answers)}</Box>
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
                Ответьте на {questions.length} вопроса, и я подберу для вас
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
      style={{ backgroundColor: "white" }}
    >
      <Box maxWidth={500} style={{ margin: "auto" }} pb={10}>
        <Box pt={5} />
        <Quiz />
      </Box>
    </MainLayout>
  )
}
