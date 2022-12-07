import React, {useRef} from 'react'
import ReactDOM from 'react-dom'
import FrontendLayout from '@/Layouts/Frontend/FrontendLayout'
import { usePage,Link,useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Country, State, City }  from 'country-state-city';
import Select from 'react-select';
import CheckoutLogin from './CheckoutLogin';
import {Elements,CardElement,useElements, useStripe} from "@stripe/react-stripe-js";


const PayPalButtons = paypal.Buttons.driver("react", { React, ReactDOM });

export default function CheckoutForm({userById,userDetails,cartItems,subtotal,tax,total}) {

     const stripe = useStripe();
     const elements = useElements();

     // This values are the props in the UI
    const amount = total;
    const currency = "USD";
    const style = {"layout":"vertical"};

    const {flash} = usePage().props
    console.log(flash);

    // const options = {
    //     // passing the client secret obtained from the server
    //     clientSecret: '{{CLIENT_SECRET}}',
    //   };
 
    const [checkoutErr, setCheckoutErr] = useState();
    const cktError = {};

	const {auth} = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth.user? auth.user.name : "",
        lname: auth.user? auth.user.lname: "",
        email: auth.user? auth.user.email: "",
        company_name: userDetails? userDetails.company_name: "",
        country: userDetails?userDetails.country: "",
        address1: userDetails?userDetails.address1: "",
        address2: userDetails?userDetails.address2: "",
        city: userDetails?userDetails.city: "",
        state: userDetails?userDetails.state: "",
        postcode: userDetails?userDetails.postcode: "",
        phone: userDetails?userDetails.phone: "",
        ship_first_name: userDetails?userDetails.ship_first_name: "",
        ship_last_name: userDetails?userDetails.ship_last_name: "",
        ship_company_name: userDetails?userDetails.ship_company_name: "",
        ship_country: userDetails?userDetails.ship_country: "",
        ship_address1: userDetails?userDetails.ship_address1: "",
        ship_address2: userDetails?userDetails.ship_address2: "",
        ship_city: userDetails?userDetails.ship_city: "",
        ship_state: userDetails?userDetails.ship_state: "",
        ship_postcode: userDetails?userDetails.ship_postcode: "",
        ship_phone: userDetails?userDetails.ship_phone: "",
        password: '',
        new_password: '',
        shipping: 'Local pickup',
        payment_method: 'stripe',
        create_account: false,
        shipping_different: false,
        status: 'Pending',
        note: '',
    //    token_id: '',
       // confirm_password: '',
     //   display_name: '',
    });


    const checkoutValidation =(pdata,actions)=>{

        if(data.name == "" || data.name == undefined){
            console.log(data.name);
            cktError.name ='The firstname field is required!';
        }       
         if(data.lname == "" || data.lname == undefined){
            cktError.lname ='The lastname field is required!';
        }        
        if(data.email == "" || data.email == undefined){
            cktError.email ='The email field is required!';
        }
     //   console.log(cktError);
        if(Object.values(cktError).length !=0){
            setCheckoutErr(cktError);
            return actions.reject();
        }
    }

    // useEffect(() => {
    //     return () => {
    //         reset('password', 'password_confirmation');
    //     };
    // }, []);

   console.log(checkoutErr);
  // console.log(checkoutErr.length);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = async (e) => {
        e.preventDefault();
        var token_id = "";
        if(data.payment_method == 'stripe'){
            const cardElement = elements.getElement(CardElement);
            const {token} = await stripe.createToken(cardElement);
            var token_id = token.id;
        }

        post(route('order.store',{'token_id':token_id}));
    };

console.log(data);

const getStatebyCountry = State.getAllStates().filter((item)=>{
	return item.countryCode == data.country;
})

var countries = [];
Country.getAllCountries().map((item)=>{
	countries.push({value:  item.isoCode, label: item.name})
})
const countryChangeHandle = (e) =>{
	setData('country', e.value);
}
const defaultCountry = countries.find((item)=>{
	return item.value == data.country;
})
const shipcountryChangeHandle = (e) =>{
	setData('ship_country', e.value);
}
const shipdefaultCountry = countries.find((item)=>{
	return item.value == data.ship_country;
})



var states = [];
if(getStatebyCountry.length != 0){
getStatebyCountry.map((item)=>{
	states.push({value:  item.isoCode, label: item.name})
})
}
const stateChangeHandle = (e) =>{
	setData('state', e.value);
}
const defaultState = states.find((item)=>{
	return item.value == data.state
})

const shipgetStatebyCountry = State.getAllStates().filter((item)=>{
	return item.countryCode == data.ship_country;
})
var shipstates = [];
if(shipgetStatebyCountry.length != 0){
	shipgetStatebyCountry.map((item)=>{
		shipstates.push({value:  item.isoCode, label: item.name})
})
}
const shipstateChangeHandle = (e) =>{
	setData('ship_state', e.value);
}
const shipdefaultState = shipstates.find((item)=>{
	return item.value == data.ship_state
})



