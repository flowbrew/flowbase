import React from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  lnk: {
    color: theme.palette.secondary.main,
  },
}))

export default ({children, ...props}) => {
  const classes = useStyles()
  
  return (
    <Link className={classes.lnk} {...props}>
      {children}
    </Link>
  )
}
