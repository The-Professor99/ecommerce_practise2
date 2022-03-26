import React from 'react';

import { useStateValue } from '@/_helpers';

import './Cart.css';
import deleteIcon from '../images/icon-delete.svg';

function CartItem({ item }) {
    return (
        <div className='card-details'>
            <img 
            src={item.image} 
            className="card-images" 
            alt="Product picture" />
            <div className="details-description">
                <p className="txt-dark-blue">
                    {item.title}
                </p>
                <p className="txt-dark-blue">
                    <span>
                        {item.price}
                    </span> 
                    x 
                    <span>
                        3
                    </span> 
                    <span className="txt-dark-blue txt-700">
                        750
                    </span>
                </p>
            </div>
            <button 
            type="button" 
            className="card-images delete">
                <img src={deleteIcon} alt="delete button" />
            </button>
        </div>
    )
}

function Cart() {
  const [{ cart }, dispatch] = useStateValue();
  return (
    <div className="Cart cart-orders-display card">
        <div className="card-block">
            <h3 className="card-title txt-dark-blue">
                Cart
            </h3>
            <div className="dropdown-divider"></div>
            { cart.length ? (
                <div 
                className="card-details-container" 
                id="cardDetailsContainer">
                    <div className="card-details-container-sub">
                    {cart.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                    </div>
                    <div 
                    className="checkout" 
                    id="checkOut">
                        <button 
                        type="button" 
                        className="bck-orange txt-white">
                            Checkout
                        </button>
                    </div>
                </div>
            ) : (
            <p className="card-texts txt-gray-blue" id="empty">Your Cart is Empty</p> 
            )}
        </div>
    </div>
  )
}

export { Cart };