import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useImage } from "../components/ImageContext"

function SEO({
  description,
  lang,
  meta,
  title,
  image,
  isBlogPost,
  index,
  pathname,
  href,
  origin
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            image
            github {
              repo
              branch
              sha
            }
            twitter
          }
        }
      }
    `
  )

  const metaIndex =
    index &&
    (site.siteMetadata.github.branch === "www" ||
      site.siteMetadata.github.branch === "matcha")
  const metaDescription = description || site.siteMetadata.description

  const imgId = image ? image : site.siteMetadata.image
  const metaImage = origin + useImage(imgId).imageSharp.fluid.src

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={title}
        titleTemplate={`%s | ${site.siteMetadata.title}`}
        meta={meta}
      >
        {metaIndex || <meta name="robots" content="noindex" />}
        <meta name="description" content={metaDescription} />
        <meta name="image" content={metaImage} />

        <meta name="github-repo" content={site.siteMetadata.github.repo} />
        <meta name="github-branch" content={site.siteMetadata.github.branch} />
        <meta name="github-commit-sha" content={site.siteMetadata.github.sha} />

        <meta property="og:url" content={href} />
        <meta property="og:type" content={isBlogPost ? "article" : "website"} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={site.siteMetadata.twitter} />
        <meta name="twitter:creator" content={site.siteMetadata.twitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:url" content={href} />
        <meta name="twitter:image" content={metaImage} />
      </Helmet>
    </>
  )
}

SEO.defaultProps = {
  lang: `ru`,
  meta: [],
  description: ``,
  isBlogPost: false,
  index: true,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
}

export default SEO
