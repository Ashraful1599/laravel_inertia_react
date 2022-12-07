import React, {useRef} from 'react'
import FrontendLayout from '@/Layouts/Frontend/FrontendLayout'
import { usePage,Link,useForm } from '@inertiajs/inertia-react';
import moment from 'moment';
import { Inertia } from '@inertiajs/inertia';
//import Moment from 'react-moment';


export default function OrderComplete() {

	const {auth, flash} = usePage().props;
    var orderData = {};
    if(flash.data){
        orderData = flash.data[0];
         var prods = flash.data[1];
    }

    if(flash.data == null){
    //    console.log('here');
        Inertia.get('/cart');
    }

console.log(prods);
var datetime = "";
if(orderData.created_at){
    var date = new Date(orderData.created_at).toISOString();
    var datetime = moment(date).format("DD/MM/YYYY");
}


  return (
    <FrontendLayout>
               {/* <Moment format="YYYY/MM/DD">
                1976-04-19T12:59-0500
            </Moment> */}
                <main className="main main-test">
            <div className="container checkout-container">
            <ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
                <li >
                    <Link href={route('cart.list')}>Shopping Cart</Link>
                </li>
                <li >
                    <Link href={route('checkout.index')}>Checkout</Link>
                </li>
                <li className="active">
                    <Link href={route('order.index')}>Order Complete</Link>
                </li>
            </ul>

<div className='row'>
<div className="order-summary">
                            <h3>{flash.success}</h3>

                            <table className="table table-mini-cart order_details1">
                                <thead>
                                    <tr>
                                        <th>Order number</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Payment method</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderData.length != 0?
                                                <tr>
                                                <td className=""> {orderData.id}  </td>
                                                <td className=""> 
                                                { datetime } 
                                                 </td>
                                                <td className="">${orderData.total_price}  </td>
                                                <td className=""> {

                                                orderData.payment?
                                                orderData.payment.payment_method == 'stripe'?"Stripe": 
                                                orderData.payment.payment_method == 'paypal'? "Paypal": 
                                                orderData.payment.payment_method == 'cash_on_delivery'? "Cash on delivery": ""
                                                
                                                : ""
                                            
                                            }  </td>
                                            </tr>: 
                                            ""
                    
                                    }
                                </tbody>
                            </table>
                        </div> 
</div>

            <div className='row'>



                 <div className="order-summary">
                            <h3>Order Details</h3>
{
     flash.data?

                            <table className="table table-mini-cart">
                                <thead>
                                    <tr>
                                        <th colSpan="2">Product</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                  prods.map((item, index)=>{
                                            return(
                                                <tr key={index}>
                                                <td className="product-col">
                                                    <h3 className="product-title">
                                                       <span className='checkout_product_name'> {item.product_name}</span> ×
                                                        <span className="product-qty">{item.qty}</span>
                                                    </h3>
                                                    {
													item.attribute != 'null'? JSON.parse(item.attribute).map((attr, index)=>{
															return(
																<div className='cart_attr' key={index}>{attr.attr_name}: {attr.term_name}</div>
															)
														}): ""
													}
                                                </td>
        
                                                <td className="price-col">
                                                    <span>{"$"+(item.price*item.qty).toFixed(2)}</span>
                                                </td>
                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                <tfoot>
                                    {/* <tr className="cart-subtotal">
                                        <td>
                                            <h4>Subtotal</h4>
                                        </td>

                                        <td className="price-col">
                                            <span>${subtotal}</span>
                                        </td>
                                    </tr> */}

                                    <tr className="order-totalr">
                                        <td>
                                            <h4>Subtotal</h4>
                                        </td>
                                        <td>
                                            <b className="total-price"><span>${orderData.subtotal}</span></b>
                                        </td>
                                    </tr>                                    
                                    <tr className="order-totalr">
                                        <td>
                                            <h4>Tax</h4>
                                        </td>
                                        <td>
                                            <b className="total-price"><span>${orderData.tax}</span></b>
                                        </td>
                                    </tr>                                   
                                     <tr className="order-total">
                                        <td>
                                            <h4>Total</h4>
                                        </td>
                                        <td>
                                            <b className="total-price"><span>${orderData.total_price}</span></b>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>

: ""

}                    
                        </div>


            </div>

            </div>

        </main>
    </FrontendLayout>
  )
}
