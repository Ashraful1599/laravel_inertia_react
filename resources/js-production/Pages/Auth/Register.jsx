import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';


export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        lname: '',
        email: '',
        password: '',
        password_confirmation: '',
        termsCondition: '',
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

        post(route('register'));
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
            {/* <Head title="Register" /> */}


 
            <div id="layoutAuthentication">
<div id="layoutAuthentication_content">
    <main>
        <div className="container-xl px-4">
            <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-9">
           
                    <div className="card my-5">
                        <div className="card-body p-5 text-center">
                            <div className="h3 fw-light mb-3">Create an Account</div>
                            <div className="small text-muted mb-2">Sign in using...</div>
              
                            <a className="btn btn-icon btn-facebook mx-1" href="#!"><i className="fab fa-facebook-f fa-fw fa-sm"></i></a>
                            <a className="btn btn-icon btn-github mx-1" href="#!"><i className="fab fa-github fa-fw fa-sm"></i></a>
                            <a className="btn btn-icon btn-google mx-1" href="#!"><i className="fab fa-google fa-fw fa-sm"></i></a>
                            <a className="btn btn-icon btn-twitter mx-1" href="#!"><i className="fab fa-twitter fa-fw fa-sm text-white"></i></a>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body p-5">
                            <div className="text-center small text-muted mb-4">...or enter your information below.</div>
               
                            <form onSubmit={submit}>
             
                                <div className="row gx-3">
                                    <div className="col-md-6">
             
                                        <div className="mb-3">
                                            <label className="text-gray-600 small" htmlFor="name">First name</label>
                                            <input className="form-control form-control-solid" type="text" name="name"
                        value={data.name}
                        onChange={onHandleChange}
                         />
                                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>} 
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                    
                                        <div className="mb-3">
                                            <label className="text-gray-600 small" htmlFor="lname">Last name</label>
                                            <input className="form-control form-control-solid" type="text" name="lname"
                        value={data.lname}
                        onChange={onHandleChange}
                         />
                                   {errors.lname && <div className="invalid-feedback d-block">{errors.lname}</div>} 
                                        </div>
                                    </div>
                                </div>
                
                                <div className="mb-3">
                                    <label className="text-gray-600 small" htmlFor="email">Email address</label>
                                    <input className="form-control form-control-solid" type="text" name="email"
                        value={data.email}
                        onChange={onHandleChange}
                         />
                                     <div className="invalid-feedback d-block">
                                        {errors.email}
                                    </div>
                                </div>
        
                                <div className="row gx-3">
                                    <div className="col-md-6">
  
                                        <div className="mb-3">
                                            <label className="text-gray-600 small" htmlFor="passwordExample">Password</label>
                                            <input className="form-control form-control-solid" type="password" name="password"
                        value={data.password}
                        onChange={onHandleChange}
                         />
                                     <div className="invalid-feedback d-block">
                                        {errors.password}
                                    </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
         
                                        <div className="mb-3">
                                            <label className="text-gray-600 small" htmlFor="confirmPasswordExample">Confirm Password</label>
                                            <input className="form-control form-control-solid" type="password" name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={onHandleChange}
                         />
                                     <div className="invalid-feedback d-block">
                                        {errors.password_confirmation}
                                    </div>
                                        </div>
                                    </div>
                                </div>
            
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="form-check">
                                        <input className="form-check-input" id="checkTerms" type="checkbox" name='termsCondition'   value={data.termsCondition}
                        onChange={onHandleChange} />
                                        <label className="form-check-label" htmlFor="checkTerms">
                                            I accept the
                                            <a href="#!"> terms &amp; conditions</a>
                                            .
                                        </label>
                                        {errors.termsCondition && <div className="invalid-feedback d-block">{errors.termsCondition}</div>} 
                                    </div>
                                    <button className="btn btn-primary" type='submit' disabled={processing}>Create Account</button>
                                </div>
                            </form>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body px-5 py-4">
                            <div className="small text-center">
                                Have an account?
                                <Link href={route('login')}> Sign in!</Link>
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
                    <InputLabel forInput="name" value="Name" />

                    <TextInput
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="email" value="Email" />

                    <TextInput
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
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
                        handleChange={onHandleChange}
                        required
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
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" processing={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form> */}
        </GuestLayout>
    );
}
