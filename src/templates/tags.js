import React from "react"
import PropTypes from "prop-types"

// Components
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { MorePosts } from "../components/more-posts"

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.morePosts
  const { edges: photoEdges, totalCount: photoTotalCount } = data.morePhotoPosts
  const tagHeader = `Post${
    totalCount === 1 || photoTotalCount === 1 ? "" : "s"
  } tagged with ${tag.toUpperCase()}`
  const combineEdges = { edges: [...photoEdges, ...edges] }
  return (
    <Layout location={location}>
      <h3>{tagHeader}</h3>
      <MorePosts data={combineEdges} hideHeader />
      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query ($tag: [String!]) {
    morePosts: allContentfulBlogPost(filter: { tags: { in: $tag } }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM DD, YYYY")
          description {
            description
          }
          heroImage {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  avifOptions: { quality: 5, speed: 3 }
                  placeholder: BLURRED
                  width: 250
                )
              }
            }
          }
        }
      }
    }
    morePhotoPosts: allContentfulPhotoBlogPosts(
      filter: { tags: { in: $tag } }
    ) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM DD, YYYY")
          description {
            description
          }
          heroImage {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  avifOptions: { quality: 5, speed: 3 }
                  placeholder: BLURRED
                  width: 250
                )
              }
            }
          }
        }
      }
    }
  }
`
