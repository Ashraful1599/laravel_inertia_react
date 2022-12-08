import React, {useState, useEffect} from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { Link, useForm, usePage } from '@inertiajs/inertia-react'
import Profile from "../../../assets/img/illustrations/profiles/profile-1.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Inertia } from '@inertiajs/inertia';
import AccountProfileImg from '@/Components/AccountProfileImg';
import Header from '@/Components/Admin/Header';


export default function AccountProfile() {

    const { flash, auth } = usePage().props;
   
    const currentUser = auth.user;
   // console.log(currentUser)
   // const [success, setSuccess] = useState(false);

   const success = flash.success;

    const {data, setData, processing, post, errors,reset, wasSuccessful, recentlySuccessful } = useForm({
        password: '12345678',
        password_confirmation: '12345678',
    })

  //  console.log(wasSuccessful);
  //  console.log(recentlySuccessful);
    const [state, setState] = useState({
        name: "",
        lname: "",
        email: "",
    })

const [ntoast, setToast] = useState("");

const inputHandle = (e)=>{
    setData({
        [e.target.name] : e.target.value
    })
}

const formSubmit = (e)=>{
    e.preventDefault();
    post(route('password.change'));
    setToast(Math.random());
}

const profileChangeHandle = (e)=>{
    e.preventDefault();
    setState({
        ...state,
        [e.target.name] : e.target.value
    })
}

const profileUpdate = (e) =>{
    e.preventDefault();

    Inertia.post('/dashboard/account-update', state);
    setToast(Math.random());
}


useEffect(() => {
    setState({
        ...state,
        email: currentUser.email,
        name: currentUser.name,
        lname: currentUser.lname,
    })

}, [currentUser])



useEffect(()=>{


    toast.success(success, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

},[success,ntoast])



  return (
    <DashboardLayout>
    
    <ToastContainer />  

    <main>


    <Header title ="Account Settings - Profile"/>

    <div className="container-xl px-4 mt-4">

        <nav className="nav nav-borders">
            <Link className="nav-link active ms-0" href="#!">Profile</Link>
            <Link className="nav-link" href="#!">Billing</Link>
            <Link className="nav-link" href="#!">Security</Link>
            <Link className="nav-link" href="#!">Notifications</Link>
        </nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
            <div className="col-xl-4">

                <div className="card mb-4 mb-xl-0">
                    <div className="card-header">Profile Picture</div>
                    <div className="card-body text-center">


                       <AccountProfileImg />

                    </div>

                    <div className="card mt-4">
                    <div className="card-header">Change password</div>
                    <div className="card-body">

                        <form onSubmit={formSubmit}>
                            <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputFirstName">New password</label>
                                    <input name='password' className="form-control"  type="password" placeholder="New password" onChange={inputHandle} value={data.password} />
                                </div>

                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputLastName">Confirm password</label>
                                    <input name='password_confirmation' className="form-control" id="inputLastName" type="password" placeholder="Confirm password" onChange={inputHandle} value={data.password_confirmation} />
                                </div>
                            </div>

                            <button disabled={processing} className="btn btn-primary" type="submit">Update password</button>
                        </form>
                    </div>
                </div>





                </div>
            </div>
            <div className="col-xl-8">

                <div className="card mb-4">
                    <div className="card-header">Account Details</div>
                    <div className="card-body">
                        <form onSubmit={profileUpdate}>

        
                        <div className="row gx-3 mb-3">
                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                                    
                                    <input name='name' className="form-control"  type="text" placeholder="Enter your first name" onChange={profileChangeHandle} value={state.name || ""}  />
                                </div>

                                <div className="col-md-6">
                                    <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                                    <input name='lname' className="form-control"  type="text" placeholder="Enter your last name" onChange={profileChangeHandle} value={state.lname || ""}  />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                                <input name='email' className="form-control"  type="email" placeholder="Enter your email address" onChange={profileChangeHandle} value={state.email || ""}  />
                            </div>
            
                            <button className="btn btn-primary" type="submit">Save changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>





    </DashboardLayout>
  )
}
