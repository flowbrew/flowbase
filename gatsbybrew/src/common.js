import { useTheme } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import * as R from "ramda"

const mapi = R.addIndex(R.map)

const useIsDesktop = () => {
    const theme = useTheme()
    return useMediaQuery(theme.breakpoints.up("sm"))
  }

export { useIsDesktop, mapi }