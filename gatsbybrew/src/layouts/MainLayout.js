import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql, Link } from "gatsby"
import PropTypes from "prop-types"
import * as R from "ramda"
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Fab,
  Slide,
  useScrollTrigger,
} from "@material-ui/core"
import { styled, makeStyles } from "@material-ui/core/styles"
import { Menu, LiveHelp, MenuBook, GitHub, Favorite } from "@material-ui/icons"
import StyledLink from "../components/StyledLink"
import ContactsButton from "../components/ContactsButton"
import LogoText from "../../content/images/logo_text.svg"
import Theme, { lowContrastText } from "../components/Theme"
import { ImageContextProvider, useImage } from "../components/ImageContext"
import {
  IsDesktopContextProvider,
  useIsDesktop,
} from "../components/IsDesktopContext"
import { MdxContextProvider } from "../components/MdxContext"
import { usePromotion } from "../components/Coupon"
import SEO from "../components/SEO"
import { ScrollToTop, useEffectOnlyOnce } from "../common"

const HEADER_CONTENT_HEIGHT = 4

const useStyles = makeStyles(theme => ({
  logo: {
    maxHeight: theme.spacing(HEADER_CONTENT_HEIGHT),
    margin: "auto",
    width: "auto",
    "& path": {
      stroke: theme.palette.primary.contrastText,
      fill: theme.palette.primary.contrastText,
    },
  },
  skipper: {
    minHeight: theme.spacing(HEADER_CONTENT_HEIGHT + 2),
  },
  main: {
    minHeight: "100vh",
    overflowX: "hidden",
    counterReset: "links",
  },
  footer: {
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    color: lowContrastText,
  },
  footerLnk: {
    color: lowContrastText,
  },
  hidden: {
    visibility: "hidden",
  },
  loaded: {

  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  offset: theme.mixins.toolbar,
}))

/* TODO: hide on scroll down */
/* TODO: add night theme */
/* TODO: add link to home */

const NavMenuButton = ({ anchor, navigation, ...props }) => {
  const [state, setState] = React.useState({
    drawer: false,
  })

  const toggleDrawer = () => {
    setState({ ...state, drawer: !state.drawer })
  }

  const listIcon = x => {
    switch (x) {
      case "blog":
        return <MenuBook />
      case "shop":
        return <Favorite />
      default:
        return <></>
    }
  }

  const sideList = () => (
    <div role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
      <List>
        {R.map(
          ({ link, title, icon }) => (
            <ListItem key={link} button component={Link} to={link}>
              <ListItemIcon>{listIcon(icon)}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          ),
          navigation
        )}
      </List>
    </div>
  )

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        {...props}
      >
        <Menu />
      </IconButton>
      <Drawer
        anchor={anchor}
        open={state.drawer}
        onClick={toggleDrawer}
        onClose={toggleDrawer}
      >
        {sideList()}
      </Drawer>
    </>
  )
}

const Header = ({ navigation, toggleContacts, fixedHeader }) => {
  const classes = useStyles()
  const isDesktop = useIsDesktop()

  return (
    <HideOnScroll disabled={fixedHeader}>
      <AppBar>
        <Toolbar>
          {isDesktop ? (
            <>
              <IconButton color="inherit" className={classes.hidden}>
                <Menu />
              </IconButton>
              <IconButton color="inherit" className={classes.hidden}>
                <Menu />
              </IconButton>
              <IconButton color="inherit" className={classes.hidden}>
                <Menu />
              </IconButton>
            </>
          ) : (
            <ContactsButton isHeaderButton={true}>
              <IconButton color="inherit" edge="start" aria-label="contacts">
                <LiveHelp />
              </IconButton>
            </ContactsButton>
          )}

          <Box style={{ flexGrow: 1 }} align="center">
            <StyledLink to="/" style={{ display: "contents" }}>
              <LogoText className={classes.logo} />
            </StyledLink>
          </Box>

          {isDesktop && (
            <>
              <a
                href="https://github.com/flowbrew/flowbase"
                style={{ color: "unset" }}
              >
                <IconButton color="inherit" edge="end" aria-label="github">
                  <GitHub />
                </IconButton>
              </a>
              <ContactsButton>
                <IconButton color="inherit" edge="end" aria-label="contacts">
                  <LiveHelp />
                </IconButton>
              </ContactsButton>
            </>
          )}

          <NavMenuButton
            anchor={isDesktop ? "right" : "bottom"}
            navigation={navigation}
            edge="end"
            color="inherit"
          />
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </HideOnScroll>
  )
}

