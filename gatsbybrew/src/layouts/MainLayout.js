import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import PropTypes from "prop-types"

import Helmet from "react-helmet"
import * as R from "ramda"

import AppBar from "@material-ui/core/AppBar"
import Box from "@material-ui/core/Box"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import IconButton from "@material-ui/core/IconButton"
import { styled, makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import MenuIcon from "@material-ui/icons/Menu"
import Drawer from "@material-ui/core/Drawer"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import List from "@material-ui/core/List"
import ShoppingCart from "@material-ui/icons/ShoppingCart"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import SearchIcon from "@material-ui/icons/Search"
import MoreIcon from "@material-ui/icons/MoreVert"
import LiveHelpIcon from "@material-ui/icons/LiveHelp"
import MenuBookIcon from "@material-ui/icons/MenuBook"
import GitHubIcon from "@material-ui/icons/GitHub"
import FavoriteIcon from "@material-ui/icons/Favorite"
import RemoveIcon from "@material-ui/icons/Remove"
import Slide from "@material-ui/core/Slide"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import ListSubheader from "@material-ui/core/ListSubheader"
import Avatar from "@material-ui/core/Avatar"
import CardHeader from "@material-ui/core/CardHeader"

import TelegramIcon from "@material-ui/icons/Telegram"
import WhatsAppIcon from "@material-ui/icons/WhatsApp"
import PhoneIcon from "@material-ui/icons/Phone"
import EmailIcon from "@material-ui/icons/Email"
import SmsIcon from "@material-ui/icons/Sms"

import StyledLink from "../components/StyledLink"
import LogoText from "../../content/images/logo_text.svg"
import Theme, { lowContrastText } from "../components/Theme"
import { ImageContextProvider } from "../components/ImageContext"
import { MdxContextProvider } from "../components/MdxContext"
import { useImage } from "../components/ImageContext"
import { useIsDesktop } from "../common"

const Seo = () => <Helmet></Helmet>

const HEADER_CONTENT_HEIGHT = 4

const useStyles = makeStyles(theme => ({
  list: {
    width: 300,
  },
  logo: {
    maxHeight: theme.spacing(HEADER_CONTENT_HEIGHT),
    margin: "auto",
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
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
}))

/* TODO: hide on scroll down */
/* TODO: add night theme */
/* TODO: add link to home */

const NavMenuButton = ({ anchor, navigation, ...props }) => {
  const classes = useStyles()

  const [state, setState] = React.useState({
    drawer: false,
  })

  const toggleDrawer = () => {
    setState({ ...state, drawer: !state.drawer })
  }

  const listIcon = x => {
    switch (x) {
      case "blog":
        return <MenuBookIcon />
      case "shop":
        return <FavoriteIcon />
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
          navigation.nodes
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
        <MenuIcon />
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

const Header = ({ navigation, toggleContacts }) => {
  const classes = useStyles()
  const isDesktop = useIsDesktop()

  return (
    <HideOnScroll>
      <AppBar>
        <Toolbar>
          {isDesktop ? (
            <>
              <IconButton color="inherit" className={classes.hidden}>
                <MenuIcon />
              </IconButton>
              <IconButton color="inherit" className={classes.hidden}>
                <MenuIcon />
              </IconButton>
              <IconButton color="inherit" className={classes.hidden}>
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <IconButton
              color="inherit"
              edge="start"
              aria-label="contacts"
              onClick={() => toggleContacts("bottom")}
            >
              <LiveHelpIcon />
            </IconButton>
          )}

          <StyledLink to="/" style={{ display: "contents" }}>
            <LogoText className={classes.logo} />
          </StyledLink>

          {isDesktop && (
            <>
              <a
                href="https://github.com/flowbrew/flowbase"
                style={{ color: "unset" }}
              >
                <IconButton color="inherit" edge="end" aria-label="github">
                  <GitHubIcon />
                </IconButton>
              </a>
              <IconButton
                color="inherit"
                edge="end"
                aria-label="contacts"
                onClick={() => toggleContacts("left")}
              >
                <LiveHelpIcon />
              </IconButton>
            </>
          )}

          <NavMenuButton
            anchor={isDesktop ? "left" : "bottom"}
            navigation={navigation}
            edge="end"
            color="inherit"
          />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}

const Main = ({ children }) => {
  const classes = useStyles()

  return (
    <Box component="main" className={classes.main}>
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
            navigation.nodes
          )}
        </Grid>
        <ShortDivider />
        <Copyright />
        <Box className={classes.skipper} />
        <Box className={classes.skipper} />
      </Container>
    </footer>
  )
}

function ShowOnScroll(props) {
  const { children, window } = props

  const trigger = useScrollTrigger({ disableHysteresis: true })

  return (
    <Slide direction="up" in={trigger}>
      {children}
    </Slide>
  )
}

function HideOnScroll(props) {
  const { children, window } = props

  const trigger = useScrollTrigger()

  return (
    <Slide direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const ContactsDrawer = ({ open, toggleContacts, anchor }) => {
  const classes = useStyles()

  const Contact = ({ icon, title, to }) => (
    <ListItem button component="a" href={to}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  )

  const avatar = useImage("kozin_aleksey")
  const isDesktop = useIsDesktop()

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClick={() => toggleContacts(anchor)}
      onClose={() => toggleContacts(anchor)}
    >
      <div
        role="presentation"
        onClick={() => toggleContacts(anchor)}
        onKeyDown={() => toggleContacts(anchor)}
      >
        <CardHeader
          avatar={
            <Avatar
              alt={avatar.imageData.alt}
              src={avatar.imageSharp.fluid.src}
            />
          }
          title="Алексей Козин"
          subheader="Я с радостью отвечу на все ваши вопросы"
        />
        <List>
          <Contact icon={<SmsIcon />} title="SMS" to="sms:+7-921-920-3135" />
          <Contact
            icon={<TelegramIcon />}
            title="Telegram"
            to="https://tele.gg/NToss"
          />
          <Contact
            icon={<WhatsAppIcon />}
            title="WhatsApp"
            to="https://wa.me/79219203135"
          />
          <Contact
            icon={<EmailIcon />}
            title="Email"
            to="mailto: ak@flowbrew.ru"
          />
          <Contact
            icon={<PhoneIcon />}
            title="Phone"
            to="tel:+7-921-920-3135"
          />
          <Contact
            icon={<GitHubIcon />}
            title="GitHub"
            to="https://github.com/flowbrew/flowbase/issues/new?title=%D0%92%D0%BE%D0%BF%D1%80%D0%BE%D1%81"
          />
        </List>
      </div>
    </Drawer>
  )
}

const BottomAppBar = ({ navigation, toggleContacts }) => {
  const classes = useStyles()
  const isDesktop = useIsDesktop()

  const anchor = isDesktop ? "left" : "top"

  return (
    <ShowOnScroll>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Fab
            color="secondary"
            aria-label="add"
            className={classes.fabButton}
            onClick={() => toggleContacts(anchor)}
          >
            <LiveHelpIcon />
          </Fab>
        </Toolbar>
      </AppBar>
    </ShowOnScroll>
  )
}

const MainLayout = ({ children, location }) => {
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

  const [state, setState] = React.useState({
    contacts: { open: false, anchor: "top" },
  })

  const toggleContacts = anchor => {
    setState({
      ...state,
      contacts: { open: !state.contacts.open, anchor: anchor },
    })
  }

  return (
    <Theme>
      <ImageContextProvider>
        <MdxContextProvider>
          <Seo />
          <CssBaseline />
          <Header
            navigation={data.navigation}
            toggleContacts={toggleContacts}
          />
          <Main>{children}</Main>
          <BottomAppBar
            navigation={data.navigation}
            toggleContacts={toggleContacts}
          />
          <Footer navigation={data.navigation} />
          <ContactsDrawer
            open={state.contacts.open}
            anchor={state.contacts.anchor}
            toggleContacts={toggleContacts}
          />
        </MdxContextProvider>
      </ImageContextProvider>
    </Theme>
  )
}

MainLayout.propTypes = {
  location: PropTypes.any.isRequired,
}

export default MainLayout
