import React from "react"
import {
  ListItem, 
  ListItemIcon,
  ListItemText,
  Drawer,
  Avatar,
  CardHeader,
  Box,
  List,
} from "@material-ui/core"
import {
  Telegram,
  WhatsApp,
  Phone,
  Email,
  Sms,
  GitHub,
} from "@material-ui/icons"
import { useIsDesktop } from "../components/IsDesktopContext"
import { useImage } from "../components/ImageContext"

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
          subheader="Я с радостью отвечу на ваши вопросы"
        />
        <List>
          <Contact
            icon={<Sms />}
            title={isDesktop ? "SMS +7-921-920-3135" : "SMS"}
            to="sms:+7-921-920-3135"
          />
          <Contact
            icon={<Telegram />}
            title="Telegram"
            to="https://tele.gg/NToss"
          />
          <Contact
            icon={<WhatsApp />}
            title="WhatsApp"
            to="https://wa.me/79219203135"
          />
          <Contact
            icon={<Email />}
            title="Email"
            to="mailto: ak@flowbrew.ru"
          />
          <Contact
            icon={<Phone />}
            title={isDesktop ? "Phone +7-921-920-3135" : "Phone"}
            to="tel:+7-921-920-3135"
          />
          <Contact
            icon={<GitHub />}
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
    <Box onClick={toggleContacts} component="span" {...props}>
      {children}
      <ContactsDrawer
        isDesktop={isDesktop}
        open={state.contacts.open}
        toggleContacts={toggleContacts}
        anchor={isDesktop ? "right" : mobileAnchor}
      />
    </Box>
  )
}