const Main = ({ children }) => {
  const classes = useStyles()

  return (
    <Box
      component="main"
      className={classes.main}
      style={{ backgroundColor: "white" }}
    >
      {/* <Box className={classes.skipper} /> */}
      {children}
    </Box>
  )
}

const Copyright = () => (
  <Typography variant="caption">© 2019, Flow Brew</Typography>
)

const ShortDivider = styled(Divider)({
  margin: "24px auto",
  width: 60,
})

const Footer = ({ navigation }) => {
  const classes = useStyles()

  const data = useImage("flow_brew_logo_top")
  const { imageData, imageSharp } = data
  const ratio = 1.0
  const img = (
    <Box textAlign="center" mb={2}>
      <Img
        fluid={{ ...imageSharp.fluid, aspectRatio: ratio }}
        alt={imageData.alt}
        style={{
          filter: "invert(1)",
          height: "140px",
          width: "140px",
          margin: "auto",
        }}
      ></Img>
    </Box>
  )

  return (
    <footer className={classes.footer}>
      <Box mt={2} />
      <Container>
        <Grid container spacing={2}>
          {R.map(
            ({ link, title, icon }) => (
              <Grid item xs={12} sm={3} key={link}>
                <StyledLink to={link} style={{ textDecoration: "none" }}>
                  <Typography variant="button" className={classes.footerLnk}>
                    {title}
                  </Typography>
                </StyledLink>
              </Grid>
            ),
            navigation
          )}
        </Grid>
        <ShortDivider />
        {img}
        <Copyright />
        <Box className={classes.skipper} />
        <Box className={classes.skipper} />
      </Container>
    </footer>
  )
}

function ShowOnScroll(props) {
  const { children } = props

  const trigger = useScrollTrigger({ disableHysteresis: true })

  return (
    <Slide direction="up" in={trigger}>
      {children}
    </Slide>
  )
}

function HideOnScroll({ disabled, ...props }) {
  const trigger = useScrollTrigger()
  const { children } = props

  if (disabled) {
    return <>{children}</>
  }

  return (
    <Slide direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const BottomAppBar = () => {
  const classes = useStyles()

  return (
    <ShowOnScroll>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <ContactsButton>
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fabButton}
            >
              <LiveHelp />
            </Fab>
          </ContactsButton>
        </Toolbar>
      </AppBar>
    </ShowOnScroll>
  )
}

const MainLayout = ({
  children,
  location,
  pageContext = { frontmatter: {} },
  fixedHeader = true,
  isBlogPost = false,
  noBottom = false,
  noShopLnk = false,
  ...props
}) => {
  const data = useStaticQuery(graphql`
    query {
      navigation: allNavigationYaml {
        nodes {
          link
          title
          icon
        }
      }

      product: productsYaml(pid: { eq: "flowbrew60" }) {
        name
        pid
      }
    }
  `)

  const navigation2 = R.filter(
    x => x.link !== location.pathname && (!noShopLnk || x.link !== "/"),
    data.navigation.nodes
  )

  usePromotion(data.product, location)

  const [state, setState] = React.useState({
    loaded: false
  })

  useEffectOnlyOnce(() => {
    setState(prevState => {
      return { ...prevState, loaded: true }
    })
  })

  const classes = useStyles()

  return (
    <Theme>
      <ImageContextProvider>
        <MdxContextProvider>
          <IsDesktopContextProvider>
            <SEO
              {...pageContext.frontmatter}
              isBlogPost={isBlogPost}
              pathname={location.pathname}
            />
            <CssBaseline />
            <ScrollToTop />
            <Box className={state.loaded ? classes.loaded : classes.hidden}>
              <Header navigation={navigation2} fixedHeader={fixedHeader} />
              <Main>{children}</Main>
              {!noBottom && <BottomAppBar />}
              <Footer navigation={navigation2} />
            </Box>
          </IsDesktopContextProvider>
        </MdxContextProvider>
      </ImageContextProvider>
    </Theme>
  )
}

MainLayout.propTypes = {
  location: PropTypes.any.isRequired,
}

export default MainLayout
