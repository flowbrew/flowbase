import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
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

import { useImage } from "../components/ImageContext"
import { Container, Grid, Typography } from "@material-ui/core"

import { FLBPaper } from "../common"
import { usePostContext } from "../layouts/PostLayout"

const useStyles = makeStyles(theme => ({}))

export default ({ children, ...props }) => {
  const classes = useStyles()
  const context = usePostContext()
  const size = "5x"

  const avatar = useImage("kozin_aleksey")
  const signature = useImage("signature")

  return (
    <Box mt={5}>
      <Grid container>
        <Grid xs={6} sm={3} item>
          <FLBPaper>
            <Img fluid={{ ...avatar.imageSharp.fluid, aspectRatio: 1 }} />
          </FLBPaper>
          <Box textAlign="center" mt={1}>
            <Typography variant="subtitle1" paragraph={true}>
              {avatar.imageData.alt}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={6} sm={3} item>
          <FLBPaper>
            <Box>
              <Img fluid={{ ...signature.imageSharp.fluid, aspectRatio: 1 }} />
            </Box>
          </FLBPaper>
        </Grid>
      </Grid>
    </Box>
  )
}
