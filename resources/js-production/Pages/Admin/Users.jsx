import React, {useEffect} from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import {DataTable} from "simple-datatables"
import * as fIcon from 'react-feather';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function Users({users}) {


    useEffect(() => {
        let myTable = document.querySelector("#datatablesSimple");
        let dataTable = new DataTable(myTable);

    }, [])




document.querySelectorAll("#datatablesSimple tbody tr .deleteBtn").forEach(
    function (e) {
        e.addEventListener("click", function () {

            let id = e.getAttribute('id');
          //  console.log(id);

            if (confirm("Are you sure you want to delete this user?")) {
                Inertia.get(route("user.delete", id));
         }
        })
    }
)


  return (
    <DashboardLayout>
        <Header title ="Users"/>

        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Users Information <Link className='btn btn-primary' style={{'float':'right'}} href={route('user.index')}>Add user</Link></div>
                <div className="card-body">
                    <table id="datatablesSimple">
                        <thead>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </tfoot>
                        <tbody>


                        {
                            users.map((user, index)=>{

                                return(
                                    <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.lname}</td>
                                        <td>{user.email}</td>
                                        <td>
                                        {user.role == 1? <div className="badge bg-primary text-white rounded-pill">Admin</div> : user.role == 0? "Customer" : ""}
                                            
                                        </td>
                                        <td>
                                            <Link  href={route('user.edit',user.id)} className="btn btn-datatable btn-icon btn-transparent-dark me-2"> <fIcon.Edit2 /></Link>
                                            <Link as='button' id={user.id}   className="btn btn-datatable btn-icon btn-transparent-dark deleteBtn"><fIcon.Trash2 /></Link>
                                     
                                        </td>
                                    </tr>
                                )
                            })

                        }




                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    </DashboardLayout>
  )
}
