import React from 'react'
import { Link, graphql } from 'gatsby'
import { Icon } from 'react-icons-kit'
import {iosBookmarksOutline} from 'react-icons-kit/ionicons/iosBookmarksOutline'
import {software_paintroller} from 'react-icons-kit/linea/software_paintroller'
import {arrows_plus} from 'react-icons-kit/linea/arrows_plus'

import get from 'lodash/get'
import hero from './../assets/hero/hero01.jpg'

import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import Fade from 'react-reveal/Fade';

class ProductIndex extends React.Component {
  render() {

    document.addEventListener('snipcart.ready', function() {
      window.count = Snipcart.api.items.count()
      window.total = Snipcart.api.cart.get().total
      console.log(window.count)
      console.log(window.total)
    })

    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(this, 'props.data.site.siteMetadata.description')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
          link={[{
            href:"https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css",
            rel:"stylesheet",
            type:"text/css"
          }]}
          script={[{
            type: 'text/javascript',
            src:"https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"
          },{
            type: 'text/javascript',
            id: "snipcart",
            "data-api-key": "YjFjZTU3OWUtNGU4ZS00YTA2LWFiNDMtZDEzNDIwYmE1YmZiNjM2ODY3MTIwNTg0NTk5MjEy",
            src:"https://cdn.snipcart.com/scripts/2.0/snipcart.js"
          }]}/>

        <section className="hero">
          <Fade>
            <img src={hero} alt="From The Ground Hero Image" />
          </Fade>
        </section>

        <section className="product-grid">
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug;
            const image = get(node, 'frontmatter.image');
            const category = get(node, 'frontmatter.category');
            const collection = get(node, 'frontmatter.collection');
            const imgSrc= require(`./../products${node.frontmatter.path}${image[0].src}.jpg`);
            const imgDef= require(`./../assets/default.jpg`);

            return (
              <div
                className="product-grid-cell"
                key={node.fields.slug}>
                <Fade>
                  <div>
                    <span className="icon"><Icon data-for="right" data-tip={category} icon={iosBookmarksOutline} size={28} /></span>
                    {/*
                      <span><Icon data-for="topMint" data-tip="Multiple styles" icon={software_paintroller} size={28} /></span>
                    */}
                    <Link to={node.fields.slug}>
                      <img src={imgSrc}></img>
                      <div className="deets">
                        <Icon icon={arrows_plus} size={38} />
                        {/* <small className="text">View</small> */}
                      </div>
                    </Link>
                    <small><span className="text">{collection} &mdash; {category}</span></small>
                  </div>
                </Fade>
              </div>
            )
          })}
        </section>
      </Layout>
    )
  }
}

export default ProductIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            path
            category
            collection
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
