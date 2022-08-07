import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Link, Navigate, useLocation } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

import { Alert } from "@/_components";
import { useStateValue, getCartTotal } from "@/_helpers";
import { accountService, alertService } from "@/_services";

import "./Payments.css";

import stripeImage from "../images/undraw_stripe_payments.svg";

function Payments() {
  const [{ user, cart }, dispatch] = useStateValue();
  const location = useLocation();

  const [isProcessing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [transaction_status, setTransactionStatus] = useState("");

  console.log(user);
  const config = {
    public_key: "FLWPUBK_TEST-c6dec0d9f79fc4cca6835995b929596a-X",
    tx_ref: Date.now(),
    amount: getCartTotal(cart).toFixed(3),
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user.email,
      name: `${user.title} ${user.firstName} ${user.lastName}`,
    },
    customizations: {
      title: "Sneakers Store",
      description: "Purchase items in cart",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: async (response) => {
      closePaymentModal();
      setTransactionStatus("pending");
      await verifyTransactionOnBackend(response.transaction_id);
      if (window.verified === true) {
        // to be done by a backend, i.e upon verifying from the backend and payment is successful.
        accountService
          .updateOrders({ cart, user })
          .then(() => {
            setProcessing(false);
            dispatch({
              type: "EMPTY_CART",
            });
          })
          .catch((error) => {
            setProcessing(false);
            alertService.error(error);
          });
        setTransactionStatus("success");
      } else {
        setTransactionStatus("failed");
      }
    },
    onClose: (incomplete) => {
      if (incomplete || window.verified === false) {
        setTransactionStatus("failed");
      } else {
        if (window.verified == true) {
          setTransactionStatus("success");
        } else {
          setTransactionStatus("pending");
        }
      }
    },
  };

  async function verifyTransactionOnBackend(transactionId) {
    // Let's just pretend the request was successful
    function resolveAfter2Seconds(x) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve((window.verified = x));
        }, 2000);
      });
    }

    await resolveAfter2Seconds(true);

    // setTimeout(function () {
    //   window.verified = true;
    // }, 200);
  }

  return user ? (
    <div className="Payments">
      <Alert />
      <div className="container mx-auto mt-4 px-4 container-1 pt-20 pb-12">
        <div className="flex flex-wrap ">
          <div className="image-container pr-4 pl-4 ">
            <img
              alt=""
              src={stripeImage}
              className="img-responsive max-w-full h-auto"
            />
          </div>
          <section className="py-8 px-4 mb-8 bg-gray-200 rounded pr-4 pl-4 text-container">
            <h3 className="h1 mt-2">Make a Payment</h3>
            <div>
              <div id="payment-form">
                <p className="total">
                  Total Purchase: ${getCartTotal(cart).toFixed(3)}
                </p>
                {cart?.length ? (
                  <FlutterWaveButton {...fwConfig} />
                ) : (
                  <button type="button">No item in cart</button>
                )}
                <div
                  className={
                    transaction_status === "failed"
                      ? "result-message"
                      : "result-message hidden"
                  }
                >
                  Uh-oh. A failed transaction has occurred. Please try again.
                </div>
                <div
                  className={
                    transaction_status === "success"
                      ? "result-message"
                      : "result-message hidden"
                  }
                >
                  Payment completed successfully.
                  <br />
                  <Link to="/profile/orders">Check your orders here</Link>
                </div>
                <div
                  className={
                    transaction_status === "pending"
                      ? "result-message"
                      : "result-message hidden"
                  }
                >
                  Verifying your payment...
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/account/login" replace state={{ from: location }} />
  );
}

export { Payments };
