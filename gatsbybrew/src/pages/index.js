import React, {useEffect} from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { SideBySideMagnifier } from "react-image-magnifiers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMugHot } from "@fortawesome/free-solid-svg-icons"
import Link from "@material-ui/core/Link"
import uniqueId from "lodash/uniqueId"
import { Parallax } from "react-parallax"
import Ratio from "react-ratio"
import { isFunction } from "lodash"

import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Hidden from "@material-ui/core/Hidden"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import Avatar from "@material-ui/core/Avatar"
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
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined"
import FavoriteRounded from "@material-ui/icons/FavoriteRounded"
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined"
import EcoRounded from "@material-ui/icons/EcoRounded"
import EcoOutlinedIcon from "@material-ui/icons/EcoOutlined"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined"
import FreeBreakfastOutlinedIcon from "@material-ui/icons/FreeBreakfastOutlined"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import CheckIcon from "@material-ui/icons/Check"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import IconButton from "@material-ui/core/IconButton"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

import MainLayout from "../layouts/MainLayout"
import { useImage } from "../components/ImageContext"
import { useIsDesktop } from "../components/IsDesktopContext"
import { useMdx } from "../components/MdxContext"
import StyledLink from "../components/StyledLink"
import {
  mapi,
  Section,
  H,
  H2,
  P,
  UL,
  LI,
  FLBPaper,
  ImageBlock,
  CrossedBox,
  RedBox,
} from "../common"
import Hero from "../components/Hero"
import { applyCoupon } from "../components/Coupon"
import LogoText from "../../content/images/logo_text.svg"
import ContactsButton from "../components/ContactsButton"

