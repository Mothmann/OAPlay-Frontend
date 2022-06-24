import React, { useState } from 'react';
import Stripe from '../components/Stripe';
import "./css/payment.css";

function Payment() {
    
    var [amount, setAmount] = useState(0); 
    var [showItem, setShowItem] = useState(false);

    return (
        <div className='payment'>
            <h1>Buy coins</h1><br />
            {showItem ? (
                    <Stripe amount={amount} /> 
            ) : ( 
                <> 
                    <h3>choose the amount of coins you want to buy</h3>
                    <h2>1$ = 10 coins</h2> 
                    <input type="text" value={amount} onChange={(e) => {setAmount(e.target.value)}} name="value" id="input-pay" />
                    <button id='pay' onClick={() => {
                        if (amount <= 0 ) {
                            alert("please enter an amount");
                        }
                        else {
                            setShowItem(true)
                        }   
                    }}>Buy coins</button>
                </>
            )}
        </div>
    );
}
export default Payment;