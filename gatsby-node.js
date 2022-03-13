const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const photoBlogPost = path.resolve(`./src/templates/photo-blog-post.js`)
  const tagTemplate = path.resolve("src/templates/tags.js")

  // Get all markdown blog edgesPostRemark sorted by date
  const result = await graphql(
    `
      {
        postsRemark: allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 2000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                tags
              }
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
        contentful: allContentfulBlogPost {
          edges {
            node {
              id
              slug
              tags
              title
              contentful_id
            }
          }
          totalCount
        }
        photoBlogPosts: allContentfulPhotoBlogPosts {
          edges {
            node {
              id
              slug
              tags
              title
              contentful_id
            }
          }
          totalCount
        }
        contentFulTagGroups: allContentfulBlogPost {
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
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const contentFulEdges = result.data.contentful?.edges
  const photoBlogPosts = result.data.photoBlogPosts?.edges
  if (photoBlogPosts && photoBlogPosts.length > 0) {
    photoBlogPosts.forEach(({ node }, index) => {
      createPage({
        path: node.slug,
        component: photoBlogPost,
        context: {
          id: node.slug,
          slug: node.slug,
          tags: node.tags,
        },
      })
    })
  }
  if (contentFulEdges && contentFulEdges.length > 0) {
    contentFulEdges.forEach(({ node }, index) => {
      createPage({
        path: node.slug,
        component: blogPost,
        context: {
          id: node.slug,
          slug: node.slug,
          tags: node.tags,
        },
      })
    })
  }

  const tags = result.data.contentFulTagGroups.group
  const photoBlogTags = result.data.photoBlogContentFulTagGroups.group
  const combineTags = [...tags, ...photoBlogTags]
  if (combineTags && combineTags.length > 0) {
    combineTags.forEach(tag => {
      createPage({
        path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
        component: tagTemplate,
        context: {
          tag: tag.fieldValue,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `ContentfulBlogPost`) {
    createNodeField({
      name: `slug`,
      node,
      value: node.slug,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
