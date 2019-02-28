import React, { useState } from 'react'
import Select from 'react-select';
import { Icon } from 'react-icons-kit'
import {software_paintroller} from 'react-icons-kit/linea/software_paintroller'
import {ecommerce_bag_plus} from 'react-icons-kit/linea/ecommerce_bag_plus'
import {basic_spread_bookmark} from 'react-icons-kit/linea/basic_spread_bookmark'

var BuyButton = React.memo(({post, images, whenClicked}) => {
  const [selected, setSelected] = useState(post.customFields.values[0]);
  var filteredImgs = images.filter(x => x.name == selected);
  var choosenImgSrc = filteredImgs.length > 0
    ? filteredImgs[0].src
    : images[0].src

  return (
    <div>
      <div className="hero">
        <img src={choosenImgSrc} />
      </div>
      <div className="options">
        <div>
          <button
            id="buyButton"
            href='#'
            className='snipcart-add-item buyBtn'
            data-item-id={post.id}
            data-item-price={post.price}
            data-item-image={choosenImgSrc}
            data-item-name={post.title}
            data-item-description={post.description}
            data-item-custom1-name={post.customFields.name}
            data-item-custom1-value={selected}
            data-item-url={"https://fromthegroung.co/" + post.path}>
            Add to bag for {post.price}$
          </button>
          <select
            className="buySel"
            id={post.customFields.name}
            onChange={(e) => setSelected(e.target.value)}
            value={selected}>
            {post.customFields.values.map((x) => (<option key={x}>{x}</option>))}
          </select>
        </div>
        <div>
          <button className="aboutBtn" data-for="left" data-tip="Toggle" onClick={whenClicked}>
            Details<span className="icon"><Icon icon={basic_spread_bookmark} size={26} /></span>
          </button>
        </div>
      </div>
    </div>
  )
})

export default BuyButton;
