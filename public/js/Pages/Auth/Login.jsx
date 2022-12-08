import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Login({ status, canResetPassword }) {
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

        post(route('login'));
    };

    useEffect(()=>{

        document.querySelector("body").classList.add("bg-primary");

    }, [])


    useEffect(() => {
        return () => {
            document.querySelector("body").classList.remove("bg-primary");
        }
    }, [])


    return (
        <GuestLayout>






            <div id="layoutAuthentication">
<div id="layoutAuthentication_content">
    <main>
        <div className="container-xl px-4">
            <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-11">

                    <div className="card my-5">
                        <div className="card-body p-5 text-center">
                            <div className="h3 fw-light mb-3">Sign In</div>
          
                            <a className="btn btn-icon btn-facebook mx-1" href="#!"><i className="fab fa-facebook-f fa-fw fa-sm"></i></a>
                            <a className="btn btn-icon btn-github mx-1" href="#!"><i className="fab fa-github fa-fw fa-sm"></i></a>
                            <a className="btn btn-icon btn-google mx-1" href="#!"><i className="fab fa-google fa-fw fa-sm"></i></a>
                            <a className="btn btn-icon btn-twitter mx-1" href="#!"><i className="fab fa-twitter fa-fw fa-sm text-white"></i></a>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body p-5">
      
                        <form onSubmit={submit}>
       
                                <div className="mb-3">
                                    <label className="text-gray-600 small" htmlFor="emailExample">Email address</label>
                                    <input className="form-control form-control-solid" type="text"                      name="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={onHandleChange} />
                                   <div className="invalid-feedback d-block">
                                        {errors.email}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="text-gray-600 small" htmlFor="passwordExample">Password</label>
                                    <input className="form-control form-control-solid"                         type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={onHandleChange} />
                             
                                    <div className="invalid-feedback d-block">
                                        {errors.password}
                                    </div>
                                </div>
     
                                <div className="mb-3"><Link as='a' className="small" href={route('password.request')}>Forgot your password?</Link></div>
         
                                <div className="d-flex align-items-center justify-content-between mb-0">
                                    <div className="form-check">
                                        <input className="form-check-input" id="checkRememberPassword" type="checkbox" name="remember" value={data.remember} onChange={onHandleChange} />
                                        <label className="form-check-label" htmlFor="checkRememberPassword">Remember password</label>
                                    </div>
                                    <button className="btn btn-primary" type='submit' disabled={processing}>Login</button>
                                </div>
                            </form>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body px-5 py-4">
                            <div className="small text-center">
                                New user?
                                <Link href={route('register')}> Create an account!</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
<div id="layoutAuthentication_footer">
    <footer className="footer-admin mt-auto footer-dark">
        <div className="container-xl px-4">
            <div className="row">
                <div className="col-md-6 small">Copyright &copy; Your Website 2021</div>
                <div className="col-md-6 text-md-end small">
                    <a href="#!">Privacy Policy</a>
                    &middot;
                    <a href="#!">Terms &amp; Conditions</a>
                </div>
            </div>
        </div>
    </footer>
</div>
</div>

            

            {/* <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="email" value="Email" />

                    <TextInput
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password" value="Password" />

                    <TextInput
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" processing={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form> */}
        </GuestLayout>
    );
}
