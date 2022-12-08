import React, {useRef} from 'react'
import FrontendLayout from '@/Layouts/Frontend/FrontendLayout'
import { usePage,Link,useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Login() {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login.check'));
    };



  return (
    <FrontendLayout>
        <main className="main">
			<div className="page-header">
				<div className="container d-flex flex-column align-items-center">
					<nav aria-label="breadcrumb" className="breadcrumb-nav">
						<div className="container">
							<ol className="breadcrumb">
								<li className="breadcrumb-item"><a href="demo4.html">Home</a></li>
								<li className="breadcrumb-item"><a href="category.html">Shop</a></li>
								<li className="breadcrumb-item active" aria-current="page">
									My Account
								</li>
							</ol>
						</div>
					</nav>

					<h1>My Account</h1>
				</div>
			</div>

			<div className="container login-container">
				<div className="row">
					<div className="col-lg-10 mx-auto">
						<div className="row">
							<div className="offset-md-3 col-md-6">
								<div className="heading mb-1">
									<h2 className="title">Login</h2>
								</div>

								<form onSubmit={submit}>
									<label htmlFor="login-email">
										Username or email address
										<span className="required">*</span>
									</label>
									<input onChange={onHandleChange} name="email" type="email" className="form-input form-wide" id="login-email" required />
                                    {errors && <div className='fielderror'>{errors.email}</div>}

									<label htmlFor="login-password">
										Password
										<span className="required">*</span>
									</label>
									<input onChange={onHandleChange} name="password" type="password" className="form-input form-wide" id="login-password" required />
 {errors && <div className='fielderror'>{errors.password}</div>}

									<div className="form-footer">
										<div className="custom-control custom-checkbox mb-0">
											<input  onChange={onHandleChange} name="remember" type="checkbox" className="custom-control-input" id="lost-password" />
											<label className="custom-control-label mb-0" htmlFor="lost-password">Remember
												me</label>
										</div>

										<Link href={route('password.request')}
											className="forget-password text-dark form-footer-right">Forgot
											Password?</Link>
									</div>
									<button type="submit" className="btn btn-dark btn-md w-100">
										LOGIN
									</button>
                                   <p className='register_now'>New customer? <Link href={route('user.register')}>Register Now</Link></p>
								</form>
     
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>

    </FrontendLayout>
  )
}
