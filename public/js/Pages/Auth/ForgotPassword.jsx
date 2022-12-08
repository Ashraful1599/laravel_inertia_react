import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm, Link } from '@inertiajs/inertia-react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });



    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };
    useEffect(()=>{

        document.querySelector("body").classList.add("bg-primary");

    }, [])

    useEffect(()=>{
        toast.success(status, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

    },[status])


    return (
        <GuestLayout>

<ToastContainer />


<div id="layoutAuthentication">
<div id="layoutAuthentication_content">
    <main>
        <div className="container-xl px-4">
            <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-6 col-md-8 col-sm-11">

                    <div className="card my-5">
                        <div className="card-body p-5 text-center">
                            <div className="h3 fw-light">Forgot Password</div>
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

     
   
         
                                <div className="d-flex align-items-center justify-content-between mb-0">
                                    <button className="btn btn-primary" type='submit' disabled={processing}> Email Password Reset Link</button>
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









            {/* <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-500 leading-normal">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    type="text"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" processing={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form> */}
        </GuestLayout>
    );
}
