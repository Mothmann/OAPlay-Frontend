import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import "./css/paymentform.css";
import {getFirestore, increment, updateDoc, doc } from "firebase/firestore";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "black",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "34px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "black" },
			"::placeholder": { color: "black" }
		},
		invalid: {
			iconColor: "black",
			color: "black"
		}
	}
}

export default function PaymentForm(props) {
    const [success, setSuccess ] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    var amount = props.amount * 1000;
    const db = getFirestore();
    const {currentUser} = useContext(UserContext);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

    const coin = () => {
        let usersRef = doc(db, "users", currentUser.uid);
        updateDoc(usersRef, {
            coins: increment(amount/100)
        });
    }
    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:5000/pay", {
                amount: amount,
                id
            })

            if(response.data.success) {
                setSuccess(true);
                coin();
                console.log("success");
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        alert("An error has been occured, please try again later");
        console.log(error.message)
    }
}

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="credit-card">         
                    <CardElement options={CARD_OPTIONS}/>
            </fieldset>
            <button id="pay">Pay</button>
        </form>
        :
       <div>
           <h2>you bought {amount} coins</h2>
       </div> 
        }
            
        </>
    )
}