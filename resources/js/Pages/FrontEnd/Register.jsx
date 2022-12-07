import React, {useRef} from 'react'
import FrontendLayout from '@/Layouts/Frontend/FrontendLayout'
import { usePage,Link,useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Register() {


    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        lname: '',
        email: '',
        password: '',
      //  password_confirmation: '',
      //  termsCondition: '',
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

        post(route('user.register.store'));
    };


console.log(data)


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
									<h2 className="title">Register</h2>
								</div>

								<form onSubmit={submit}>
									<label htmlFor="firstName">
										First name
										<span className="required">*</span>
									</label>
									<input onChange={onHandleChange} name="name" type="text" className="form-input form-wide" id="firstName" required />	
                                    {errors && <div className='fielderror'>{errors.name}</div>}

                                    <label htmlFor="lastName">
										Last name
										<span className="required">*</span>
									</label>
									<input onChange={onHandleChange} name="lname" type="text" className="form-input form-wide" id="lastName" required />	
                                    {errors && <div className='fielderror'>{errors.lname}</div>}

                                    <label htmlFor="register-email">
										Email address
										<span className="required">*</span>
									</label>
									<input onChange={onHandleChange} name="email" type="email" className="form-input form-wide" id="register-email" required />
         {errors && <div className='fielderror'>{errors.email}</div>}

									<label htmlFor="register-password">
										Password
										<span className="required">*</span>
									</label>
									<input onChange={onHandleChange} name="password" type="password" className="form-input form-wide" id="register-password"
										required />
                                                 {errors && <div className='fielderror'>{errors.password}</div>}

									<div className="form-footer mb-2">
										<button disabled={processing} type="submit" className="btn btn-dark btn-md w-100 mr-0">
											Register
										</button>

									</div>
                                    <p className='register_now'>Already have an account? <Link href={route('user.login')}>Login Now</Link></p>
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
