import * as React from "react"
import { graphql, Link } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const contentFulEdges = data.allContentfulBlogPost.edges
  const photoContentFulEdges = data.allContentfulPhotoBlogPosts.edges
  const allEdges = [...contentFulEdges, ...photoContentFulEdges].sort(
    function compare(a, b) {
      var dateA = new Date(a.node.publishDate)
      var dateB = new Date(b.node.publishDate)
      return dateB - dateA
    }
  )
  if (allEdges.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }
  // const contentFulEdges = data.allContentfulBlogPost.edges
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="TB" pathname={location.pathname} />

      <ol style={{ listStyle: `none` }}>
        {allEdges.map(post => {
          const node = post.node
          const title = node?.title
          const publishDate = node?.publishDate
          const slug = node?.slug
          const description = node?.description?.description
          const imageData = getImage(node.heroImage?.localFile)
          return (
            <li key={slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <Link to={slug} itemProp="url">
                    <div style={{ paddingBottom: "1rem" }}>
                      <GatsbyImage
                        image={imageData}
                        alt={slug}
                        itemProp="image"
                      />
                    </div>
                  </Link>
                  <h2>
                    <Link to={slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{publishDate}</small>
                </header>
                {/*<section>*/}
                {/*  <p*/}
                {/*    dangerouslySetInnerHTML={{*/}
                {/*      __html: description,*/}
                {/*    }}*/}
                {/*    itemProp="description"*/}
                {/*  />*/}
                {/*</section>*/}
              </article>
            </li>
          )
        })}
      </ol>
      {/*<Bio />*/}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
      edges {
        node {
          slug
          title
          publishDate(formatString: "MMMM DD, YYYY")
          description {
            description
          }
          heroImage {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  avifOptions: { quality: 5, speed: 7 }
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    }
    allContentfulPhotoBlogPosts(sort: { fields: publishDate, order: DESC }) {
      edges {
        node {
          slug
          title
          publishDate(formatString: "MMMM DD, YYYY")
          description {
            description
          }
          heroImage {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  avifOptions: { quality: 5, speed: 7 }
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    }
  }
`
