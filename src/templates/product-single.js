import React from 'react'
import Helmet from 'react-helmet'
import Select from 'react-select'
import chroma from 'chroma-js'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import { Icon } from 'react-icons-kit'
import {arrows_plus} from 'react-icons-kit/linea/arrows_plus'
import {software_paintroller} from 'react-icons-kit/linea/software_paintroller'
import {basic_spread_bookmark} from 'react-icons-kit/linea/basic_spread_bookmark'
import {iosBookmarksOutline} from 'react-icons-kit/ionicons/iosBookmarksOutline'
import {ecommerce_bag_plus} from 'react-icons-kit/linea/ecommerce_bag_plus'

import Layout from '../components/Layout'

import Fade from 'react-reveal/Fade'
import config from 'react-reveal/globals'
config({ ssrFadeout: true })

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
})

class ProductTemplate extends React.Component {
  constructor(props) {
    super(props)

    const post = this.props.data.markdownRemark
    const images = post.frontmatter.image
      .map(x => ({
        name: x.name,
        src: require(`./../products${post.frontmatter.path}${x.src}.jpg`)
      }))
    const selected = this.props.data.markdownRemark.frontmatter.customFields.values[0]
    const filteredImgs = images.filter(x => x.name == selected)
    const choosenImgSrc = filteredImgs.length > 0
      ? filteredImgs[0].src
      : images[0].src

    this.state = {
      addClass: false,
      post: post,
      images: images,
      selected: {
        value: selected,
        label: selected
      },
      choosenImgSrc: choosenImgSrc,
    }
  }

  handleChange(selected) {
    const filteredImgs = this.state.images.filter(x => x.name == selected.label)
    const choosenImgSrc = filteredImgs.length > 0
      ? filteredImgs[0].src
      : this.state.images[0].src
    this.setState({
      selected: selected,
      choosenImgSrc: choosenImgSrc
    })
  }

  toggle() {
    this.setState({
      addClass: !this.state.addClass
    })
  }

  render() {
    let aboutClass = ["about", "content"]
    if(this.state.addClass) {
      aboutClass.push('show')
    }
    const post = this.state.post
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = post.excerpt
    const { previous, next, posts } = this.props.pageContext
    const nextImages = next.frontmatter.image
      .map(x => ({
        name: x.name,
        src: require(`./../products${next.frontmatter.path}${x.src}.jpg`)
      }))
    const previousImages = previous.frontmatter.image
      .map(x => ({
        name: x.name,
        src: require(`./../products${previous.frontmatter.path}${x.src}.jpg`)
      }))
    const options = post.frontmatter.customFields.values
      .map((x) => ({
        value: x,
        label: x
      }))

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
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

        <section className="product-single">
          {/*
          <Fade>
            <div className="content">
              <h1>{post.frontmatter.collection} &mdash; {post.frontmatter.category}</h1>
            </div>
          </Fade>
          */}

          <Fade>
            <div className="hero">
              <img src={this.state.choosenImgSrc} />
            </div>
          </Fade>

          <Fade>
            <div className="options">
              <div className="cell">
                <div className="wrap">
                  <Icon data-for="top" data-tip="Buy it!" icon={ecommerce_bag_plus} size={28} />
                </div>
                <div className="wrap">
                  <button
                    id="buyButton"
                    href='#'
                    className='snipcart-add-item buyBtn'
                    data-item-id={post.frontmatter.id}
                    data-item-price={post.frontmatter.price}
                    data-item-image={this.state.choosenImgSrc}
                    data-item-name={post.frontmatter.title}
                    data-item-description={post.frontmatter.description}
                    data-item-custom1-name={post.frontmatter.customFields.name}
                    data-item-custom1-value={this.state.selected.value}
                    data-item-url={"https://fromthegroung.co/" + post.frontmatter.path}>
                    Add to bag for {post.frontmatter.price}$
                  </button>
                </div>
                <div className="wrap">
                  <Icon data-for="top" data-tip="Choose style" icon={software_paintroller} size={28} />
                </div>
                <div className="wrap">
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    id={post.frontmatter.customFields.name}
                    value={this.state.selected}
                    options={options}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
              </div>
              <div className="cell">
                <button className="aboutBtn" data-for="left" data-tip="Toggle" onClick={this.toggle.bind(this)}>
                  <small>Details</small><span className="icon"><Icon icon={basic_spread_bookmark} size={24} /></span>
                </button>
              </div>
            </div>
          </Fade>

          <div className={aboutClass.join(' ')}>
            <Fade>
              <h3>{post.frontmatter.collection} &mdash; {post.frontmatter.category}</h3>
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </Fade>
          </div>

          {/*
          <nav className="nav">
            <div className="link">
              <Fade>
                <div>
                  <span className="icon"><Icon data-for="topMint" data-tip={previous.frontmatter.category} icon={iosBookmarksOutline} size={28} /></span>
                  <span><Icon data-for="topMint" data-tip="Multiple styles" icon={software_paintroller} size={28} /></span>
                  <Link to={previous.fields.slug}>
                    <img src={previousImages[0].src}></img>
                    <div className="deets"><Icon icon={arrows_plus} size={32} /></div>
                  </Link>
                </div>
              </Fade>
            </div>
            <div className="link">
              <Fade>
                <div>
                  <span className="icon"><Icon data-for="topMint" data-tip={next.frontmatter.category} icon={iosBookmarksOutline} size={28} /></span>
                  <span><Icon data-for="topMint" data-tip="Multiple styles" icon={software_paintroller} size={28} /></span>
                  <Link to={next.fields.slug}>
                    <img src={nextImages[0].src}></img>
                    <div className="deets"><Icon icon={arrows_plus} size={32} /></div>
                  </Link>
                </div>
              </Fade>
            </div>
          </nav>
          */}
        </section>

        <section className="product-grid">
          {
            posts.map(({ node }) => {
              const title = get(node, 'frontmatter.title') || node.fields.slug
              var image = get(node, 'frontmatter.image')
              var category = get(node, 'frontmatter.category')
              var collection = get(node, 'frontmatter.collection')
              const imgSrc= require(`./../products${node.frontmatter.path}${image[0].src}.jpg`)
              const imgDef= require(`./../assets/default.jpg`)

              return (
                <div
                  className="product-grid-cell"
                  key={node.fields.slug}>
                  <Fade>
                    <div>
                      <span className="icon"><Icon data-for="right" data-tip={category} icon={iosBookmarksOutline} size={28} /></span>
                      <Link to={node.fields.slug}>
                        <img src={imgSrc}></img>
                        <div className="deets">
                          <Icon icon={arrows_plus} size={38} />
                        </div>
                      </Link>
                      <small><span className="text">{collection} &mdash; {category}</span></small>
                    </div>
                  </Fade>
                </div>
              )
            })
          }
        </section>
      </Layout>
    )
  }
}

export default ProductTemplate

export const pageQuery = graphql`
  query ProductBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        price
        id
        path
        description
        collection
        category
        image {
          name
          src
        }
        customFields {
          name
          values
        }
      }
    }
  }
`
