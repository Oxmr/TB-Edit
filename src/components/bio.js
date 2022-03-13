/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

const Bio = prop => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = prop.author || data.site.siteMetadata?.author
  const name = author.name
  const summary = author?.shortBio.shortBio || author?.summary
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio" itemProp="author">
      {/*<StaticImage*/}
      {/*  className="bio-avatar"*/}
      {/*  layout="fixed"*/}
      {/*  formats={["auto", "webp", "avif"]}*/}
      {/*  src="../images/profile-pic.png"*/}
      {/*  width={50}*/}
      {/*  height={50}*/}
      {/*  quality={95}*/}
      {/*  alt="Profile picture"*/}
      {/*/>*/}
      {author?.name && (
        <p>
          Written by <strong>{name}</strong> - {summary || null}
          {/*<a href={`https://twitter.com/${social?.twitter || ``}`}>*/}
          {/*  You should follow them on Twitter*/}
          {/*</a>*/}
        </p>
      )}
    </div>
  )
}

export default Bio
