import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const public_key = "pk_test_51LBlxiIJgwmtmpLuRk3LBt4Bn7awWF0l2KaDWRheu7IvtPO4nuo0HrgBcN5rMFIM1t8zfGJKJSG3VQlyQOrM61Tn00Uu1aMu6M";

const stripeTestPromise = loadStripe(public_key);

function Stripe() {
   
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    );
}

export default Stripe;