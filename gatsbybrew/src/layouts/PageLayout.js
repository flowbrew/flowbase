import React from "react"
import PropTypes from "prop-types"
import MainLayout from "../layouts/MainLayout"
import { MDXProvider } from "@mdx-js/react"
import { Box } from "@material-ui/core"
import { Section, MDXComponents } from "../common"

const PageLayout = ({ children, pageContext, ...props }) => {
  return (
    <MainLayout pageContext={pageContext} {...props}>
      <MDXProvider components={MDXComponents}>
        <Box pt={0} pb={8}>
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
