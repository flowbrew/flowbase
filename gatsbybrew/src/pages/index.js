import React, { useEffect } from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql, navigate } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
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
  warning: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  selected: {
    border: `3px solid ${theme.palette.secondary.main}`,
    borderRadius: 25,
  },
  unselected: {},
}))

const SimpleInDepthBenefits = ({ data }) => {
  const classes = useStyles()

  const Benefit = ({ children, image, title, swap, caption = false }) => {
    const imageBlock = (
      <ImageBlock image={image} ratio={1 / 1} caption={caption} />
    )

    const textBlock = (
      <Container className={classes.text}>
        <H2>{title}</H2>
        {children}
      </Container>
    )

    const swap2 = !(useIsDesktop() && !swap)

    return (
      <Box mb={4}>
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
      </Box>
    )
  }

  return (
    <>
      <Benefit title="Здравствуйте" image="kozin_aleksey">
        <P>
          Меня зовут Алексей Козин. Я директор Флоу Брю. И я обожаю чай матча.
        </P>
      </Benefit>
      <Benefit
        title="Ваше японское спокойствие"
        image="matcha_tea_in_test_tube"
        swap={true}
        caption={true}
      >
        <P>
          Я попробовал 20 сортов японского чая матча и выбрал для вас самый яркий, тонизирующий и успокаивающий чай.
        </P>
        <UL>
          <LI>Кофеин в чае матча активирует мозг</LI>
          <LI>Л-Теанин в чае матча снимает стресс</LI>
        </UL>
      </Benefit>
      {/* <Benefit
        title="Венчик и чаша в подарок"
        image="gift_matcha_tea_box_from_front"
        caption={true}
      >
        <GiftCounter product={data.product} />
        <P>
          Для заварки чая матча следует использовать венчик часен и чашу чаван.
          Иначе в чае останутся комочки, которые испортят вкус.
        </P>
        <P>В вашей первой коробке будут (при заказе от 60 г):</P>
        <UL>
          <LI>Чай матча Флоу Брю</LI>
          <LI>Бамбуковый шуршащий венчик для заварки чая</LI>
          <LI>Керамическая чаша в черной глазури</LI>
          <LI>
            Письмо с инструкцией по заварке чая матча и моей благодарностью
          </LI>
          <LI>Джутовый мешочек с подарком</LI>
        </UL>
      </Benefit> */}
      <Benefit title="Венчик в подарок" image="whisk" swap={true}>
        <GiftCounter product={data.product} />
      </Benefit>
    </>
  )
}

