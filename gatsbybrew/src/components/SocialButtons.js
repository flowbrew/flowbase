import React from "react"
import { Link } from "gatsby"
import { styled, makeStyles } from "@material-ui/core/styles"

import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Drawer from "@material-ui/core/Drawer"
import Avatar from "@material-ui/core/Avatar"
import CardHeader from "@material-ui/core/CardHeader"
import TelegramIcon from "@material-ui/icons/Telegram"
import WhatsAppIcon from "@material-ui/icons/WhatsApp"
import PhoneIcon from "@material-ui/icons/Phone"
import EmailIcon from "@material-ui/icons/Email"
import SmsIcon from "@material-ui/icons/Sms"
import GitHubIcon from "@material-ui/icons/GitHub"
import Box from "@material-ui/core/Box"
import List from "@material-ui/core/List"
import { useIsDesktop } from "../components/IsDesktopContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons"
import {
  faVk,
  faFacebookSquare,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"

import { useImage } from "../components/ImageContext"
import { Container } from "@material-ui/core"

import { usePostContext } from "../layouts/PostLayout"

const useStyles = makeStyles(theme => ({
  socialButton: {
    color: theme.palette.primary.main,
  },
}))

const SocialButton = ({ href, icon }) => {
  const classes = useStyles()
  const size = "5x"

  return (
    <Box ml={2}>
      <a href={href}>
        <FontAwesomeIcon
          className={classes.socialButton}
          icon={icon}
          size="5x"
        />
      </a>
    </Box>
  )
}

export default ({ children, ...props }) => {
  const classes = useStyles()
  const context = usePostContext()
  const size = "5x"

  return (
    <Box mt={4} mb={4}>
      <Container>
        <Box width="100%">
          <Box display="flex" justifyContent="flex-end">
            <SocialButton
              icon={faFacebookSquare}
              href={`https://www.facebook.com/sharer/sharer.php?u=${context.location.href}`}
            />

            <SocialButton
              icon={faTwitter}
              href={`https://twitter.com/share?text=${context.frontmatter.title} @flow_brew&url=${context.location.href}&related=flow_brew`}
            />

            <SocialButton
              icon={faVk}
              href={`https://vk.com/share.php?url=${context.location.href}`}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
