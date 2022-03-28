import React from 'react';

import { useStateValue, getCartTotal } from '@/_helpers';

import './Cart.css';
import deleteIcon from '../images/icon-delete.svg';



function CartItem({ item }) {

    const [{ cart }, dispatch] = useStateValue();

    const removeFromCart = () => {
        dispatch({
            type: "REMOVE_FROM_BASKET",
            item: {
                id: item.id
            }
        })
    }
    return (
        <div className='card-details'>
            <img 
            src={item.image} 
            className="card-images" 
            alt="Product picture" />
            <div className="details-description">
                <p className="txt-gray-purple">
                    {item.title}
                </p>
                <p className="txt-gray-purple">
                    <span>
                        {item.price}
                    </span> 
                    x 
                    <span>
                        {item.quantity}
                    </span> 
                    <span className="txt-black-white txt-700 ms-4">
                       $ {(item.price * item.quantity).toFixed(2)}
                    </span>
                </p>
            </div>
            <button 
            type="button" 
            className="card-images delete" onClick={removeFromCart}>
                <img src={deleteIcon} alt="delete button" />
            </button>
        </div>
    )
}


function Cart() {
  
  const [{ cart }, dispatch] = useStateValue();
//   let carts = localStorage.getItem("carts");
//   console.log(carts)

  const showTotal = () => {
        let total = getCartTotal(cart);
        console.log(total)
        alert(`Your Total Purchase is: ${total.toFixed(2)}`)
  }
  return (
    <div className="Cart cart-orders-display card">
        <div className="card-block">
            <h3 className="card-title txt-black-white">
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
                        className="txt-white" 
                        onClick={showTotal}>
                            Checkout
                        </button>
                    </div>
                </div>
            ) : (
            <p className="card-texts txt-black-white" id="empty">Your Cart is Empty</p> 
            )}
        </div>
    </div>
  )
}

export { Cart };