const OfferHeader = () => {
  const classes = useStyles()
  const isDesktop = useIsDesktop()

  return (
    <Box ml={1} mb={isDesktop ? 0 : 2} mt={isDesktop ? 3 : 0}>
      <Typography variant="h2" component="h2" paragraph={true}>
        Флоу Брю
      </Typography>
      <Grid container>
        <Grid>
          <Rating name="size-medium" defaultValue={5} readOnly />
        </Grid>
        <Grid>
          <Box ml={1}>
            <Typography variant="body1">
              <a className={classes.lnk} href="#reviews">
                3 отзыва
              </a>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

const OfferImages = () => {
  const [state, setState] = React.useState({
    selectedImage: "flowbrew",
  })

  const click = imageName => {
    setState({ selectedImage: imageName })
  }

  const PreviewImage = ({ image, id }) => {
    const classes = useStyles()
    const { imageSharp } = useImage(image)

    const isSelected = image === state.selectedImage

    return (
      <Grid item xs={3}>
        <Box onClick={() => click(image)}>
          <FLBPaper>
            <div id={id} style={{ position: "relative" }}>
              {!isSelected && (
                <Box color="secondary" className={classes.unselected} />
              )}
              <Img
                fluid={{ ...imageSharp.fluid, aspectRatio: 1 }}
                className={isSelected ? classes.selected : null}
              />
            </div>
          </FLBPaper>
        </Box>
      </Grid>
    )
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <div id="selected_image">
          <ImageBlock image={state.selectedImage} caption={false} />
        </div>
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
          icon={<FavoriteBorderOutlined color="primary" />}
          text="Сладкий ягодный аромат, насыщенный вкус и кремово-ореховое послевкусие."
        />
        <Benefit
          icon={<EcoOutlined color="primary" />}
          text="Энергия и японское спокойствие."
        />
        {/* <Benefit
          icon={<LocalShippingOutlined color="primary" />}
          text="Бесплатная доставка по Москве и Спб."
        /> */}
      </List>
    </Box>
  )
}

const BuyButton = ({ id, order_offer }) => {
  const desktop = useIsDesktop()

  return (
    <Box ml={2} mr={2} mt={3}>
      <div id={id}>
        <Button
          size="large"
          variant="contained"
          color="secondary"
          id={id}
          fullWidth={!desktop}
          onClick={() => navigate(`/checkout?offer=${order_offer}`)}
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
        <CheckCircleOutlineOutlined color="secondary" />
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
  if (to === "/контакты") {
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
                <CheckCircleOutlineOutlined color="secondary" />
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

const PriceDiscountDisplay = ({
  price,
  old_price,
  old_price_description,
  weight,
}) => {
  const title = ` · ${weight} г · ${weight} чашек`
  if (old_price) {
    return (
      <Typography variant="body1" component="span">
        <CrossedBox>{formatPrice(old_price)}</CrossedBox>{" "}
        <RedBox>{formatPrice(price)} руб</RedBox>
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
      {formatPrice(price)} руб{title}
    </Typography>
  )
}

const PriceBlock = ({ product }) => {
  return (
    <Box ml={0} mt={0}>
      <PriceDiscountDisplay {...product} />
    </Box>
  )
}

const MARGIN = 3

const OutlinedSection = ({ children, isMobile = false }) => {
  const inner = (
    <Paper variant="outlined">
      <Box pl={MARGIN} pt={MARGIN}>
        {children}
      </Box>
    </Paper>
  )
  return (
    <Box mt={MARGIN}>
      {!isMobile ? (
        <Box ml={2} mr={3}>
          {inner}
        </Box>
      ) : (
        <Container>{inner}</Container>
      )}
    </Box>
  )
}

const VolumeSelect = ({ product, order_offer, onChange }) => {
  return (
    <Box ml={0} mt={2} mb={2}>
      <RadioGroup value={order_offer} name="order_offer" onChange={onChange}>
        {mapi(
          ({ extra, weight, price }, i) => (
            <FormControlLabel
              value={i}
              control={<Radio />}
              label={(<>{weight} г ({price} руб / г) + <FontAwesomeIcon icon={faGift} /></>)}
              key={i}
            />
          ),
          product.offers || []
        )}
      </RadioGroup>
    </Box>
  )
}

const OfferSection = ({ state, handleInputChange }) => {
  const rejections = [
    {
      text: "Оплата после получения",
      to: "/оплата",
    },
    {
      text: "Верну деньги, если вам не понравится чай",
      to: "/гарантии+и+возврат",
    },
    // {
    //   text: "Отвечу на ваши вопросы",
    //   to: "/контакты",
    // },
  ]

  return (
    <Section>
      <Hidden smUp>
        <OfferHeader />
        <OfferImages />
        <OutlinedSection isMobile={true}>
          <PriceBlock product={state.product} />
          <VolumeSelect
            product={state.product}
            order_offer={state.order_offer}
            onChange={handleInputChange}
          />
          <GiftCounter product={state.product} small/>
        </OutlinedSection>
        <BuyButton id="buybutton_1" order_offer={state.order_offer} />
        <OfferBenefits />
        {/* <Container>
          <GiftCounter
            product={data.product}
            fontStyle="italic"
            mt={4}
            mb={0}
          />
        </Container> */}
        <Box p={1} mb={4}>
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
                <OutlinedSection isMobile={false}>
                  <PriceBlock product={state.product} />
                  <VolumeSelect
                    product={state.product}
                    order_offer={state.order_offer}
                    onChange={handleInputChange}
                  />
                  <GiftCounter product={state.product} small/>
                </OutlinedSection>
                <BuyButton id="buybutton_1" order_offer={state.order_offer} />
                <OfferBenefits />
                {/* <Container>
                  <GiftCounter
                    product={data.product}
                    fontStyle="italic"
                    mt={4}
                    mb={0}
                  />
                </Container> */}
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

const ReviewsSection2 = () => {
  const classes = useStyles()

  const gramma_check_fix_separates_name_and_body = (
    <Box component="p" m={0}>
      {" "}
    </Box>
  )

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
          {gramma_check_fix_separates_name_and_body}
          <CardContent>
            <Box mb={1}>
              <Rating name="size-medium" defaultValue={5} readOnly />
            </Box>
            <Typography variant="body1" component="p">
              {text}
            </Typography>
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

const Warning = () => {
  const classes = useStyles()

  return (
    <Box className={classes.warning}>
      <Section>
        <Container>
          <Box pt={2} pb={1}>
            <P>
              <Strong>Flow Brew предпринимает меры борьбы с COVID-19</Strong>
            </P>
            <UL>
              <LI>Перед доставкой упаковка обрабатывается санитайзером</LI>
            </UL>
          </Box>
        </Container>
      </Section>
    </Box>
  )
}

const FAQSection = () => {
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
          expandIcon={<ExpandMore />}
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
      <ExpansionPanel
        expanded={expanded === "p4"}
        onChange={handleChange("p4")}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMore />}
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

const BuyButtonSection = ({ state }) => (
  <Box mb={15}>
    <Section>
      <Hidden smUp>
        <BuyButton id="buybutton_2" order_offer={state.order_offer} />
      </Hidden>
    </Section>
  </Box>
)

const BottomSection = () => {
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

export default ({ location, ...props }) => {
  const data = useStaticQuery(graphql`
    query {
      product: productsYaml(pid: { eq: "flowbrew60" }) {
        name
        pid
        images
        benefits
        in_depth_benefits
        default_offer
        offers {
          extra
          weight
          price
        }
      }
    }
  `)

  const [state, setState] = React.useState({
    product: data.product || {},
    order_offer: data.product.default_offer,
  })

  useEffectOnlyOnce(() => {
    setState(prevState => {
      const product = R.compose(
        applyCoupon,
        applyOffer(prevState.order_offer)
      )(data.product)
      return { ...prevState, product: product }
    })
  })

  useEffect(() => {
    setState(prevState => {
      const product = R.compose(
        applyCoupon,
        applyOffer(prevState.order_offer)
      )(data.product)
      return { ...prevState, product: product }
    })
  }, [data.product, state.order_offer])

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
    >
      <Box mb={0}>
        <Container disableGutters={true} maxWidth={false}>
          <Hero />
        </Container>
        {/* <Warning /> */}
      </Box>
      <SimpleInDepthBenefits data={data} />
      <OfferSection state={state} handleInputChange={handleInputChange} />
      <BottomSection />
      <BuyButtonSection state={state} />
    </MainLayout>
  )
}
