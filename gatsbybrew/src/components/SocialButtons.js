import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faVk,
  faFacebookSquare,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"
import { Container, Box } from "@material-ui/core"
import { usePostContext } from "../layouts/PostLayout"

const useStyles = makeStyles(theme => ({
  socialButton: {
    color: theme.palette.primary.main,
  },
}))

const SocialButton = ({ href, icon }) => {
  const classes = useStyles()

  return (
    <Box ml={2}>
      <a href={href}>
        <FontAwesomeIcon
          className={classes.socialButton}
          icon={icon}
          size="5x"
        />
      </a>
    </Box>
  )
}

export default ({ children, ...props }) => {
  const context = usePostContext()

  return (
    <Box mt={4} mb={4}>
      <Container>
        <Box width="100%">
          <Box display="flex" justifyContent="flex-end">
            <SocialButton
              icon={faFacebookSquare}
              href={`https://www.facebook.com/sharer/sharer.php?u=${context.location.href}`}
            />

            <SocialButton
              icon={faTwitter}
              href={`https://twitter.com/share?text=${context.frontmatter.title} @flow_brew&url=${context.location.href}&related=flow_brew`}
            />

            <SocialButton
              icon={faVk}
              href={`https://vk.com/share.php?url=${context.location.href}`}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
