import React, { useState } from 'react';
import Stripe from '../components/Stripe';
import "./css/payment.css";

function Payment() {
    const [showItem, setShowItem] = useState(false);
    return (
        <div className='payment'>
            <h1>test pay</h1>
            {showItem ? (
                    <Stripe/> 
            ) : ( 
                <> 
                    <h3>10$ to donate</h3>
                    <button onClick={() => setShowItem(true)}>Donate</button>
                </>
           )}
        </div>
    );
}

export default Payment;