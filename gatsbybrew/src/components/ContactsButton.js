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

import { useImage } from "../components/ImageContext"
import { useIsDesktop } from "../common"

const ContactsDrawer = ({ open, toggleContacts, isDesktop, anchor }) => {
  const Contact = ({ icon, title, to }) => (
    <ListItem button component="a" href={to}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  )

  const avatar = useImage("kozin_aleksey")

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClick={toggleContacts}
      onClose={toggleContacts}
    >
      <div
        role="presentation"
        onClick={toggleContacts}
        onKeyDown={toggleContacts}
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
          <Contact
            icon={<SmsIcon />}
            title={isDesktop ? "SMS +7-921-920-3135" : "SMS"}
            to="sms:+7-921-920-3135"
          />
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
            title={isDesktop ? "Phone +7-921-920-3135" : "Phone"}
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

export default ({ children, isHeaderButton, ...props }) => {
  const isDesktop = useIsDesktop()

  const [state, setState] = React.useState({
    contacts: { open: false },
  })

  const mobileAnchor = isHeaderButton ? "bottom" : "top"

  const toggleContacts = anchor => {
    setState({
      ...state,
      contacts: { open: !state.contacts.open },
    })
  }

  return (
    <Box onClick={toggleContacts}>
      {children}
      <ContactsDrawer
        isDesktop={isDesktop}
        open={state.contacts.open}
        toggleContacts={toggleContacts}
        anchor={isDesktop ? "left" : mobileAnchor}
      />
    </Box>
  )
}
