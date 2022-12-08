import React, {useRef} from 'react'
import FrontendLayout from '@/Layouts/Frontend/FrontendLayout'
import { usePage,Link,useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';



export default function Cart({cartItems,subtotal,total}) {
    const { flash } = usePage().props;
	const success = flash.success;
	//console.log(success);

    const {data, setData, post, processing, errors, reset} = useForm({
        rowId: '',
        qty: '',
		type: '',
    })

    const inputRef = useRef([]);
    const qtyChange = (id)=>{
        var qty =inputRef.current[id].value;
        setData({
            rowId: id,
            qty: qty,
			type: 'update'
        });

    }
	const removeCartItem = (rowId)=>{
		setData({
            rowId: rowId,
			type: 'remove'
        });
	}



    useEffect(()=>{
		if(data.rowId != '' && data.type == 'update'){
			post(route('cart.update', data))
		}		
		if(data.rowId != '' && data.type == 'remove'){
			post(route('cart.remove', data))
		}
    },[data])



  return (
    <FrontendLayout>
        <main className="main">
			<div className="container">
			<ul className="checkout-progress-bar d-flex justify-content-center flex-wrap">
				<li className="active">
					<Link href={route('cart.list')}>Shopping Cart</Link>
				</li>
				<li>
					<Link href={route('checkout.index')}>Checkout</Link>
				</li>
				<li className="disabled">
					<Link href={route('order.index')}>Order Complete</Link>
				</li>
			</ul>
			
				<div className="row">
					<div className="col-lg-8">
						<div className="cart-table-container">
							<table className="table table-cart">
								<thead>
									<tr>
										<th className="thumbnail-col"></th>
										<th className="product-col">Product</th>
										<th className="price-col">Price</th>
										<th className="qty-col">Quantity</th>
										<th className="text-right">Subtotal</th>
									</tr>
								</thead>
								<tbody>
                                    {
                                    Object.values(cartItems).length !=0?Object.values(cartItems).map((item, index)=>{
                                       //     console.log(item);
                                            return(
                                                <tr key={index} id={index} className="product-row">
                                                <td>
                                                    <figure className="product-image-container">
                                                        <Link href={route('product.show',item.options.slug)} className="product-image">
                                                            <img src={'/public/uploads/'+item.options.image} alt="product" />
                                                        </Link>
        
                                                        <Link onClick={()=>removeCartItem(item.rowId)} className="btn-remove icon-cancel" title="Remove Product"></Link>
                                                    </figure>
                                                </td>
                                                <td className="product-col">
                                                    <h5 className="product-title">
                                                        <Link href={route('product.show',item.options.slug)}>{item.name}</Link>
                                                    </h5>
													{
														item.options.attr && item.options.attr.map((attr, index)=>{
															return(
																<div className='cart_attr' key={index}>{attr.attr_name}: {attr.term_name}</div>
															)
														})
													}
                                                </td>
                                                <td>{"$"+(item.price).toFixed(2)}</td>
                                                <td>
                                                    <div className="product-single-qty">
                                                        <div className='input-group bootstrap-touchspin bootstrap-touchspin-injected'>
                                                        <span className="input-group-btn input-group-prepend">
                                                            <button onClick={()=>qtyChange(item.rowId)} className="btn btn-outline btn-down-icon bootstrap-touchspin-down" type="button"></button></span>
                                                             <input defaultValue={item.qty} id={item.rowId} ref={(el) => (inputRef.current[item.rowId] = el)} className="horizontal-quantity form-control" type="text" />
                                                        <span className="input-group-btn input-group-append">
                                                            <button onClick={()=>qtyChange(item.rowId)} className="btn btn-outline btn-up-icon bootstrap-touchspin-up" type="button"></button></span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-right"><span className="subtotal-price">{"$"+(item.price*item.qty).toFixed(2)}</span></td>
                                            </tr>
                                            )
    
                                        }):<tr><td colSpan="4" align="center">There is no item in the cart.</td></tr>
                                    }
								</tbody>


								<tfoot>
									<tr>
										<td colSpan="5" className="clearfix">
											<div className="float-left">
												<div className="cart-discount">
													<form action="#">
														<div className="input-group">
															<input type="text" className="form-control form-control-sm"
																placeholder="Coupon Code" required />
															<div className="input-group-append">
																<button className="btn btn-sm" type="submit">Apply
																	Coupon</button>
															</div>
														</div>
													</form>
												</div>
											</div>

											<div className="float-right">
												<button type="submit" className="btn btn-shop btn-update-cart">
													Update Cart
												</button>
											</div>
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>

					<div className="col-lg-4">
						<div className="cart-summary">
							<h3>CART TOTALS</h3>

							<table className="table table-totals">
								<tbody>
									<tr>
										<td>Subtotal</td>
										<td>${subtotal}</td>
									</tr>

									<tr>
										<td colSpan="2" className="text-left">
											<h4>Shipping</h4>

											<div className="form-group form-group-custom-control">
												<div className="custom-control custom-radio">
													<input type="radio" className="custom-control-input" name="radio" />
													<label className="custom-control-label">Local pickup</label>
												</div>
											</div>

											<div className="form-group form-group-custom-control mb-0">
												<div className="custom-control custom-radio mb-0">
													<input type="radio" name="radio" className="custom-control-input" />
													<label className="custom-control-label">Flat rate</label>
												</div>
											</div>

											<form onSubmit={e => e.preventDefault()}>
												<div className="form-group form-group-sm">
													<label>Shipping to <strong>NY.</strong></label>
													<div className="select-custom">
														<select className="form-control form-control-sm">
															<option value="USA">United States (US)</option>
															<option value="Turkey">Turkey</option>
															<option value="China">China</option>
															<option value="Germany">Germany</option>
														</select>
													</div>
												</div>

												<div className="form-group form-group-sm">
													<div className="select-custom">
														<select className="form-control form-control-sm">
															<option value="NY">New York</option>
															<option value="CA">California</option>
															<option value="TX">Texas</option>
														</select>
													</div>
												</div>

												<div className="form-group form-group-sm">
													<input type="text" className="form-control form-control-sm"
														placeholder="Town / City" />
												</div>

												<div className="form-group form-group-sm">
													<input type="text" className="form-control form-control-sm"
														placeholder="ZIP" />
												</div>

												<button type="submit" className="btn btn-shop btn-update-total">
													Update Totals
												</button>
											</form>
										</td>
									</tr>
								</tbody>

								<tfoot>
									<tr>
										<td>Total</td>
										<td>${total}</td>
									</tr>
								</tfoot>
							</table>

							<div className="checkout-methods">
								<Link href={route('checkout.index')} className="btn btn-block btn-dark">Proceed to Checkout
									<i className="fa fa-arrow-right"></i></Link>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mb-6"></div>
		</main>
    </FrontendLayout>
  )
}
