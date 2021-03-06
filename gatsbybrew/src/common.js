import React, { useEffect } from "react"
import { useLocation } from "@reach/router"
import Img from "gatsby-image"
import BackgroundImage from "gatsby-background-image"
import Ratio from "react-ratio"
import { addIndex, map, curry } from "ramda"
import Parallax from "react-rellax"
import queryString from "query-string"
import { makeStyles, styled } from "@material-ui/core/styles"
import { Container, Typography, Box, Paper, Hidden } from "@material-ui/core"
import { useIsDesktop } from "./components/IsDesktopContext"
import { useImage } from "./components/ImageContext"
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
    textDecoration: "underline",
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
  block: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}))

const mapi = addIndex(map)

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

const ImageBlock = ({
  image,
  ratio = 1,
  parallax = true,
  caption = true,
  ...props
}) => {
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
    >
      <Ratio ratio={ratio} />
    </Img>
  )

  return (
    <Box {...props}>
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

const applyOffer = curry((n, product) => {
  const offer =
    n < 0 || n >= product.offers.length || n === undefined
      ? product.offers[product.default_offer]
      : product.offers[n]
  return {
    ...product,
    price: offer.price * offer.weight,
    weight: offer.weight,
    extra: offer.extra,
  }
})

const SmallImageBlock = ({
  image,
  noTitle,
  ratio = 1,
  centered = false,
  title = "",
  ...props
}) => {
  const classes = useStyles()
  const { imageData, imageSharp } = useImage(image)

  const s = centered ? { margin: "auto" } : {}

  return (
    <Box mb={1} {...props}>
      <Hidden smUp>
        <Box textAlign="center" style={s}>
          <Img fluid={{ ...imageSharp.fluid, aspectRatio: ratio }} />
          {!noTitle && (
            <Box mt={2}>
              <Typography
                className={classes.subtitle}
                variant="subtitle1"
                paragraph={true}
              >
                {title === "" ? imageData.alt : title}
              </Typography>
            </Box>
          )}
        </Box>
      </Hidden>

      <Hidden xsDown>
        <Box width="50%" textAlign="center" style={s}>
          <Container>
            <Paper style={{ overflow: "hidden" }} elevation={0}>
              <Img fluid={{ ...imageSharp.fluid, aspectRatio: ratio }} />
            </Paper>
            {!noTitle && (
              <Box mt={2}>
                <Typography
                  className={classes.subtitle}
                  variant="subtitle1"
                  paragraph={true}
                >
                  {title === "" ? imageData.alt : title}
                </Typography>
              </Box>
            )}
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

// const TypographyDisabled = (Component, mt) => () => (
//   <Container>
//   </Container>
// )

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

const formatPrice = price => {
  if (!price) {
    return price
  }
  return Math.ceil(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\xa0")
}

const TextBlock = ({ children, ...props }) => {
  const classes = useStyles()
  return (
    <Box mb={2}>
      <FLBPaper className={classes.block} pt={3} pb={1} {...props}>
        {children}
      </FLBPaper>
    </Box>
  )
}

const useEffectOnlyOnce = func => useEffect(func, [])

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
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
  useEffectOnlyOnce,
  formatPrice,
  TextBlock,
  applyOffer,
  ScrollToTop,
}
