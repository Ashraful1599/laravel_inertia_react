import React from 'react'
import CheckoutForm from './CheckoutForm';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import { usePage } from '@inertiajs/inertia-react';


// const script = document.createElement('script');
// script.src = 'https://www.paypal.com/sdk/js?client-id=AeeX7xCalgqVoqlfptNjgh5ZTRYIBKWu9V875yR70pA0sBp0S0XDeNGJVin0kpBR5-19waWM33_jyJmR&enable-funding=venmo&buyer-country=US';
// script.id = 'googleMaps';
// document.body.appendChild(script);



export default function Checkout({userById,userDetails,cartItems,subtotal,tax,total}) {

  const {STRIPE_KEY} = usePage().props;
  const stripePromise = loadStripe(STRIPE_KEY);  
  
  return (
    <Elements stripe={stripePromise} >
        <CheckoutForm userById={userById} userDetails={userDetails} cartItems={cartItems} subtotal={subtotal} tax={tax} total={total} />
    </Elements>
  )
}

