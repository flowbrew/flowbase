import React, { useEffect } from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql, navigate } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Cookies from "universal-cookie"
import {
  GridList,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel,
  Button,
  Avatar,
  CardContent,
  CardHeader,
  Card,
  Hidden,
  Paper,
  Grid,
  Box,
  Container,
  Typography,
  GridListTile,
  Tabs,
  Tab,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel,
  MobileStepper,
  Fade,
  Grow,
} from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import {
  CheckCircleOutlineOutlined,
  FavoriteBorderOutlined,
  EcoOutlined,
  LocalShippingOutlined,
  ExpandMore,
} from "@material-ui/icons"
import MainLayout from "../layouts/MainLayout"
import { useImage } from "../components/ImageContext"
import { useIsDesktop } from "../components/IsDesktopContext"
import StyledLink from "../components/StyledLink"
import {
  mapi,
  Section,
  H2,
  H3,
  H4,
  P,
  UL,
  LI,
  FLBPaper,
  ImageBlock,
  CrossedBox,
  RedBox,
  useEffectOnlyOnce,
  formatPrice,
  Strong,
  applyOffer,
} from "../common"
import Hero from "../components/Hero"
import { applyCoupon } from "../components/Coupon"
import ContactsButton from "../components/ContactsButton"
import GiftCounter from "../components/GiftCounter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGift } from "@fortawesome/free-solid-svg-icons"
import * as R from "ramda"

const useStyles = makeStyles(theme => ({
  secondaryColor: {
    color: theme.palette.secondary.main,
  },
}))

const MARGIN = 2

const OutlinedSection = ({ children }) => {
  return (
    <Box mt={MARGIN} mb={MARGIN}>
      <Container>
        <Paper variant="outlined">
          <Box pl={MARGIN} pr={MARGIN} pt={MARGIN}>
            {children}
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

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

const WorkWithRejections = ({ rejections }) => {
  const Rejection = ({ header, body }) => {
    return (
      <ListItem>
        <ListItemIcon>
          <CheckCircleOutlineOutlined color="secondary" />
        </ListItemIcon>
        <ListItemText primary={header} secondary={body} />
      </ListItem>
    )
  }

  return (
    <Box mt={3}>
      <List>
        {mapi(
          ({ header, body }, i) => (
            <Rejection key={i} header={header} body={body} />
          ),
          rejections || []
        )}
      </List>
    </Box>
  )
}

const AH = () => {
  const classes = useStyles()
  return (
    <Box textAlign="center" mb={2}>
      <Typography variant="subtitle1" className={classes.secondaryColor}>
        основываясь на ваших ответах
      </Typography>
      <H3>Мы рекомендуем</H3>
    </Box>
  )
}

const ABB = () => (
  <Box>
    <Button
      size="large"
      variant="contained"
      color="secondary"
      fullWidth={true}
      onClick={() => navigate(`/`)}
    >
      Купить
    </Button>
  </Box>
)

const A1 = () => {
  return (
    <Box>
      <AH />
      <ImageBlock image="flowbrew" caption={false} mb={2} />
      <H3>Церемониальный чай матча</H3>
      <P>
        Насыщенный глубокий вкус и сладкий ягодный аромат. Это божественная
        матча из нежных верхних чайных листочков, перемолотых каменными
        жерновами.
      </P>
      <ABB />
      <Box mt={3}>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineOutlined color="secondary" />
            </ListItemIcon>
            <ListItemText
              primary="Вкус"
              secondary="Яркий насыщенный вкус, оставляющий после себя нотку сладости и кремово-ореховое послевкусие."
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
    </Box>
  )
}

const Quiz = () => {
  const classes = useStyles()

  const [state, setState] = React.useState({
    cq: 0,
    answers: [],
    done: false,
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
        answers: results,
      }
    })
  })

  useEffect(() => {
    if (state.done) {
      saveResults(state.answers)
    }
  }, [state.done])

  // PAYLOAD

  const questions = [
    {
      question: "(1/3) Сколько раз вы пили чай матча?",
      answers: ["Ни разу", "Несколько раз", "Огромное число раз"],
    },
    {
      question: "(2/3) Как вы планируете заваривать чай матча?",
      answers: [
        "Традиционным способом: венчик + чаша",
        "Блендером или вспенивателем для молока",
        "Ложкой",
      ],
    },
    {
      question: "(3/3) Что для вас самое важное в чае матча?",
      answers: [
        "Ежедневный утренний ритуал, наполняющий энергией",
        "Здоровая альтернатива кофе",
        "Антиоксиданты для поддержания здорового образа жизни",
      ],
    },
  ]

  const getAnswer = answers => {
    return <A1 />
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

  const current_question = !state.done ? questions[state.cq] : null

  const QuizButtons = () => (
    <Grow in={true}>
      <Box>
        <Box minHeight={120}>
          <H3>{current_question && current_question.question}</H3>
        </Box>
        <Box mt={6} mb={3}>
          <Grid container spacing={3}>
            {mapi(
              (x, i) => (
                <Grid key={x} item xs={12} sm={12}>
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
                </Grid>
              ),
              (current_question && current_question.answers) || []
            )}
          </Grid>
        </Box>
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
      </Box>
    </Grow>
  )

  const QuizResult = () => {
    return (
      <Grow in={true}>
        <Box>
          <Box minHeight={120}>{getAnswer(state.answers.join(""))}</Box>
        </Box>
      </Grow>
    )
  }

  return (
    <Box>
      <Container>{state.done ? <QuizResult /> : <QuizButtons />}</Container>
    </Box>
  )
}

export default ({ location, ...props }) => {
  const [state, setState] = React.useState({})

  const handleInputChange = event => {
    const target = event.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = target.name

    const value2 = name === "order_offer" ? parseInt(value) : value

    setState(prevState => {
      return {
        ...prevState,
        [name]: value2,
      }
    })
  }

  return (
    <MainLayout
      location={location}
      pageContext={{
        frontmatter: {
          title: "Чай матча",
        },
      }}
      noBottom
      style={{ backgroundColor: "white" }}
    >
      <Box maxWidth={500} style={{ margin: "auto" }} pb={10}>
        <Box pt={10} />
        <Quiz />
      </Box>
    </MainLayout>
  )
}
