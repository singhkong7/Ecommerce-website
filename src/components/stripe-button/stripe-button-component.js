import React from "react";
import StripeCheckout from "react-stripe-checkout";
const StripeCheckoutButton=({price})=>
{
    const priceForStripe=price*100;
    const publishableKey="pk_test_51Iz86lSD09fJaCFQXIaxAgcQU1K98RCvnK8PFjoJkMiKQtieq4Gce22nexCYbSUf1ncbpVJb6NKoywNWmrBoIXIh00UEPO9dsg";
    const onToken=token=>{
        console.log(token);
        alert("Payment Successful");
    }
    return(
        <StripeCheckout 
            label="Pay Here"
            name="Payment Zone"
            shippingAddress
            billingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total price is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Here"
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}
export default StripeCheckoutButton;