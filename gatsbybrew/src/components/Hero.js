import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Parallax } from "react-parallax"

import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"

const useStyles = makeStyles(theme => ({
  insideStyles: {
    color: "white",
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}))

const Hero = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { regex: "/japan_tea_plantation/" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
            originalName
          }
        }
      }
    }
  `)

  const img = data.file.childImageSharp.fluid

  const classes = useStyles()

  return (
    <Parallax
      bgImage={img.src}
      bgImageSrcSet={img.srcSet}
      bgImageAlt="the cat"
      strength={300}
    >
      <Box style={{ height: "100vh" }}>
        <Container
          className={classes.insideStyles}
          width={4 / 5}
          align="center"
        >
          <Typography variant="h2" component="h1" gutterBottom>
            <Box fontWeight="fontWeightBold">Чай Матча</Box>
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            <Box fontWeight="fontWeightBold">Ваша энергия и настроение</Box>
          </Typography>
        </Container>
      </Box>
    </Parallax>
  )
}

export default Hero
