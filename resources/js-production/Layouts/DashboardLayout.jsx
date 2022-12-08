import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import Navbar from "../Layouts/Navbar";
import Aside from "../Layouts/Aside";
import Main from "@/Layouts/Main";
import { usePage } from "@inertiajs/inertia-react";
import { ToastContainer, toast } from 'react-toastify';

export default function DashboardLayout(props) {
    const { flash, auth, error } = usePage().props;
   // console.log(props)
    const currentUser = auth.user;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            {/* <Head title="Dashboard" /> */}
  
            <ToastContainer limit={1} />  

        <Navbar />
  
        <div id="layoutSidenav">
            <Aside />
            <div id="layoutSidenav_content">
           {props.children}
                <footer className="footer-admin mt-auto footer-light">
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






        </AuthenticatedLayout>
    );
}
