import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import Parallax from "react-rellax"
import { makeStyles } from "@material-ui/core/styles"
import { Box, Container, Typography } from "@material-ui/core"

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

const Hero = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { regex: "/ravi-pinisetti-ySQXoZLAsmc-unsplash/" }) {
        childImageSharp {
          fluid(quality: 90) {
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
    <Box style={{ overflow: "Hidden" }}>
      <Parallax speed={-3}>
        <BackgroundImage fluid={img}>
          <Box style={{ height: "85vh" }}>{children}</Box>
        </BackgroundImage>
      </Parallax>

      <Box mt={2}>
        <Container
          className={classes.insideStyles}
          width={4 / 5}
          align="center"
        >
          <Box mt={8}>
            <Typography variant="h3" component="h1" gutterBottom>
              <Box fontWeight="fontWeightBold">Японский церемониальный чай матча Flow Brew</Box>
            </Typography>
          </Box>
          {/* <Box mt={5}>
            <ArrowDownwardIcon fontSize="large" />
          </Box> */}
        </Container>
      </Box>
    </Box>
  )
}

export default Hero
