import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/inertia-react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.update'));
    };

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
                            <div className="h3 fw-light mb-3">Reset Password</div>
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
                                
                                
                            <div className="mb-3">
                                    <label className="text-gray-600 small" htmlFor="passwordExample">Confirm Password</label>
                                    <input className="form-control form-control-solid"                         type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="current-password"
                        onChange={onHandleChange} />
                             
                                    <div className="invalid-feedback d-block">
                                        {errors.password_confirmation}
                                    </div>
                                </div>
         
                                <div className="d-flex align-items-center justify-content-between mb-0">
                                    <button className="btn btn-primary" type='submit' disabled={processing}>Reset password</button>
                                </div>
                            </form>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body px-5 py-4">
                            <div className="small text-center">
                                <Link href={route('login')}> Login</Link>
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








            {/* <Head title="Reset Password" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="email" value="Email" />

                    <TextInput
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
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
                        autoComplete="new-password"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password_confirmation" value="Confirm Password" />

                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" processing={processing}>
                        Reset Password
                    </PrimaryButton>
                </div>
            </form> */}
        </GuestLayout>
    );
}
