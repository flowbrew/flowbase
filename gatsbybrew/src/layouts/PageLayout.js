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
  MDXComponents,
} from "../common"

const PageLayout = ({ children, pageContext, ...props }) => {
  return (
    <MainLayout {...props}>
      <MDXProvider components={MDXComponents}>
        <Box pt={4} pb={8}>
          <Section small>
            {pageContext && (
              <Box mb={4}>
                <MDXComponents.h1>
                  {pageContext.frontmatter.title}
                </MDXComponents.h1>
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
