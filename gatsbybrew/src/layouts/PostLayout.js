import React from "react"
import PropTypes from "prop-types"
import MainLayout from "../layouts/MainLayout"
import { MDXProvider } from "@mdx-js/react"
import {
  Typography,
  CardHeader,
  Avatar,
  Container,
  Box,
} from "@material-ui/core"
import { useImage } from "../components/ImageContext"
import {
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
  MDXComponents,
  ImageBlock,
} from "../common"
import { motion } from "framer-motion"

import SocialButtons from "../components/SocialButtons"
import Signature from "../components/Signature"

const PostContext = React.createContext({})

const PostContextProvider = ({ pageContext, children }) => {
  return (
    <PostContext.Provider value={pageContext}>{children}</PostContext.Provider>
  )
}

export const usePostContext = () => {
  return React.useContext(PostContext)
}

const PostHeader = ({ frontmatter }) => {
  const avatar = useImage("kozin_aleksey")
  const dateStr = new Date(frontmatter.date).toLocaleDateString("ru-RU")

  return (
    <>
      <Box mb={4}>
        <MDXComponents.h1>{frontmatter.title}</MDXComponents.h1>
      </Box>
      <Box ml={-2} mt={-2}>
        <Container>
          <CardHeader
            avatar={
              <Avatar
                alt={avatar.imageData.alt}
                src={avatar.imageSharp.fluid.src}
              />
            }
            title={frontmatter.author}
            subheader={dateStr}
          />
        </Container>
      </Box>
      <Container>
        <Typography variant="subtitle1" component="div" paragraph={true}>
          {frontmatter.description}
        </Typography>
      </Container>
      <ImageBlock image={frontmatter.image} ratio={3 / 2} />
    </>
  )
}

const MyComponent = () => (
  <motion.div
    animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
  />
)

const PostLayout = ({ children, pageContext, ...props }) => {
  return (
    <MainLayout {...props}>
      <PostContextProvider pageContext={{...pageContext, ...props}}>
        <MDXProvider components={MDXComponents}>
          <Box pt={4} pb={8}>
            <Section small>
              <PostHeader frontmatter={pageContext.frontmatter} />
              {children}
              <SocialButtons />
              <Signature />
            </Section>
          </Box>
        </MDXProvider>
      </PostContextProvider>
    </MainLayout>
  )
}

PostLayout.propTypes = {
  location: PropTypes.any.isRequired,
}

export default PostLayout
