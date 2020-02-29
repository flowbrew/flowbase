import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { SideBySideMagnifier } from "react-image-magnifiers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMugHot } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"
import uniqueId from "lodash/uniqueId"
import { Parallax } from "react-parallax"

import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Rating from "@material-ui/lab/Rating"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import LocalCafeRounded from "@material-ui/icons/LocalCafeRounded"
import Icon from "@material-ui/core/Icon"
import FolderIcon from "@material-ui/icons/Folder"
import LocalShippingRounded from "@material-ui/icons/LocalShippingRounded"
import FavoriteRounded from "@material-ui/icons/FavoriteRounded"
import EcoRounded from "@material-ui/icons/EcoRounded"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import MainLayout from "../layouts/MainLayout"
import { useImage } from "../components/ImageContext"
import { useMdx } from "../components/MdxContext"
import { mapi } from "../common"
import Hero from "../components/Hero"

const useStyles = makeStyles(theme => ({
  feature: {
    marginBottom: theme.spacing(4),
  },
  text: {
    padding: theme.spacing(2),
  },
  buyButtonWrapper: {
    padding: theme.spacing(2),
  },
  fancy: {
    fontFamily: "Annabelle",
    fontSize: "3.2rem",
  },
  insideStyles: {
    // background: "#FFFFFF",
    color: "white",
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}))

const Section = Box

const H = ({ children }) => (
  <Typography variant="h2" component="h2" gutterBottom>
    {children}
  </Typography>
)

const P = ({ children }) => (
  <Box mb={2}>
    <Typography variant="body1" component="p">
      {children}
    </Typography>
  </Box>
)

const SimpleInDepthBenefits = () => {
  const classes = useStyles()

  const Benefit = ({ children, image, title }) => {
    const { imageSharp } = useImage(image)
    // const imageBlock = <Img fluid={{ ...imageSharp.fluid, aspectRatio: 1 }} />
    const imageBlock = (
      <Parallax
        bgImage={imageSharp.fluid.src}
        bgImageSrcSet={imageSharp.fluid.srcSet}
        strength={60}
      >
        <Box style={{ height: "70vh" }}></Box>
      </Parallax>
    )

    const textBlock = (
      <Section className={classes.text}>
        <H>{title}</H>
        {children}
      </Section>
    )

    return (
      <Grid className={classes.feature} container>
        <Grid item xs={12}>
          {imageBlock}
        </Grid>
        <Grid item xs={12}>
          {textBlock}
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      <Benefit title="Японское Качество" image="matcha_tea_in_test_tube">
        <P>Мы попробовали 20 сортов японского чая матча и отобрали лучший.</P>
        <P>
          Мы уделили внимание как и вкусу чая, так и его тонизирующему эффекту.
        </P>
      </Benefit>
      <Benefit
        title="Венчик и Чаша в Подарок"
        image="gift_matcha_tea_box_from_front"
      >
        <P>Мы дарим бесплатный набор для заварки новым клиентам.</P>
        <P>
          Для заварки чая матча следует использовать венчик часен и чашу чаван.
          Иначе в чае останутся комочки, которые испортят вкус.
        </P>
      </Benefit>
      <Benefit title="Программа Замены Венчика" image="whisk">
        <P>Мы бесплатно заменим вам венчик в случае его износа.</P>
        <P>
          Для этого в комментарии к заказу чая укажите "нужен новый венчик". И
          вместе с чаем мы вышлем вам замену.
        </P>
      </Benefit>
    </>
  )
}

const OfferHeader = () => {
  const classes = useStyles()

  return (
    <List>
      <ListItem>
        <Typography variant="h2" component="h2" className={classes.fancy}>
          Чай Матча
        </Typography>
      </ListItem>
      <ListItem>
        <Rating name="size-medium" defaultValue={5} readOnly />
        <Box ml={1}>
          <Typography variant="body1">
            <Link to="#reviews">3 отзыва</Link>
          </Typography>
        </Box>
      </ListItem>
      <ListItem>
        <Typography variant="body1">
          3880 руб · 60 г · 60 <FontAwesomeIcon icon={faMugHot} />
        </Typography>
      </ListItem>
    </List>
  )
}

const OfferImages = () => {
  const [state, setState] = React.useState({
    selectedImage: null,
  })

  const { imageData, imageSharp } = useImage(
    state.selectedImage || "matcha_tea_dry_in_bowl_flowbrew"
  )

  const click = imageName => {
    setState({ selectedImage: imageName })
  }

  const PreviewImage = ({ image }) => {
    const { imageSharp } = useImage(image)
    return (
      <Grid item xs={3}>
        <Box onClick={() => click(image)}>
          <Img fluid={{ ...imageSharp.fluid, aspectRatio: 1 }} />
        </Box>
      </Grid>
    )
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <SideBySideMagnifier
          imageSrc={imageSharp.fluid.src}
          imageAlt={imageData.alt}
          alwaysInPlace={true}
        />
      </Grid>
      <PreviewImage image="matcha_tea_dry_in_bowl_flowbrew" />
      <PreviewImage image="gift_matcha_tea_box_from_top_ex" />
      <PreviewImage image="matcha_tea_in_hand" />
      <PreviewImage image="matcha_tea_in_bowl" />
    </Grid>
  )
}

const OfferBenefits = () => {
  const Benefit = ({ icon, text }) => (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )

  return (
    <List>
      <Benefit
        icon={<LocalShippingRounded />}
        text="Бесплатная доставка по Москве и Спб."
      />
      <Benefit icon={<EcoRounded />} text="Изготовлен в Японии, Киото." />
      <Benefit
        icon={<FavoriteRounded />}
        text="Обволакивающий вкус и кремово-ореховое послевкусие. Ягодный аромат."
      />
    </List>
  )
}

const Promotion = () => (
  <Typography variant="h5" align="center">
    Бесплатный набор для заварки новым клиентам.
  </Typography>
)

const BuyButton = () => {
  const classes = useStyles()

  return (
    <Box mb={6}>
      <Paper className={classes.buyButtonWrapper}>
        <Button
          href="/checkout"
          size="large"
          variant="contained"
          color="secondary"
          fullWidth={true}
        >
          Купить
        </Button>
      </Paper>
    </Box>
  )
}

const WorkWithRejections = () => {
  const Rejection = ({ text, to }) => (
    <ListItem>
      <ListItemIcon>
        <CheckCircleIcon />
      </ListItemIcon>
      <ListItemText>
        <Link to={to}>{text}</Link>
      </ListItemText>
    </ListItem>
  )

  return (
    <List>
      <Rejection text="Оплата после получения." to="/" />
      <Rejection text="Гарантируем возврат средств." to="/" />
      <Rejection text="Ответим на ваши вопросы." to="/" />
    </List>
  )
}

const OfferSection = ({ data }) => {
  return (
    <Section>
      <OfferHeader />
      <OfferImages />
      <OfferBenefits />
      {/* <Promotion /> */}
      <BuyButton />
      <WorkWithRejections />
    </Section>
  )
}

const PaperSection = ({ title, children }) => (
  <Box mb={6}>
    <Box mb={4}>
      <Typography variant="h2" align="center">
        {title}
      </Typography>
    </Box>
    <Paper>{children}</Paper>
  </Box>
)

const ReviewsSection = () => {
  const Review = ({ author, text }) => (
    <Box m={6}>
      <Card p={1}>
        <CardContent>
          <Box mb={1}>
            <Rating name="size-medium" defaultValue={5} readOnly />
          </Box>
          <Typography variant="body1">{text}</Typography>
          <Box fontStyle="italic" mt={1}>
            <Typography variant="body1" fontStyle="italic">
              - {author}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
  return (
    <PaperSection title="Отзывы">
      <Box p={1}>
        <Review author="Мария" text="Вкус, насыщенный и не на что не похожий" />
        <Review
          author="Марат"
          text="Послевкусие как от улуна, смородиновый лист. также вкус чистый, приятный."
        />
        <Review
          author="Марина"
          text="Мой любимый вариант заварки с молоком. Нежный и мягкий вкус )"
        />
      </Box>
    </PaperSection>
  )
}

const FAQSection = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <PaperSection title="Частые Вопросы">
      <ExpansionPanel
        expanded={expanded === "p1"}
        onChange={handleChange("p1")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={"p1bh-content"}
          id={"p1bh-header"}
        >
          <Typography>Можно ли заварить чай без венчика</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <P>
            Можно, но вкус будет хуже. В чае будут плавать небольшие комочки.
            Даже электрический вспениватель для молока оставляет комочки. Для
            идеального вкуса нужны венчик и чаша.
          </P>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "p2"}
        onChange={handleChange("p2")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={"p2bh-content"}
          id={"p2bh-header"}
        >
          <Typography>Почему чай поставляется в двух упаковках</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ul>
            <li>
              Такой объем чая в вашем заказе позволяет доставлять его бесплатно.
              А также позволяет дарить бесплатный набор для заварки новым
              клиентам.
            </li>
            <li>
              Чай матча портится от контакта с воздухом. После открытия упаковки
              у вас есть 3 недели, чтобы им насладиться. 60 г можно не успеть
              выпить за такой короткий срок.
            </li>
          </ul>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "p3"}
        onChange={handleChange("p3")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={"p3bh-content"}
          id={"p3bh-header"}
        >
          <Typography>Зачем пить чай матча</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <P>Читайте о полезных свойствах чая матча в нашем блоге:</P>
          <P>
            <Link to="/blog">
              7 причин почему вы подсядете на полезный чай матча
            </Link>
          </P>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={expanded === "p4"}
        onChange={handleChange("p4")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={"p4bh-content"}
          id={"p4bh-header"}
        >
          <Typography>Как заваривать чай матча</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <P>
            Чай матча легко заваривается. При должной практике заварка займет у
            вас не больше 1 минуты.
          </P>
          <ul>
            <li>
              Подготовьте воду, температура которой не превышает 70-80С° (можно
              использовать холодную воду). Чай матча нельзя заваривать кипятком,
              иначе он будет горчить. Если у вас нет чайника с термометром,
              можно заранее смешать горячую и холодную воду в отдельной чашке.
              Простое правило: если вода обжигает вас, она обожжёт и чай.
            </li>
            <li>
              Возьмите 1г чая и положите в чаван. Это половина чайной ложки.
            </li>
            <li>
              Добавьте 10 мл воды и аккуратно размешайте порошок венчиком до
              однородного состояния, чтобы не оставалось комочков. В итоге
              должна получиться однородная паста.
            </li>
            <li>
              Вода активирует свойства чая. Вдохните и насладитесь его ароматом.
            </li>
            <li>
              Добавьте воды или молока по вкусу. Дополнительная жидкость изменит
              вкус чая. Я, как правило, доливаю 40 мл воды. А вот моей жене
              нравится тёплое кокосовое молоко.
            </li>
            <li>V-образными движениями взбейте чай венчиком.</li>
            <li>Напиток готов.</li>
          </ul>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </PaperSection>
  )
}

const BuyButtonSection = () => <BuyButton />
const SignatureSection = () => {
  const classes = useStyles()
  const kozin_aleksey = useImage("kozin_aleksey")
  const signature = useImage("signature")

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Box p={2}>
            <H>Здравствуйте</H>
            <P>
              Меня зовут Алексей Козин. Я директор Flow Brew. Спасибо за ваш
              выбор.
            </P>
          </Box>
          <Parallax
            bgImage={kozin_aleksey.imageSharp.fluid.src}
            bgImageSrcSet={kozin_aleksey.imageSharp.fluid.srcSet}
            strength={60}
          >
            <Box style={{ height: "70vh" }}></Box>
          </Parallax>
          <Box width={1 / 2} align="center">
            <Img fluid={{ ...signature.imageSharp.fluid, aspectRatio: 1 }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      product: productsYaml(pid: { eq: "flowbrew60" }) {
        name
        pid
        price
        quantity
        images
        benefits
        in_depth_benefits
      }
    }
  `)

  return (
    <MainLayout location={location}>
      <Hero />
      <SimpleInDepthBenefits />
      <OfferSection />
      <ReviewsSection />
      <FAQSection />
      <BuyButtonSection />
      <SignatureSection />
    </MainLayout>
  )
}
