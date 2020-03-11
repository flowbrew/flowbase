import React from "react"
import PropTypes from "prop-types"
import MainLayout from "../layouts/MainLayout"
import { MDXProvider } from "@mdx-js/react"
import { Container, Box } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"

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
} from "../common"

const TypographyWrapper = (Component, mt) => ({ children, ...props }) => (
  <Container>
    <Component children={children} mt={mt} {...props} />
  </Container>
)

const components = {
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

const PageLayout = ({ children, pageContext, ...props }) => {
  return (
    <MainLayout {...props}>
      <MDXProvider components={components}>
        <Box pt={4} pb={8}>
          <Section>
            {pageContext && (
              <Box mb={4}>
                <components.h1>{pageContext.frontmatter.title}</components.h1>
              </Box>
            )}
            {children}
          </Section>
        </Box>
      </MDXProvider>
    </MainLayout>
  )
}

PageLayout.propTypes = {
  location: PropTypes.any.isRequired,
}

export default PageLayout