console.log(data);



  return (
    <FrontendLayout>
     
                <main className="main main-test">
            <div className="container checkout-container">
            <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
                <li >
                    <Link href={route('cart.list')}>Shopping Cart</Link>
                </li>
                <li className="active">
                    <Link href={route('checkout.index')}>Checkout</Link>
                </li>
                <li className="disabled">
                    <Link href={route('order.index')}>Order Complete</Link>
                </li>
            </ul>


{
auth.user == null?
<CheckoutLogin />
:
" "
}


                <div className="checkout-discount">
                    <h4>Have a coupon? 
                       &nbsp;<button data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseOne" className="btn btn-link btn-toggle"> ENTER YOUR CODE</button>
                    </h4>

                    <div id="collapseTwo" className="collapse">
                        <div className="feature-box">
                            <div className="feature-box-content">
                                <p>If you have a coupon code, please apply it below.</p>

                                <form action="#">
                                    <div className="input-group">
                                        <input type="text" className="form-control form-control-sm w-auto" placeholder="Coupon code" required="" />
                                        <div className="input-group-append">
                                            <button className="btn btn-sm mt-0" type="submit">
                                                Apply Coupon
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-7">
                        <ul className="checkout-steps">
                            <li>
                                <h2 className="step-title">Billing details</h2>
                        <ul className='ckt_erros'>
                        {
                            Object.values(checkoutErr || {}).length !=0?Object.values(checkoutErr || {}).map((item,index)=>{
                                return(
        
                                    <li className='fielderror' key={index}>{item}</li>
                                )
                            }): ""
                        }
                        </ul>
                                <form onSubmit={submit} id="checkout-form">
                                <div className="row">
										<div className="col-md-6">
											<div className="form-group">
												<label>First name <span className="required">*</span></label>
												<input onChange={onHandleChange} value={data.name} name='name' type="text" className="form-control" required />
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group">
												<label>Last name <span className="required">*</span></label>
												<input onChange={onHandleChange} value={data.lname} name='lname' type="text" className="form-control" required />
											</div>
										</div>
									</div>

									<div className="form-group">
										<label>Company </label>
										<input onChange={onHandleChange} value={data.company_name} name='company_name' type="text" className="form-control" />
									</div>

									<div className="select-custom">
										<label>Country / Region <span className="required">*</span></label>

										<Select
										//  closeMenuOnSelect={false}
											//isMulti
											options={countries}
									//     value={value}
											defaultValue={defaultCountry || 'Select a country'}
											name="country"
										//  className="form-select"
											classNamePrefix="select"
											onChange={countryChangeHandle}
											/>

										{/* <select onChange={onHandleChange} name='country'  className="form-control">
											{
												Country.getAllCountries().map((item, index)=>{
													return (
														<option key={index} value={item.isoCode}>{item.name}</option>
													)
												})
											}
										</select> */}
									</div>
									
									<div className="form-group">
										<label>Street address <span className="required">*</span></label>
										<input onChange={onHandleChange} value={data.address1} name='address1' type="text" className="form-control"
											placeholder="House number and street name" required />
										<input onChange={onHandleChange} value={data.address2} name='address2' type="text" className="form-control"
											placeholder="Apartment, suite, unit, etc. (optional)"  />
									</div>

									<div className="form-group">
										<label>Town / City <span className="required">*</span></label>
										<input onChange={onHandleChange} value={data.city} name='city' type="text" className="form-control" required />
									</div>

									<div className="form-group">
										<label>State / Country <span className="required">*</span></label>
										<Select
										//  closeMenuOnSelect={false}
											//isMulti
											options={states}
											defaultValue = {defaultState}
									//     value={value}
											name="country"
										//  className="form-select"
											classNamePrefix="select"
											onChange={stateChangeHandle}
											/>

									</div>

									<div className="form-group">
										<label>Postcode / ZIP <span className="required">*</span></label>
										<input onChange={onHandleChange} value={data.postcode} name='postcode' type="text" className="form-control" required />
									</div>

									<div className="form-group mb-3">
										<label>Phone <span className="required">*</span></label>
										<input onChange={onHandleChange} value={data.phone} name='phone' type="tel" className="form-control" required />
									</div>

									<div className="form-group mb-3">
										<label>Email address <span className="required">*</span></label>
										<input onChange={onHandleChange} value={data.email} name='email' type="email" className="form-control" placeholder="editor@gmail.com"
											required />
                                        {errors && errors.email?<div className='fielderror'>{errors.email}</div>: ""}
									</div>

		
{
    auth.user == null?
    <>
    <div className="form-group mb-1">
    <div className="custom-control custom-checkbox">
        <input onChange={onHandleChange} name="create_account" type="checkbox" className="custom-control-input" id="create-account" required />
        <label className="custom-control-label" data-toggle="collapse" data-target="#collapseThree" aria-controls="collapseThree" htmlFor="create-account">Create an
            account?</label>
    </div>
</div>
{
    data.create_account?
<div id="collapseThree" className="collapser">
<div className="form-group">
    <label>Create account password
        <abbr className="required" title="required">*</abbr></label>
    <input onChange={onHandleChange} name="password" type="password" placeholder="Password" className="form-control" required />
</div>
</div>
    : ""
}

</>
    : ""
}



                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox mt-0">
                                            <input onChange={onHandleChange} name="shipping_different" type="checkbox" className="custom-control-input" id="different-shipping" />
                                            <label className="custom-control-label" data-toggle="collapse" data-target="#collapseFour" aria-controls="collapseFour" htmlFor="different-shipping">Ship to a
                                                different
                                                address?</label>


                                        </div>
                                    </div>
{
    data.shipping_different?              
    
    <div id="collapseFour" className="collapser">
    <div className="shipping-info">
    <div className="row">
    <div className="col-md-6">
        <div className="form-group">
            <label>First name <span className="required">*</span></label>
            <input onChange={onHandleChange} value={data.ship_first_name} name='ship_first_name' type="text" className="form-control" required />
        </div>
    </div>

    <div className="col-md-6">
        <div className="form-group">
            <label>Last name <span className="required">*</span></label>
            <input onChange={onHandleChange} value={data.ship_last_name} name='ship_last_name' type="text" className="form-control" required />
        </div>
    </div>
</div>

<div className="form-group">
    <label>Company </label>
    <input onChange={onHandleChange} value={data.ship_company_name} name='ship_company_name' type="text" className="form-control" />
</div>

<div className="select-custom">
    <label>Country / Region <span className="required">*</span></label>
    <Select
    //  closeMenuOnSelect={false}
        //isMulti
        options={countries}
//     value={value}
        defaultValue={shipdefaultCountry || 'Select a country'}
        name="ship_country"
    //  className="form-select"
        classNamePrefix="select"
        onChange={shipcountryChangeHandle}
        />
</div>

<div className="form-group">
    <label>Street address <span className="required">*</span></label>
    <input onChange={onHandleChange} value={data.ship_address1} name='ship_address1' type="text" className="form-control"
        placeholder="House number and street name" required />
    <input onChange={onHandleChange} value={data.ship_address2} name='ship_address2' type="text" className="form-control"
        placeholder="Apartment, suite, unit, etc. (optional)"  />
</div>

<div className="form-group">
    <label>Town / City <span className="required">*</span></label>
    <input onChange={onHandleChange} value={data.ship_city} name='ship_city' type="text" className="form-control" required />
</div>

<div className="form-group">
    <label>State / Country <span className="required">*</span></label>
    <Select
    //  closeMenuOnSelect={false}
        //isMulti
        options={shipstates}
        defaultValue = {shipdefaultState}
//     value={value}
        name="ship_state"
    //  className="form-select"
        classNamePrefix="select"
        onChange={shipstateChangeHandle}
        />
</div>

<div className="form-group">
    <label>Postcode / ZIP <span className="required">*</span></label>
    <input onChange={onHandleChange} value={data.ship_postcode} name='ship_postcode' type="text" className="form-control" required />
</div>							
<div className="form-group">
    <label>Phone <span className="required">*</span></label>
    <input onChange={onHandleChange} value={data.ship_phone} name='ship_phone' type="tel"  className="form-control" required />
</div>
    </div>
</div>: ""
}
                      

                                    <div className="form-group">
                                        <label className="order-comments">Order notes (optional)</label>
                                        <textarea onChange={onHandleChange} name="note" className="form-control" placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>


                    <div className="col-lg-5">
                        <div className="order-summary">
                            <h3>YOUR ORDER</h3>

                            <table className="table table-mini-cart">
                                <thead>
                                    <tr>
                                        <th colSpan="2">Product</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    Object.values(cartItems).length !=0?Object.values(cartItems).map((item, index)=>{
                                            return(
                                                <tr key={index}>
                                                <td className="product-col">
                                                    <h3 className="product-title">
                                                       <span className='checkout_product_name'> {item.name}</span> ×
                                                        <span className="product-qty">{item.qty}</span>
                                                    </h3>
                                                    {
														item.options.attr && item.options.attr.map((attr, index)=>{
															return(
																<div className='cart_attr' key={index}>{attr.attr_name}: {attr.term_name}</div>
															)
														})
													}
                                                </td>
        
                                                <td className="price-col">
                                                    <span>{"$"+(item.price*item.qty).toFixed(2)}</span>
                                                </td>
                                            </tr>
                                            )
                                        }): ""
                                    }
                                </tbody>
                                <tfoot>
                                    <tr className="cart-subtotal">
                                        <td>
                                            <h4>Subtotal</h4>
                                        </td>

                                        <td className="price-col">
                                            <span>${subtotal}</span>
                                        </td>
                                    </tr>                                    
                                    <tr className="cart-subtotal">
                                        <td>
                                            <h4>Tax</h4>
                                        </td>

                                        <td className="price-col">
                                            <span>${tax}</span>
                                        </td>
                                    </tr>
                                    <tr className="order-shipping">
                                        <td className="text-left" colSpan="2">
                                            <h4 className="m-b-sm">Shipping</h4>

                                            <div className="form-group form-group-custom-control">
                                                <div className="custom-control custom-radio d-flex">
                                                    <input onChange={onHandleChange} value="local_pickup" type="radio" className="custom-control-input" name="shipping" required defaultChecked  />
                                                    <label className="custom-control-label">Local Pickup</label>
                                                </div>
                                            </div>


                                            <div className="form-group form-group-custom-control mb-0">
                                                <div className="custom-control custom-radio d-flex mb-0">
                                                    <input onChange={onHandleChange} value="sundorbon" type="radio" name="shipping" className="custom-control-input" />
                                                    <label className="custom-control-label">Sundorbon</label>
                                                </div>
                                            </div>
        
                                        </td>

                                    </tr>

                                    <tr className="order-total">
                                        <td>
                                            <h4>Total</h4>
                                        </td>
                                        <td>
                                            <b className="total-price"><span>${total}</span></b>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

                            <div className="payment-methods">
                                <h4 className="">Payment methods</h4>
                              <div className="info-box with-icon p-0 payment_method_box">
                                    <input onChange={onHandleChange} value="stripe" name="payment_method" type="radio" id='card' required defaultChecked  />
                                    <label  htmlFor="card">Credit Card</label>
                               </div>                               
                               {
                                    data.payment_method == 'stripe'?<div className='credit_card_wrap'> <CardElement options={{ hidePostalCode: true }} /></div> : ""
                                }

                               <div className="info-box with-icon p-0 payment_method_box">

                                    <input onChange={onHandleChange} value="cash_on_delivery" name="payment_method" type="radio" id='cashOn' required   />
                                    <label  htmlFor="cashOn">Cash on delivery</label>
                               </div>    
                               {
                                  data.payment_method == 'cash_on_delivery'? <div className="info-box with-icon p-0 payment_method_box"><p>Pay when you receive the product on your door.</p></div> : ""
                                                                        
                                }                           
                               
                               <div className="info-box with-icon p-0 payment_method_box">
                                    <input onChange={onHandleChange} value="paypal" name="payment_method" type="radio" id='paypal' required   />
                                    <label  htmlFor="paypal">Paypal</label>
                               </div>    
                                                 
                                {/* <div className="info-box with-icon p-0 payment_method_box">
                                    <p>
                                        Sorry, it seems that there are no available payment methods for your state. Please contact us if you require assistance or wish to make alternate arrangements.
                                    </p> 
                                </div>  */}
 
   </div>




                {
                    data.payment_method == 'cash_on_delivery' || data.payment_method == 'stripe'?
                    <button disabled={processing} type="submit" className="btn btn-dark btn-place-order" form="checkout-form">
                       Place order {<img style={processing? {'display':'block'}: {'display':'none'}} className='btn_loader' src="/loader_white.svg" alt="" />}
                   </button>:data.payment_method == 'paypal'? 

                    <PayPalButtons
                         style={style}
                         onClick={ (pdata,actions)=>checkoutValidation(pdata,actions) }
                         disabled={false}
                        // forceReRender={[amount, currency, style]}
                       //  fundingSource={paypal.FUNDING.VENMO}
                         createOrder={(data, actions) => {
         
                             
                             return actions.order.create({
                                     purchase_units: [
                                         {
                                             amount: {
                                                 currency_code: currency,
                                                 value: amount,
                                             },
                                         },
                                     ],
                                 })
                                 .then((orderId) => {
                                     // Your code here after create the order
                                     return orderId;
                                 });
                         }}
                         onApprove={function (pdata, actions) {
                             return actions.order.capture().then(function (paypalOrder) {
                             //    console.log(paypalOrder);
                              //   console.log(paypalOrder.id);
                                 var token_id = paypalOrder.id;
                                 post(route('order.store',{'token_id':token_id}));
                             });
                         }}
                     />
                   
                   : ""
                }

                        </div>
                    </div>

                </div>

            </div>

        </main>




    


    </FrontendLayout>
  )
}
