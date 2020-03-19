import React from "react"
import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"

const IsDesktopContext = React.createContext({})

const useIsDesktop = () => {
  const { isDesktop } = React.useContext(IsDesktopContext)

  return isDesktop
}

const IsDesktopContextProvider = ({ children }) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"))

  return (
    <IsDesktopContext.Provider value={{ isDesktop: isDesktop }}>
      {children}
    </IsDesktopContext.Provider>
  )
}

export { IsDesktopContext, IsDesktopContextProvider, useIsDesktop }
