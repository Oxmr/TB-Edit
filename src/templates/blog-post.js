import * as React from "react"
import { useEffect } from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MorePosts } from "../components/more-posts"
import { InjectGoogleAds } from "../components/inject-google-ads"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.contentfulBlogPost
  useEffect(() => {
    const parentNodes = document.getElementsByTagName("h4")
    InjectGoogleAds(parentNodes, location)
  }, [])

  if (post === undefined) {
    return <div> oh</div>
  }
  const childrenMarkdown = post.body.childrenMarkdownRemark[0]
  const readingTime = childrenMarkdown.fields.readingTime.text || ""
  const siteTitle = post.title || `Title`
  const date = post.publishDate
  const author = post.author
  const toc = childrenMarkdown.tableOfContents
  const imageData = getImage(post?.heroImage?.localFile)
  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.title}
        description={post.description.description}
        image={imageData}
        pathname={location.pathname}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
          <div>
            {date} - {readingTime}
          </div>
        </header>
        <div style={{ padding: "1rem 0" }}>
          <GatsbyImage image={imageData} alt={post.slug} itemProp="image" />
        </div>
        <section
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html,
          }}
          itemProp="articleBody"
        />
        <footer>
          <hr />
          <MorePosts data={{ ...data.morePhotoPosts, ...data.morePosts }} />

          <Bio author={author} />
        </footer>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query ($slug: String!, $tags: [String!]) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      tags
      slug
      description {
        description
      }
      contentful_id
      publishDate(formatString: "MMMM DD, YYYY")
      body {
        childrenMarkdownRemark {
          tableOfContents
          fields {
            readingTime {
              text
            }
          }
        }
        childMarkdownRemark {
          html
        }
      }
      author {
        name
        shortBio {
          shortBio
        }
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
    morePosts: allContentfulBlogPost(
      filter: { slug: { ne: $slug }, tags: { in: $tags } }
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
    morePhotoPosts: allContentfulPhotoBlogPosts(
      filter: { slug: { ne: $slug }, tags: { in: $tags } }
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
