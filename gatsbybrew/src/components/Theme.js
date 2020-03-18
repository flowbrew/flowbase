import React from "react"
import * as R from "ramda"
import { 
  createMuiTheme, 
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core/styles"
import { fade } from "@material-ui/core/styles/colorManipulator"

export const theme = R.compose(
  responsiveFontSizes,
  createMuiTheme
)({
  breakpoints: {
    values: {
      xs: 0,
      sm: 760,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
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