const useStyles = makeStyles(theme => ({
  lnk: {
    color: theme.palette.secondary.main,
    textDecoration: "underline",
    cursor: "pointer",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  text: {
    padding: theme.spacing(2),
  },
  buyButtonWrapper: {
    padding: theme.spacing(2),
  },
  fancy: {
    fontFamily: "Isadora",
    [theme.breakpoints.down("xs")]: {
      fontSize: 52,
    },
  },
  insideStyles: {
    color: "white",
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  secondaryColor: {
    color: theme.palette.secondary.main,
  },
  tab: {
    padding: 0,
  },
}))

const SimpleInDepthBenefits = () => {
  const classes = useStyles()

  const Benefit = ({ children, image, title, swap }) => {
    const imageBlock = <ImageBlock image={image} ratio={1 / 1} />

    const textBlock = (
      <Container className={classes.text}>
        <H2>{title}</H2>
        {children}
      </Container>
    )

    const swap2 = !(useIsDesktop() && !swap)

    return (
      <Section>
        <Grid className={classes.feature} container>
          <Grid item xs={12} sm={6}>
            {swap2 ? textBlock : imageBlock}
          </Grid>
          <Grid item xs={12} sm={6}>
            {!swap2 ? textBlock : imageBlock}
          </Grid>
        </Grid>
      </Section>
    )
  }

  return (
    <>
      <Benefit title="Здравствуйте" image="kozin_aleksey">
        <P>Меня зовут Алексей Козин. Я директор Flow Brew.</P>
      </Benefit>
      <Benefit
        title="Японское Качество"
        image="matcha_tea_in_test_tube"
        swap={true}
      >
        <P>Я попробовал 20 сортов японского чая матча и отобрал лучший.</P>
        <P>
          Я уделил внимание как и вкусу чая, так и его тонизирующему эффекту.
        </P>
      </Benefit>
      <Benefit
        title="Венчик и Чаша в Подарок"
        image="gift_matcha_tea_box_from_front"
      >
        <P>Я дарю бесплатный набор для заварки новым клиентам.</P>
      </Benefit>
      <Benefit title="Программа Замены Венчика" image="whisk" swap={true}>
        <P>Я бесплатно заменю вам венчик в случае его износа.</P>
      </Benefit>
    </>
  )
}

const OfferHeader = () => {
  const classes = useStyles()
  const isDesktop = useIsDesktop()

  return (
    <Box ml={1} mb={isDesktop ? 0 : 2} mt={isDesktop ? 3 : 0}>
      <Typography variant="h2" component="h2" className={classes.fancy}>
        Flow Brew
      </Typography>
      <Grid container>
        <Grid>
          <Rating name="size-medium" defaultValue={5} readOnly />
        </Grid>
        <Grid>
          <Box ml={1}>
            <Typography variant="body1">
              <StyledLink to="#reviews">3 отзыва</StyledLink>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

const OfferImages = () => {
  const [state, setState] = React.useState({
    selectedImage: null,
  })

  const { imageData, imageSharp } = useImage(state.selectedImage || "flowbrew")

  const click = imageName => {
    setState({ selectedImage: imageName })
  }

  const PreviewImage = ({ image, id }) => {
    const { imageSharp } = useImage(image)
    return (
      <Grid item xs={3}>
        <Box onClick={() => click(image)}>
          <FLBPaper>
            <div id={id}>
              <Img fluid={{ ...imageSharp.fluid, aspectRatio: 1 }} />
            </div>
          </FLBPaper>
        </Box>
      </Grid>
    )
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <FLBPaper>
          <div id="selected_image">
            <Parallax
              bgImage={imageSharp.fluid.src}
              bgImageSrcSet={imageSharp.fluid.srcSet}
              strength={50}
            >
              <Ratio ratio={1 / 1}></Ratio>
            </Parallax>
          </div>
        </FLBPaper>
      </Grid>
      <PreviewImage id="preview_image_1" image="flowbrew" />
      <PreviewImage id="preview_image_2" image="matcha_tea_in_hand" />
      <PreviewImage
        id="preview_image_3"
        image="gift_matcha_tea_box_from_top_ex"
      />
      <PreviewImage
        id="preview_image_4"
        image="matcha_tea_dry_in_bowl_flowbrew"
      />
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
    <Box ml={0}>
      <List>
        <Benefit
          icon={<FavoriteBorderOutlinedIcon color="primary" />}
          text="Обволакивающий вкус и кремово-ореховое послевкусие. Ягодный аромат."
        />
        <Benefit
          icon={<EcoOutlinedIcon color="primary" />}
          text="Изготовлен в Японии, Киото."
        />
        <Benefit
          icon={<LocalShippingOutlinedIcon color="primary" />}
          text="Бесплатная доставка по Москве и Спб."
        />
      </List>
    </Box>
  )
}

const Promotion = () => (
  <Typography variant="h5" align="center">
    Бесплатный набор для заварки новым клиентам.
  </Typography>
)

const BuyButton = ({ id }) => {
  const classes = useStyles()
  const desktop = useIsDesktop()

  return (
    <Box ml={2} mr={2} mt={3}>
      <div id={id}>
        <Button
          href="/checkout"
          size="large"
          variant="contained"
          color="secondary"
          fullWidth={!desktop}
        >
          Купить
        </Button>
      </div>
    </Box>
  )
}

const WorkWithRejections = ({ rejections }) => {
  const Rejection = ({ text, to }) => (
    <ListItem>
      <ListItemIcon>
        <CheckCircleOutlineOutlinedIcon color="secondary" />
      </ListItemIcon>
      <ListItemText>
        <WorkWithRejectionsLink to={to} text={text} />
      </ListItemText>
    </ListItem>
  )

  return (
    <Box mt={3}>
      <Section>
        <List>
          {mapi(
            ({ text, to }, i) => (
              <Rejection key={text} text={text} to={to} />
            ),
            rejections || []
          )}
        </List>
      </Section>
    </Box>
  )
}

const WorkWithRejectionsLink = ({ to, text }) => {
  const classes = useStyles()
  if (to == "/контакты") {
    return (
      <ContactsButton>
        <Box className={classes.lnk}>{text}</Box>
      </ContactsButton>
    )
  }
  return <StyledLink to={to}>{text}</StyledLink>
}

const WorkWithRejectionsList = ({ rejections }) => {
  const Rejection = ({ text, to }) => (
    <Grid item sm={4}>
      <ListItem>
        <ListItemText>
          <Box align="center">
            <Grid container>
              <Grid item xs={12}>
                <CheckCircleOutlineOutlinedIcon color="secondary" />
              </Grid>
              <Grid item xs={12}>
                <WorkWithRejectionsLink to={to} text={text} />
              </Grid>
            </Grid>
          </Box>
        </ListItemText>
      </ListItem>
    </Grid>
  )

  return (
    <Grid container>
      {mapi(
        ({ text, to }, i) => (
          <Rejection key={text} text={text} to={to} />
        ),
        rejections || []
      )}
    </Grid>
  )
}

const PriceDiscountDisplay = ({ price, old_price, old_price_description }) => {
  const title = " · 60 г · 60 чашек"
  if (old_price) {
    return (
      <Typography variant="body1" component="span">
        <CrossedBox>{old_price}</CrossedBox> <RedBox>{price} руб</RedBox>
        {title}
        {old_price_description && (
          <RedBox>
            <P>{old_price_description}</P>
          </RedBox>
        )}
      </Typography>
    )
  }
  return (
    <Typography variant="body1">
      {price} руб{title}
    </Typography>
  )
}

const PriceBlock = ({ product }) => {
  return (
    <Box ml={2} mt={4}>
      <PriceDiscountDisplay {...product} />
    </Box>
  )
}

const OfferSection = ({ data }) => {
  const [state, setState] = React.useState({
    product: data.product || {},
  })

  useEffect(()=>{
    const product = applyCoupon(data.product)
    setState(prevState => {
      return { ...prevState, product: product }
    })
  }, [])
  
  const isDesktop = useIsDesktop()

  const rejections = [
    {
      text: "Оплата после получения",
      to: "/оплата",
    },
    {
      text: "Гарантирую возврат средств",
      to: "/гарантии+и+возврат",
    },
    {
      text: "Отвечу на ваши вопросы",
      to: "/контакты",
    },
  ]

  return (
    <Section>
      <Box mt={10} mb={10} fontStyle="italic">
        {/* <Typography>
          <Typography variant="h4" component="h4" paragraph={true}>
            "...чай матча зарядит вас энергией и настроением..."
          </Typography>
        </Typography> */}
      </Box>

      <Hidden smUp>
        <OfferHeader />
        <OfferImages />
        <PriceBlock product={state.product} />
        <OfferBenefits />
        <BuyButton id="buybutton_1" />
        <Box p={1}>
          <Paper elevation={0}>
            <WorkWithRejections rejections={rejections} />
          </Paper>
        </Box>
      </Hidden>

      <Hidden xsDown>
        <Box mb={7}>
          <FLBPaper>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <OfferImages />
              </Grid>
              <Grid item xs={12} sm={6}>
                <OfferHeader />
                <PriceBlock product={state.product} />
                <OfferBenefits />
                <BuyButton id="buybutton_1" />
              </Grid>
            </Grid>
          </FLBPaper>
          <Box mt={6} p={1}>
            <Paper elevation={0}>
              <WorkWithRejectionsList rejections={rejections} />
            </Paper>
          </Box>
        </Box>
      </Hidden>
    </Section>
  )
}

const PaperSection = ({ title, children, ...props }) => (
  <Section {...props}>
    <Grid container>
      <Grid item xs={12} sm={12}>
        <H>{title}</H>
        {children}
      </Grid>
    </Grid>
  </Section>
)

const ReviewsSection2 = () => {
  const classes = useStyles()

  const Review = ({ author, text, image }) => {
    const avatar = useImage(image)
    return (
      <Box minWidth="sm">
        <Card elevation={0} variant="outlined">
          <CardHeader
            avatar={
              <Avatar
                alt={avatar.imageData.alt}
                src={avatar.imageSharp.fluid.src}
              />
            }
            title={author}
          />
          <CardContent>
            <Box mb={1}>
              <Rating name="size-medium" defaultValue={5} readOnly />
            </Box>
            <Typography variant="body1">{text}</Typography>
          </CardContent>
        </Card>
      </Box>
    )
  }

  const tileData = [
    {
      author: "Марат",
      image: "marat",
      text:
        "Послевкусие как от улуна, смородиновый лист. также вкус чистый, приятный.",
    },
    {
      author: "Марина",
      image: "marina",
      text: "Мой любимый вариант заварки с молоком. Нежный и мягкий вкус )",
    },
    {
      author: "Мария",
      image: "maria",
      text: "Вкус, насыщенный и не на что не похожий",
    },
  ]

  const cols = useIsDesktop() ? 3.0 : 1.2

  return (
    <Section>
      <GridList
        cellHeight="auto"
        className={classes.gridList}
        cols={cols}
        spacing={15}
      >
        {tileData.map(tile => (
          <GridListTile key={tile.image}>
            <Review author={tile.author} image={tile.image} text={tile.text} />
          </GridListTile>
        ))}
      </GridList>
    </Section>
  )
}

const FAQSection = () => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <>
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
          <Box>
            <P>
              Можно, но вкус будет хуже. В чае будут плавать небольшие комочки.
              Даже электрический вспениватель для молока оставляет комочки. Для
              идеального вкуса нужны венчик и чаша.
            </P>
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {/* <ExpansionPanel
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
          <Box>
            <UL>
              <LI>
                Такой объем чая в вашем заказе позволяет доставлять его
                бесплатно. А также позволяет дарить бесплатный набор для заварки
                новым клиентам.
              </LI>
              <LI>
                Чай матча портится от контакта с воздухом. После открытия
                упаковки у вас есть 3 недели, чтобы им насладиться. 60 г можно
                не успеть выпить за такой короткий срок.
              </LI>
            </UL>
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}
      {/* <ExpansionPanel
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
          <Box>
            <P>
              Читайте о полезных свойствах чая матча в нашем блоге:
              <br />
              <StyledLink color="secondary" href="/blog" underline="always">
                7 причин почему вы подсядете на полезный чай матча
              </StyledLink>
            </P>
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}
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
          <Box>
            <P>
              Чай матча легко заваривается. При должной практике заварка займет
              у вас не больше 1 минуты.
            </P>
            <UL>
              <LI>
                Подготовьте воду, температура которой не превышает 70-80С°
                (можно использовать холодную воду). Чай матча нельзя заваривать
                кипятком, иначе он будет горчить. Если у вас нет чайника с
                термометром, можно заранее смешать горячую и холодную воду в
                отдельной чашке. Простое правило: если вода обжигает вас, она
                обожжёт и чай.
              </LI>
              <LI>
                Возьмите 1г чая и положите в чаван. Это половина чайной ложки.
              </LI>
              <LI>
                Добавьте 10 мл воды и аккуратно размешайте порошок венчиком до
                однородного состояния, чтобы не оставалось комочков. В итоге
                должна получиться однородная паста.
              </LI>
              <LI>
                Вода активирует свойства чая. Вдохните и насладитесь его
                ароматом.
              </LI>
              <LI>
                Добавьте воды или молока по вкусу. Дополнительная жидкость
                изменит вкус чая. Я, как правило, доливаю 40 мл воды. А вот моей
                жене нравится тёплое кокосовое молоко.
              </LI>
              <LI>V-образными движениями взбейте чай венчиком.</LI>
              <LI>Напиток готов.</LI>
            </UL>
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  )
}

const BuyButtonSection = () => (
  <Box mb={15}>
    <Section>
      <Hidden smUp>
        <BuyButton id="buybutton_2" />
      </Hidden>
    </Section>
  </Box>
)

const BottomSection = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && <Box pt={0}>{children}</Box>}
      </Typography>
    )
  }

  const isDesktop = useIsDesktop()

  return (
    <Box mb={isDesktop ? 15 : 5} mt={0} id="reviews">
      <Section>
        <Box p={1}>
          <Paper style={{ overflow: "hidden" }} elevation={0}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Отзывы" />
              <Tab label="Частые вопросы" />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Box p={2}>
                <ReviewsSection2 />
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FAQSection />
            </TabPanel>
          </Paper>
        </Box>
      </Section>
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
        weight
        in_depth_benefits
      }
    }
  `)

  return (
    <MainLayout location={location}>
      <Box mb={4}>
        <Container disableGutters={true} maxWidth={false}>
          <Hero />
        </Container>
      </Box>
      <SimpleInDepthBenefits />
      <OfferSection data={data} />
      <BottomSection />
      <BuyButtonSection />
    </MainLayout>
  )
}
