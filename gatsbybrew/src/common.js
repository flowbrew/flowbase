import React from "react"
import Img from "gatsby-image"
import Ratio from "react-ratio"
import * as R from "ramda"
import { Parallax } from "react-parallax"
import queryString from "query-string"

import { makeStyles, styled } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import StyledLink from "./components/StyledLink"
import { useIsDesktop } from "./components/IsDesktopContext"
import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import { useImage } from "./components/ImageContext"
import Grid from "@material-ui/core/Grid"
import Hidden from "@material-ui/core/Hidden"

const useStyles = makeStyles(theme => ({
  lnk: {
    color: theme.palette.secondary.main,
    textDecoration: "underline",
    cursor: "pointer",
  },
}))

const mapi = R.addIndex(R.map)

const FLBPaper = ({ children, ...props }) => {
  const isDesktop = useIsDesktop()
  const p = isDesktop ? 1 : 0

  if (!isDesktop) {
    return (
      <Box p={p} {...props}>
        {children}
      </Box>
    )
  }

  return (
    <Box p={p}>
      <Paper style={{ overflow: "hidden" }} elevation={0}>
        <Box {...props}>{children}</Box>
      </Paper>
    </Box>
  )
}

const Section = ({ children, ...props }) => (
  <Container mb={4} disableGutters={true} maxWidth="md" {...props}>
    {children}
  </Container>
)

const H = ({ children, ...props }) => (
  <Box {...props}>
    <Typography variant="h1" component="h1" paragraph={true}>
      {children}
    </Typography>
  </Box>
)

const H2 = ({ children, ...props }) => (
  <Box {...props}>
    <Typography variant="h2" component="h2" paragraph={true}>
      {children}
    </Typography>
  </Box>
)

const H3 = ({ children, ...props }) => (
  <Box {...props}>
    <Typography variant="h3" component="h3" paragraph={true}>
      {children}
    </Typography>
  </Box>
)

const H4 = ({ children, ...props }) => (
  <Box {...props}>
    <Typography variant="h4" component="h4" paragraph={true}>
      {children}
    </Typography>
  </Box>
)

const P = ({ children, ...props }) => (
  <Box {...props}>
    <Typography variant="body1" component="div" paragraph={true}>
      {children}
    </Typography>
  </Box>
)

const UL = ({ children, ...props }) => (
  <Box {...props}>
    <Typography component="ul">{children}</Typography>
  </Box>
)

const LI = ({ children, ...props }) => (
  <Box {...props}>
    <Typography component="li" paragraph={true}>
      {children}
    </Typography>
  </Box>
)

const ThematicBreak = ({ children }) => (
  <Typography variant="body1" paragraph={true}>
    {children}
  </Typography>
)

const HR = ({ children }) => (
  <Typography variant="body1" paragraph={true}>
    {children}
  </Typography>
)

const A = ({ children, href }) => {
  const classes = useStyles()
  const internal = /^\/(?!\/)/.test(href)

  if (internal) {
    return (
      <Typography variant="body1" component="span">
        <StyledLink to={href}>{children}</StyledLink>
      </Typography>
    )
  } else {
    return (
      <Typography variant="body1" component="span">
      <a className={classes.lnk} href={href}>
        {children}
      </a>
      </Typography>
    )
  }
}

const IMG = ({ children, src }) => {
  return <ImageBlock image={src}>{children}</ImageBlock>
}

const Blockquote = ({ children }) => (
  <Typography variant="body1" paragraph={true}>
    {children}
  </Typography>
)

const Strong = ({ children }) => (
  <Box fontWeight="fontWeightBold" component="strong">
    {children}
  </Box>
)

const Em = ({ children }) => (
  <Box fontWeight="fontWeightBold" component="strong">
    {children}
  </Box>
)

const ImageBlock = ({ image, ratio }) => {
  const { imageData, imageSharp } = useImage(image)

  return (
    <FLBPaper>
      <Parallax
        bgImage={imageSharp.fluid.src}
        bgImageSrcSet={imageSharp.fluid.srcSet}
        bgImageAlt={imageData.alt}
        strength={120}
      >
        <Ratio ratio={ratio || 3 / 2}></Ratio>
      </Parallax>
    </FLBPaper>
  )
}

const SmallImageBlock = ({ image, noTitle }) => {
  const { imageData, imageSharp } = useImage(image)

  return (
    <Box mb={2}>
      <Hidden smUp>
        <Box textAlign="center">
          <Parallax
            bgImage={imageSharp.fluid.src}
            bgImageSrcSet={imageSharp.fluid.srcSet}
            bgImageAlt={imageData.alt}
            strength={60}
          >
            <Ratio ratio={1 / 1}></Ratio>
          </Parallax>
          {!noTitle && <P mt={1}>{imageData.alt}</P>}
        </Box>
      </Hidden>

      <Hidden xsDown>
        <Box width="50%" textAlign="center">
          <Container>
            <Paper style={{ overflow: "hidden" }} elevation={0}>
              <Parallax
                bgImage={imageSharp.fluid.src}
                bgImageSrcSet={imageSharp.fluid.srcSet}
                bgImageAlt={imageData.alt}
                strength={60}
              >
                <Ratio ratio={1 / 1}></Ratio>
              </Parallax>
            </Paper>
            {!noTitle && <P mt={1}>{imageData.alt}</P>}
          </Container>
        </Box>
      </Hidden>
    </Box>
  )
}

const SpanBox = ({ children, ...props }) => (
  <Box component="span" {...props}>
    {children}
  </Box>
)

const RedBox = styled(SpanBox)({
  color: "red",
})

const CrossedBox = styled(SpanBox)({
  textDecoration: "line-through",
})

const parseLocation = location =>
  location.search ? queryString.parse(location.search) : {}

export {
  SpanBox,
  CrossedBox,
  RedBox,
  mapi,
  Section,
  H,
  H2,
  H3,
  H4,
  P,
  UL,
  LI,
  ThematicBreak,
  HR,
  A,
  IMG,
  Blockquote,
  Strong,
  Em,
  FLBPaper,
  ImageBlock,
  SmallImageBlock,
  parseLocation,
}
