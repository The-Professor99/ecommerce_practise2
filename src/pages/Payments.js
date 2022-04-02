import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Alert } from '@/_components';
import { useStateValue, getCartTotal } from '@/_helpers';
import { accountService, alertService } from "@/_services";

import './Payments.css';

import stripeImage from '../images/undraw_stripe_payments.svg';

function Payments() {
    const [{ user, cart }, dispatch] = useStateValue();
    const location = useLocation();  
    
    const [processed, setProcessed] = useState(false);
    const [error, setError] = useState(null);
    const [isProcessing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        accountService.createPaymentIntent({ price: (getCartTotal(cart) * 100).toFixed(3)})
        .then((data) => {
            setClientSecret(data.clientSecret)
        })

        setClientSecret('')
      }, [cart]);

    function fakeCardConfirmPayment(clientSecret, params) {
        console.log(clientSecret)
        // stripe's api takes client secret and params
        // to process and return a response
        return true;
    }

    const handleChange = async (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        

        if (!stripe || !elements) {
          setProcessing(false);
          return;
        }    

        console.log(stripe, elements)

        if (!cart?.length) {
            setProcessing(false);
            alertService.error("No item in cart!");
            return;
        }

        // fakeCardConfirmPayment would be a real call to stripe's api
        // using async await.
        // however, this may not be possible with our use of a fake backend
        // which can't generate a client secret.
        const data = fakeCardConfirmPayment(
            clientSecret,{
                payment_method: {
                  card: elements.getElement(CardElement),
                }
        })

        if (data) {
            accountService.updateOrders({ cart, user })
            .then(() => {
                setProcessing(false);
                setProcessed(true);
                dispatch({
                    type: 'EMPTY_CART'
                });
            })
            .catch(error => {
                setProcessing(false);
                alertService.error(error);
            });

        }

    }

    const cardStyle = {
        style: {
            base: {
            },
        },
    };

    return (
        user ? (
        <div className="Payments">
        <Alert />
        <div className="container mx-auto mt-4 px-4 container-1 pt-20 pb-12">
            <div className="flex flex-wrap ">
                <div className="image-container pr-4 pl-4 ">
                    <img alt="" src={stripeImage} className="img-responsive max-w-full h-auto" />
                </div>
                <section className="py-8 px-4 mb-8 bg-gray-200 rounded pr-4 pl-4 text-container">
                    <h3 className="h1 mt-2">Make a Payment</h3>
                    <div>
                        <form id="payment-form" onSubmit={handleSubmit}>
                        <p className="total">Total Purchase: ${getCartTotal(cart).toFixed(3)}</p> 
                        {/* Delivery Address would go here!. */}
                        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                        <button id="submit" disabled={isProcessing || disabled}> 
                            {isProcessing && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Pay now
                        </button>
                        <p className={processed ? "result-message" : "result-message hidden"}>
                            Cannot Process Payments now as the feature, which requires a real backend, is still being built!.
                            <br />
                            <Link to='/profile/orders'>
                            Check your orders here
                            </Link>
                        </p>
                        </form>
                    </div>
                </section>
            </div>
        </div>
        </div>
        ) : (
            <Navigate to="/account/login" replace state={{ from: location }} />
        )
    )
}

export { Payments };