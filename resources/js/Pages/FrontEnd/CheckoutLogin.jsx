import React, {useRef} from 'react'
import FrontendLayout from '@/Layouts/Frontend/FrontendLayout'
import { usePage,Link,useForm } from '@inertiajs/inertia-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function CheckoutLogin() {


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


console.log(data)

  return (
    <div className="login-form-container">
    <h4>Returning customer?
      &nbsp;<button data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" className="btn btn-link btn-toggle">Login</button>
    </h4>

    <div id="collapseOne" className="collapse">
        <div className="login-section feature-box">
            <div className="feature-box-content">
                <form onSubmit={submit} id="login-form">
                    <p>
                        If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing & Shipping section.
                    </p>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="mb-0 pb-1">Username or email <span
                                        className="required">*</span></label>
                                <input onChange={onHandleChange} name="email" type="email" className="form-control" required />
                                {errors && <div className='fielderror'>{errors.email}</div>}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="mb-0 pb-1">Password <span
                                        className="required">*</span></label>
                                <input onChange={onHandleChange} name="password" type="password" className="form-control" required />
                                {errors && <div className='fielderror'>{errors.password}</div>}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn">LOGIN</button>

                    <div className="form-footer mb-1">
                        <div className="custom-control custom-checkbox mb-0 mt-0">
                            <input onChange={onHandleChange} name="remember" type="checkbox" className="custom-control-input" id="lost-password" />
                            <label className="custom-control-label mb-0" htmlFor="lost-password">Remember
                                me</label>
                        </div>

                        <Link href={route('password.request')} className="forget-password">Lost your password?</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}
