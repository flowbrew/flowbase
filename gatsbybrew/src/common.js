import React from "react"
import Img from "gatsby-image"
import Ratio from "react-ratio"
import * as R from "ramda"
import { Parallax } from "react-parallax"
import queryString from "query-string"
import { motion } from "framer-motion"

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
import { theme } from "./components/Theme"

import CheckCircleIcon from "@material-ui/icons/CheckCircle"

const useStyles = makeStyles(theme => ({
  lnk: {
    color: theme.palette.secondary.main,
    textDecoration: "underline",
    cursor: "pointer",
  },
  blockquote: {
    fontStyle: "italic",
    boxShadow: "inset 3px 0 0 0 rgba(0, 0, 0, 0.84)",
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  linkCounter: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&::before": {
      counterIncrement: "links",
      content: "counter(links)",
    },
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

const HR = () => (
  <Box textAlign="center" mt={8}>
    <Typography variant="h6" component="span" paragraph={true}>
      * * *
    </Typography>
  </Box>
)

const A = ({ children, href, ...props }) => {
  const classes = useStyles()
  const internal = /^\/(?!\/)/.test(href)

  if (internal) {
    return (
      <Typography variant="body1" component="span">
        <StyledLink to={href} {...props}>
          {children}
        </StyledLink>
      </Typography>
    )
  } else {
    return (
      <Typography variant="body1" component="span">
        <a className={classes.lnk} href={href} {...props}>
          {children}
        </a>
      </Typography>
    )
  }
}

const IMG = ({ children, src }) => {
  return <ImageBlock image={src}>{children}</ImageBlock>
}

const Blockquote = ({ children }) => {
  const classes = useStyles()
  return (
    <Box mt={4} mb={4}>
      <Typography
        className={classes.blockquote}
        variant="body1"
        paragraph={true}
        component="blockquote"
      >
        {children}
      </Typography>
    </Box>
  )
}

const Strong = ({ children }) => (
  <Box fontWeight="fontWeightBold" component="strong">
    {children}
  </Box>
)

const Em = ({ children }) => (
  <Box fontWeight="fontWeightBold" component="em">
    {children}
  </Box>
)

const ImageBlock = ({ image, ratio }) => {
  const data = useImage(image)

  if (!data) {
    return null
  }

  const { imageData, imageSharp } = data

  return (
    <Box mt={2}>
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
      <Box textAlign="center" mt={1}>
        <Typography variant="subtitle1" paragraph={true}>
          {imageData.alt}
        </Typography>
      </Box>
    </Box>
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

const TypographyWrapper = (Component, mt) => ({ children, ...props }) => (
  <Container>
    <Component children={children} mt={mt} {...props} />
  </Container>
)

const MDXComponents = {
  h1: TypographyWrapper(H, 8),
  h2: TypographyWrapper(H2, 8),
  h3: TypographyWrapper(H3, 8),
  h4: TypographyWrapper(H4, 8),
  p: TypographyWrapper(P),
  ul: TypographyWrapper(UL),
  li: LI,
  thematicBreak: TypographyWrapper(ThematicBreak),
  hr: TypographyWrapper(HR),
  a: A,
  img: IMG,
  blockquote: TypographyWrapper(Blockquote),
  strong: Strong,
  em: Em,
}

const CounterLnk = ({ children, ...props }) => {
  const classes = useStyles()
  return (
    <Box style={{ whiteSpace: "nowrap" }} component="span">
      (
      <A {...props} className={classes.linkCounter}>
        {children}
        <CheckCircleIcon
          color="secondary"
          style={{ fontSize: 12, verticalAlign: "super" }}
        />
      </A>
      )
    </Box>
  )
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const Rage = ({ children }) => {
  const f = () => getRandomInt(-theme.spacing(0.25), theme.spacing(0.25))
  const n = 10
  return (
    <motion.div
      style={{ 
        display: "inline-block", 
        color: theme.palette.error.main 
      }}
      animate={{
        x: [0, ...R.map(x => f(), R.range(0, n)), 0],
        y: [0, ...R.map(x => f(), R.range(0, n)), 0],
      }}
      transition={{
        loop: Infinity,
        duration: 0.5,
        ease: "linear",
      }}
    >
      {children}
    </motion.div>
  )
}

const Calm = ({ children }) => {
  return (
    <motion.div
      style={{ 
        display: "inline-block", 
        color: theme.palette.secondary.main 
      }}
      animate={{
        y: -theme.spacing(1),
      }}
      transition={{
        yoyo: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

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
  MDXComponents,
  CounterLnk,
  Rage,
  Calm,
}
