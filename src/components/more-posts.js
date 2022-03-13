import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import * as React from "react"

export const MorePosts = ({ data, hideHeader }) => {
  if (data && data?.edges && data?.edges.length === 0) return null
  return (
    <>
      <div className="more-posts">
        {!hideHeader && <h4>Read similar posts</h4>}
        {data.edges.map(({ node }, index) => {
          const imageData = getImage(node?.heroImage?.localFile)
          return (
            <Link to={`/${node?.slug}`}>
              <div className="more-posts post-child">
                <div className="more-posts-image">
                  <GatsbyImage
                    image={imageData}
                    alt={node?.slug}
                    itemProp="image"
                  />
                </div>
                <div className="post-child-text">
                  <div>{node?.title}</div>

                  <div className="more-posts-caption ">
                    {node?.description.description}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <hr />
    </>
  )
}
