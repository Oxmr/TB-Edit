import React from "react"
import PropTypes from "prop-types"
import _ from "lodash"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { graphql, Link } from "gatsby"
import Seo from "../components/seo"
import Layout from "../components/layout"

const TagsPage = ({
  data: {
    allContentfulBlogPost: { group },
    photoBlogContentFulTagGroups: { group: photoBlogPostGroup },
    site: {
      siteMetadata: { title },
    },
  },
  location,
}) => {
  const combinedSortedTags = _.sortBy(
    [...group, ...photoBlogPostGroup],
    "fieldValue"
  )
  return (
    <Layout location={location} title={title}>
      <div>
        <Seo title={title} />
        <div>
          <h1>Tags</h1>
          <div className="tag-container">
            {combinedSortedTags.map(tag => (
              <div className="tag-box" key={tag.fieldValue}>
                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  <div className="tag-box-name ">
                    {tag.fieldValue.toUpperCase()} ({tag.totalCount})
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost {
      group(field: tags) {
        totalCount
        fieldValue
      }
    }
    photoBlogContentFulTagGroups: allContentfulPhotoBlogPosts {
      group(field: tags) {
        totalCount
        fieldValue
      }
    }
  }
`
