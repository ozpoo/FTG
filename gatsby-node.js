const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const product = path.resolve(`./src/templates/product-single.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                category
                collection
                path
                image {
                  name
                  src
                }
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create single product pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const next = index === posts.length - 1 ? posts[0].node : posts[index + 1].node
      const previous = index === 0 ? posts[posts.length-1].node : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: product,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
          posts,
        }
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
