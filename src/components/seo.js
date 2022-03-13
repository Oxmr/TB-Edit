/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"

const Seo = ({ description, lang, meta, title, image, pathname }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null
  console.log(meta)
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      link={
        canonical
          ? [
              {
                rel: "canonical",
                href: canonical,
              },
            ]
          : []
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: site.siteMetadata.siteUrl,
        },
        {
          name: `robots`,
          content: "index,follow",
        },
        // {
        //   name: `twitter:card`,1
        //   content: `summary`,
        // },
        // {
        //   name: `twitter:creator`,
        //   content: site.siteMetadata?.social?.twitter || ``,
        // },
        // {
        //   name: `twitter:title`,
        //   content: title,
        // },
        // {
        //   name: `twitter:description`,
        //   content: metaDescription,
        // },
      ]
        .concat(meta)
        .concat(
          image
            ? [
                {
                  property: "og:image",
                  content: `${site.siteMetadata.siteUrl}${image.images.fallback.src}`,
                },
                {
                  property: "og:image:width",
                  content: image.width,
                },
                {
                  property: "og:image:height",
                  content: image.height,
                },
                {
                  name: "twitter:card",
                  content: "summary_large_image",
                },
              ]
            : [
                {
                  name: "twitter:card",
                  content: "summary",
                },
              ]
        )}
    >
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5456950369650696"
        crossOrigin="anonymous"
      ></script>
    </Helmet>
  )
}

Seo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo
