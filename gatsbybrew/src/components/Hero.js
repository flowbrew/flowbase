import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import Parallax from "react-rellax"
import { makeStyles } from "@material-ui/core/styles"
import { Box, Container, Typography } from "@material-ui/core"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  },
  content: {
    color: "white",
    flex: "0 0 420px",
  },
  bg: {
    backgroundPosition: "58% 50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    filter: "saturate(1.2)",
  },
}))

const Hero = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { regex: "/matcha_tea_in_hand/" }) {
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
    <BackgroundImage fluid={img} className={classes.bg}>
      <Box className={classes.container}>
        <Box className={classes.content}>
          <Container
            className={classes.insideStyles}
            width={4 / 5}
            align="center"
          >
            <Box mt={-20}>
              <Typography variant="h3" component="h1" gutterBottom>
                <Box fontWeight="fontWeightBold">БОЖЕСТВЕННЫЙ чай матча Flow Brew</Box>
              </Typography>
              {/* <Typography variant="h5" component="h2" gutterBottom>
                <Box fontWeight="fontWeightBold">
                  Времена перемен
                  <br />
                  Приносят дары
                  <br />
                  Тем, кто мудр и спокоен
                </Box>
              </Typography> */}
            </Box>
          </Container>
        </Box>
      </Box>
    </BackgroundImage>

    // <Box className={classes.container}>

    //   <Box style={{ height: "657px" }}>{children}</Box>

    //   <Box mt={2}>
    //     <Container
    //       className={classes.insideStyles}
    //       width={4 / 5}
    //       align="center"
    //     >
    //       <Box mt={8}>
    //         <Typography variant="h2" component="h1" gutterBottom>
    //           <Box fontWeight="fontWeightBold">Чай Матча</Box>
    //         </Typography>
    //         <Typography variant="h5" component="h2" gutterBottom>
    //           <Box fontWeight="fontWeightBold">
    //             Времена перемен
    //             <br />
    //             Приносят дары
    //             <br />
    //             Тем, кто мудр и спокоен
    //           </Box>
    //         </Typography>
    //       </Box>
    //     </Container>
    //   </Box>
    // </Box>
  )
}

export default Hero
