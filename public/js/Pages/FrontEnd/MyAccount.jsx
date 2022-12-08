import React, {useRef} from 'react'
import FrontendLayout from '@/Layouts/Frontend/FrontendLayout'
import { usePage,Link,useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Country, State, City }  from 'country-state-city';
import Select from 'react-select';

//console.log(Country.getAllCountries())
//console.log(State.getAllStates())

export default function MyAccount({userDetails,orderDetails}) {

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
       // confirm_password: '',
     //   display_name: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('user.account.update'));
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


  return (
    <FrontendLayout>
        		<main className="main">
			<div className="page-header">
				<div className="container d-flex flex-column align-items-center">
					<nav aria-label="breadcrumb" className="breadcrumb-nav">
						<div className="container">
							<ol className="breadcrumb">
								<li className="breadcrumb-item"><a href="demo4.html">Home</a></li>
								<li className="breadcrumb-item"><a href="/shop">Shop</a></li>
								<li className="breadcrumb-item active" aria-current="page">
									My Account
								</li>
							</ol>
						</div>
					</nav>

					<h1>My Account</h1>
				</div>
			</div>

			<div className="container account-container custom-account-container">
				<div className="row">
					<div className="sidebar widget widget-dashboard mb-lg-0 mb-3 col-lg-3 order-0">
						<h2 className="text-uppercase">My Account</h2>
						<ul className="nav nav-tabs list flex-column mb-0" role="tablist">
							<li className="nav-item">
								<a className="nav-link active" id="dashboard-tab" data-toggle="tab" href="#dashboard"
									role="tab" aria-controls="dashboard" aria-selected="true">Dashboard</a>
							</li>

							<li className="nav-item">
								<a className="nav-link" id="order-tab" data-toggle="tab" href="#order" role="tab"
									aria-controls="order" aria-selected="true">Orders</a>
							</li>

							<li className="nav-item">
								<a className="nav-link" id="download-tab" data-toggle="tab" href="#download" role="tab"
									aria-controls="download" aria-selected="false">Downloads</a>
							</li>

							<li className="nav-item">
								<a className="nav-link" id="edit-tab" data-toggle="tab" href="#edit" role="tab"
									aria-controls="edit" aria-selected="false">Account
									details</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" id="address-tab" data-toggle="tab" href="#address" role="tab"
									aria-controls="address" aria-selected="false">Addresses</a>
							</li>


							<li className="nav-item">
								<a className="nav-link" id="shop-address-tab" data-toggle="tab" href="#shipping" role="tab"
									aria-controls="edit" aria-selected="false">Shipping Address</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Wishlist</a>
							</li>
							<li className="nav-item">
								<Link className="nav-link" href={route('user.logout')}>Logout</Link>
							</li>
						</ul>
					</div>
					<div className="col-lg-9 order-lg-last order-1 tab-content">
						<div className="tab-pane fade show active" id="dashboard" role="tabpanel">
							<div className="dashboard-content">
								<p>
									Hello <strong className="text-dark">{auth.user.name}</strong> (not 
									 <strong className="text-dark">{' '+auth.user.name }</strong>?
									<Link href={route('user.logout')} className="btn btn-link "> Log out</Link>)
								</p>

								<p>
									From your account dashboard you can view your
									<a className="btn btn-link link-to-tab" href="#order">recent orders</a>,
									manage your
									<a className="btn btn-link link-to-tab" href="#address">shipping and billing
										addresses</a>, and
									<a className="btn btn-link link-to-tab" href="#edit">edit your password and account
										details.</a>
								</p>

								<div className="mb-4"></div>

								<div className="row row-lg">
									<div className="col-6 col-md-4">
										<div className="feature-box text-center pb-4">
											<a href="#order" className="link-to-tab"><i className="sicon-social-dropbox"></i></a>
											<div className="feature-box-content">
												<h3>ORDERS</h3>
											</div>
										</div>
									</div> 

									<div className="col-6 col-md-4">
										<div className="feature-box text-center pb-4">
											<a href="#download" className="link-to-tab"><i
													className="sicon-cloud-download"></i></a>
											<div className=" feature-box-content">
												<h3>DOWNLOADS</h3>
											</div>
										</div>
									</div>

									<div className="col-6 col-md-4">
										<div className="feature-box text-center pb-4">
											<a href="#address" className="link-to-tab"><i
													className="sicon-location-pin"></i></a>
											<div className="feature-box-content">
												<h3>ADDRESSES</h3>
											</div>
										</div>
									</div>

									<div className="col-6 col-md-4">
										<div className="feature-box text-center pb-4">
											<a href="#edit" className="link-to-tab"><i className="icon-user-2"></i></a>
											<div className="feature-box-content p-0">
												<h3>ACCOUNT DETAILS</h3>
											</div>
										</div>
									</div>

									<div className="col-6 col-md-4">
										<div className="feature-box text-center pb-4">
											<a href="#"><i className="sicon-heart"></i></a>
											<div className="feature-box-content">
												<h3>WISHLIST</h3>
											</div>
										</div>
									</div>

									<div className="col-6 col-md-4">
										<div className="feature-box text-center pb-4">
											<Link href={route('user.logout')}><i className="sicon-logout"></i></Link>
											<div className="feature-box-content">
												<h3>LOGOUT</h3>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="tab-pane fade" id="order" role="tabpanel">
							<div className="order-content">
								<h3 className="account-sub-title d-none d-md-block"><i
										className="sicon-social-dropbox align-middle mr-3"></i>Orders</h3>
								<div className="order-table-container text-center">
									<table className="table table-order text-left">
								
										<thead>
											<tr>
												<th className="order-id">ORDER</th>
												<th className="order-date">DATE</th>
												<th className="order-status">STATUS</th>
												<th className="order-price">TOTAL</th>
												<th className="order-action">ACTIONS</th>
											</tr>
										</thead>
										<tbody>
						
											{
												orderDetails? 
												orderDetails.map((item, index)=>{
													return(
														<tr key={index}>
															<td>{item.id}</td>
															<td>{item.id}</td>
															<td>{item.status}</td>
															<td>{item.total_price}</td>
															<td>{'Action'}</td>
														</tr>
													)
												})
												: 
												<tr>
												<td className="text-center p-0" colSpan="5">
													<p className="mb-5 mt-5">
														No Order has been made yet.
													</p>
												</td>
											</tr>
											}
										</tbody>
									</table>
									<hr className="mt-0 mb-3 pb-2" />

									<Link href="/shop" className="btn btn-dark">Go Shop</Link>
								</div>
							</div>
						</div>

						<div className="tab-pane fade" id="download" role="tabpanel">
							<div className="download-content">
								<h3 className="account-sub-title d-none d-md-block"><i
										className="sicon-cloud-download align-middle mr-3"></i>Downloads</h3>
								<div className="download-table-container">
									<p>No downloads available yet.</p> <Link href="/shop"
										className="btn btn-primary text-transform-none mb-2">GO SHOP</Link>
								</div>
							</div>
						</div>

						<div className="tab-pane fade" id="address" role="tabpanel">
							<h3 className="account-sub-title d-none d-md-block mb-1"><i
									className="sicon-location-pin align-middle mr-3"></i>Addresses</h3>
							<div className="addresses-content">
								<p className="mb-4">
									The following addresses will be used on the checkout page by
									default.
								</p>

								<div className="row">
									<div className="address col-md-6">
										<div className="heading d-flex">
											<h4 className="text-dark mb-0">Billing address</h4>
										</div>

										<div className="address-box">
											You have not set up this type of address yet.
										</div>

										<a href="#billing" className="btn btn-default address-action link-to-tab">Add
											Address</a>
									</div>

									<div className="address col-md-6 mt-5 mt-md-0">
										<div className="heading d-flex">
											<h4 className="text-dark mb-0">
												Shipping address
											</h4>
										</div>

										<div className="address-box">
											You have not set up this type of address yet.
										</div>

										<a href="#shipping" className="btn btn-default address-action link-to-tab">Add
											Address</a>
									</div>
								</div>
							</div>
						</div>

						<div className="tab-pane fade" id="edit" role="tabpanel">
							<h3 className="account-sub-title d-none d-md-block mt-0 pt-1 ml-1"><i
									className="icon-user-2 align-middle mr-3 pr-1"></i>Account Details</h3>
							<div className="account-content">
								<form onSubmit={submit}>
									<div className="row">
										<div className="col-md-6">
											<div className="form-group">
												<label htmlFor="acc-name">First name <span className="required">*</span></label>
												<input value={auth.user.name} onChange={onHandleChange} name='name' type="text" className="form-control" placeholder="Editor"
													id="acc-name"  required />
											</div>
										</div>

										<div className="col-md-6">
											<div className="form-group">
												<label htmlFor="acc-lastname">Last name <span
														className="required">*</span></label>
												<input value={auth.user.lname} onChange={onHandleChange} name='lname' type="text" className="form-control" id="acc-lastname"
													 required />
											</div>
										</div>
									</div>

									<div className="form-group mb-2">
										<label htmlFor="acc-text">Display name <span className="required">*</span></label>
										<input onChange={onHandleChange} value={auth.user.name +" "+ auth.user.lname} type="text" className="form-control" id="acc-text" name="display_name"
											placeholder="Editor" required />
										<p>This will be how your name will be displayed in the account section and
											in
											reviews</p>
									</div>


									<div className="form-group mb-4">
										<label htmlFor="acc-email">Email address <span className="required">*</span></label>
										<input readOnly value={auth.user.email} onChange={onHandleChange} name='email' type="email" className="form-control" id="acc-email" 
											placeholder="editor@gmail.com" required />
									</div>

									<div className="change-password">
										<h3 className="text-uppercase mb-2">Password Change</h3>

										<div className="form-group">
											<label htmlFor="acc-password">Current Password (leave blank to leave
												unchanged)</label>
											<input onChange={onHandleChange} name='password' type="password" className="form-control" id="acc-password"
												 />
												  {errors && <div className='fielderror'>{errors.password}</div>}
										</div>

										<div className="form-group">
											<label htmlFor="acc-password">New Password (leave blank to leave
												unchanged)</label>
											<input onChange={onHandleChange} name='new_password' type="password" className="form-control" id="acc-new-password"
												 />
										</div>

										{/* <div className="form-group">
											<label htmlFor="acc-password">Confirm New Password</label>
											<input onChange={onHandleChange} name='confirm_password' type="password" className="form-control" id="acc-confirm-password"
												 />
										</div> */}
									</div>

									<div className="form-footer mt-3 mb-0">
										<button type="submit" className="btn btn-dark mr-0">
											Save changes
										</button>
									</div>
								</form>
							</div>
						</div>

						<div className="tab-pane fade" id="billing" role="tabpanel">
							<div className="address account-content mt-0 pt-2">
								<h4 className="title">Billing address</h4>

								<form className="mb-2" onSubmit={submit}>
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
										<input onChange={onHandleChange} value={data.phone} name='phone' type="number" className="form-control" required />
									</div>

									<div className="form-group mb-3">
										<label>Email address <span className="required">*</span></label>
										<input onChange={onHandleChange} value={data.email} name='email' type="email" className="form-control" placeholder="editor@gmail.com"
											required />
									</div>

									<div className="form-footer mb-0">
										<div className="form-footer-right">
											<button type="submit" className="btn btn-dark py-4">
												Save Address
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>

						<div className="tab-pane fade" id="shipping" role="tabpanel">
							<div className="address account-content mt-0 pt-2">
								<h4 className="title mb-3">Shipping Address</h4>

								<form className="mb-2" onSubmit={submit}>
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
										<input onChange={onHandleChange} value={data.ship_phone} name='ship_phone' type="text" className="form-control" required />
									</div>

									<div className="form-footer mb-0">
										<div className="form-footer-right">
											<button type="submit" className="btn btn-dark py-4">
												Save Address
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mb-5"></div>
		</main>
    </FrontendLayout>
  )
}
