import React, { useEffect } from "react"
import Img from "gatsby-image"
import BackgroundImage from "gatsby-background-image"
import Ratio from "react-ratio"
import * as R from "ramda"
import Parallax from "react-rellax"
import queryString from "query-string"
import { motion } from "framer-motion"
import { makeStyles, styled } from "@material-ui/core/styles"
import { Container, Typography, Box, Paper, Hidden } from "@material-ui/core"
import { useIsDesktop } from "./components/IsDesktopContext"
import { useImage } from "./components/ImageContext"
import { theme } from "./components/Theme"
import StyledLink from "./components/StyledLink"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"

const PARALLAX_OFFSET = 3.5

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
  parallax: {
    "&::before": {
      width: `${100 + PARALLAX_OFFSET * 2}% !important`,
      height: `${100 + PARALLAX_OFFSET * 2}% !important`,
      top: `${-PARALLAX_OFFSET}% !important`,
      left: `${-PARALLAX_OFFSET}% !important`,
    },
  },
  subtitle: {
    color: theme.palette.primary.light,
  },
}))

const mapi = R.addIndex(R.map)

const FLBPaper = ({ children, ...props }) => {
  const isDesktop = useIsDesktop()
  const p = isDesktop ? 1 : 0

  if (!isDesktop) {
    return (
      <Box p={p} style={{ overflow: "hidden" }} {...props}>
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

const Section = ({ children, small = false, ...props }) => (
  <Container
    mb={4}
    disableGutters={true}
    maxWidth={small ? "sm" : "md"}
    {...props}
  >
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
    <Typography variant="body1" component="p" paragraph={true}>
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

const ThematicBreak = ({ children }) => null

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

const ImageBlock = ({ image, ratio = 1, parallax = true, caption = true }) => {
  const classes = useStyles()
  const [rect, setRect] = React.useState({})
  const data = useImage(image)

  if (!data) {
    return null
  }

  const { imageData, imageSharp } = data

  const refCallback = elem => {
    if (!elem) {
      return
    }
    const newRect = elem.getBoundingClientRect()
    if (JSON.stringify(newRect) !== JSON.stringify(rect)) {
      setRect(newRect)
    }
  }

  const speed = rect.width && rect.width < 400 ? -0.25 : -0.8

  const img = false ? (
    <div ref={refCallback}>
      <Parallax percentage={0.5} speed={speed}>
        <BackgroundImage fluid={imageSharp.fluid} className={classes.parallax}>
          <Ratio ratio={ratio} />
        </BackgroundImage>
      </Parallax>
    </div>
  ) : (
    <Img
      fluid={{ ...imageSharp.fluid, aspectRatio: ratio }}
      alt={imageData.alt}
    />
  )

  return (
    <Box>
      <FLBPaper id={imageData.name}>{img}</FLBPaper>
      {caption && (
        <Box textAlign="center" mt={1}>
          <Typography
            className={classes.subtitle}
            variant="subtitle1"
            paragraph={true}
          >
            {imageData.alt}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

const SmallImageBlock = ({ image, noTitle }) => {
  const { imageData, imageSharp } = useImage(image)

  return (
    <Box mb={2}>
      <Hidden smUp>
        <Box textAlign="center">
          <Img fluid={{ ...imageSharp.fluid, aspectRatio: 1 }} />
          {!noTitle && <P mt={1}>{imageData.alt}</P>}
        </Box>
      </Hidden>

      <Hidden xsDown>
        <Box width="50%" textAlign="center">
          <Container>
            <Paper style={{ overflow: "hidden" }} elevation={0}>
              <Img fluid={{ ...imageSharp.fluid, aspectRatio: 1 }} />
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

const Rage = ({ children, ...props }) => {
  return (
    <motion.span
      style={{
        display: "inline-block",
        color: theme.palette.error.main,
      }}
      {...props}
    >
      {children}
    </motion.span>
  )
}

const Enegry = ({ children, ...props }) => (
  <Rage
    style={{
      display: "inline-block",
      color: theme.palette.secondary.main,
    }}
    {...props}
  >
    {children}
  </Rage>
)

const Calm = ({ children }) => {
  return (
    <motion.span
      style={{
        display: "inline-block",
        color: theme.palette.secondary.main,
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
    </motion.span>
  )
}

const useEffectOnlyOnce = func => useEffect(func, [])

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
  useEffectOnlyOnce,
  Enegry,
}
