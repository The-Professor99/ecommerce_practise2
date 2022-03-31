import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

import { useStateValue } from '@/_helpers';
import { alertService } from '@/_services';

import nextIcon from '../images/icon-next.svg';
import prevIcon from '../images/icon-previous.svg';
import plusIcon from '../images/icon-plus.svg';
import minusIcon from '../images/icon-minus.svg';
import cartIcon from '../images/icon-cart.svg';

import './DisplayItem.css';

function DisplayItem(props) {
    
    const [quantity, setQuantity] = useState(1)
    const [{ cart }, dispatch] = useStateValue();

    let dataLength = 20 // change this to reflect length of whole products array
    let strPrice = props.value.price.toString()
    let percOff = parseInt(strPrice.charAt(0) + 0, 10)
  
    const addToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            item: {
                id: props.value.id,
                title: props.value.title,
                image: props.value.image,
                price: props.value.price,
                quantity: quantity,
            }
        });
        alertService.success("Item has being added to cart", { autoClose: false });
    }
    
    const removeFromBasket = (id) => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            item: {
                id: id
            }
        })
    }
  
    function handleChange(e){
      if (e.target.value) {
          setQuantity(parseInt(e.target.value, 10))
      } else {
          setQuantity(e.target.value)
      }
    }

    function handleClick(typ) {
        if (typ === 'add') {
            if (quantity < 99) {
                setQuantity(quantity + 1)
            }  
        } else if (typ === 'minus') {
            if (quantity > 1) {
                setQuantity(quantity - 1)
            }
        }
    }

    return (
        <div className='DisplayItem' >
            <div id="carouselAds" className="carousel slide image-container-main">
                
                <div className="carousel-inner ">
                    <div className="carousel-item active image1-container">
                        <img className="w-100 img-responsive img-fluid" src={props.value.image} alt="Product Image" id="productImage" />
                    </div>
                </div>
                { props.value.id > 1 &&
                    <Link className="carousel-control-prev" to={`/items/${props.value.id - 1}`}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </Link>
                }
                { props.value.id < dataLength &&
                <Link className="carousel-control-next" to={`/items/${props.value.id + 1}`}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </Link>
                }
            </div>
            <div className="product-description-container-main">
                <section className="row">
                    <div className="product-description-container">
                        <article className="product-description">
                            <header className="txt-gold-blue txt-700 mb-3">{props.value.category.toUpperCase()}</header>
                            <h3 className="txt-black-white txt-700 mb-3" id="productName">{props.value.title}</h3>
                            <p className="txt-gray-purple description">{props.value.description}</p>
                        </article>
                        <div className="product-price-container">
                            <div className="product-price mb-3">
                                <div className="product-price-current">
                                    <div>
                                        <span className="product-price-value txt-black-white txt-700">$<span id="currentPrice">{props.value.price}</span></span>
                                    </div>
                                    <div className="perc-off">
                                        <span className="product-price-mark txt-gold-blue">{percOff}%</span>
                                    </div>
                                </div>
                                <div className="product-price-original">
                                    <div className="product-price-del">
                                        <s className="product-price-value txt-gray-purple">{(props.value.price / (1 - (percOff/100))).toFixed(2)}</s>
                                    </div>
                                </div>
                            </div>
                            <div className="add-item-container">
                                <div className="cart-adder mb-3">
                                    <button type="button" role="button" onClick={() => handleClick('minus')} >
                                        <svg width="12" height="4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><path d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z" id="a"/></defs><use fill="var(--primary-color)" fillRule="nonzero" xlinkHref="#a"/></svg>
                                    </button>
                                    <input aria-valuemax="99" type="number" step="1" min="1" max="99" aria-valuemin="1" height="100%" id="numValue" className="txt-white-black" autoComplete="off" value={quantity} onChange={(e) => handleChange(e)} />
                                
                                    <button type="button" role="button" onClick={() => handleClick('add')}>
                                        <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <defs>
                                                <path d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z" id="b"/>
                                            </defs>
                                            <use fill="var(--primary-color)" fillRule="nonzero" xlinkHref="#b"/>
                                        </svg> 
                                    </button>
                                </div>
                                <div className="submit-order">  
                                    <button className="cartButton txt-white" onClick={addToCart}>
                                        <img src={cartIcon} alt="Cart" />
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div> 
    )
}

export { DisplayItem }
