import React from "react"
import Img from "gatsby-image"
import { useImage } from "../components/ImageContext"
import { Grid, Typography, Box } from "@material-ui/core"
import { FLBPaper } from "../common"

export default ({ children, ...props }) => {
  const avatar = useImage("kozin_aleksey")
  const signature = useImage("signature")

  return (
    <Box mt={5}>
      <Grid container>
        <Grid xs={6} sm={3} item>
          <FLBPaper>
            <Img
              fluid={{ ...avatar.imageSharp.fluid, aspectRatio: 1 }}
              alt={avatar.imageData.alt}
            />
          </FLBPaper>
          <Box textAlign="center" mt={1}>
            <Typography variant="subtitle1" paragraph={true}>
              {avatar.imageData.alt}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={6} sm={3} item>
          <FLBPaper>
            <Box>
              <Img
                fluid={{ ...signature.imageSharp.fluid, aspectRatio: 1 }}
                alt={signature.imageData.alt}
              />
            </Box>
          </FLBPaper>
        </Grid>
      </Grid>
    </Box>
  )
}
