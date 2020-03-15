import React from "react"

import * as R from "ramda"

import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/core/styles"
import purple from "@material-ui/core/colors/purple"
import green from "@material-ui/core/colors/green"
import { fade } from "@material-ui/core/styles/colorManipulator"

export const theme = R.compose(
  responsiveFontSizes,
  createMuiTheme
)({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#0097a7",
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    h1: {
      fontSize: "4.2rem",
    },
  },
})

export const lowContrastText = fade(theme.palette.background.paper, 0.6)

export default ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
