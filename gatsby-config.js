require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const siteUrl = process.env.URL || `https://travelberg.io`
module.exports = {
  siteMetadata: {
    title: `TravelBerg`,
    author: {
      name: `Vishal Kumar`,
      summary: `who lives in Dallas, and spends a lot of time on Google Maps and Google flights planning out where to travel next.`,
    },
    description: `TravelBerg`,
    siteUrl: `https://travelberg.io`,
    social: {},
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-instagram-embed`,
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
        }
      `,
        resolveSiteUrl: () => siteUrl,
        output: "/sitemap",
        createLinkInHead: true,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map(page => {
            return { ...page }
          })
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          }
        },
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        plugins: [
          `gatsby-remark-reading-time`,
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: false,
              ordered: false,
              fromHeading: 1,
              toHeading: 6,
              className: "table-of-contents",
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `G-MQHLM8V3V8`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-MQHLM8V3V8", // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          // optimize_id: "OPT_CONTAINER_ID",
          // anonymize_ip: true,
          // cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          // head: false,
          // Setting this parameter is also optional
          // respectDNT: true,
          // Avoids sending pageview hits from custom paths
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
    // {
    //   resolve: `gatsby-plugin-feed`,
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             title
    //             description
    //             siteUrl
    //             site_url: siteUrl
    //           }
    //         }
    //       }
    //     `,
    //     feeds: [
    //       {
    //         serialize: ({ query: { site, allMarkdownRemark } }) => {
    //           return allMarkdownRemark.nodes.map(node => {
    //             return Object.assign({}, node.frontmatter, {
    //               description: node.excerpt,
    //               date: node.frontmatter.date,
    //               url: site.siteMetadata.siteUrl + node.fields.slug,
    //               guid: site.siteMetadata.siteUrl + node.fields.slug,
    //               custom_elements: [{ "content:encoded": node.html }],
    //             })
    //           })
    //         },
    //         query: `
    //           {
    //             allMarkdownRemark(
    //               sort: { order: DESC, fields: [frontmatter___date] },
    //             ) {
    //               nodes {
    //                 excerpt
    //                 html
    //                 fields {
    //                   slug
    //                 }
    //                 frontmatter {
    //                   title
    //                   date
    //                 }
    //               }
    //             }
    //           }
    //         `,
    //         output: "/rss.xml",
    //         title: "TravelBerg RSS Feed",
    //       },
    //     ],
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `TravelBerg`,
        short_name: `TB`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/tb-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
