import React, {useEffect} from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import {DataTable} from "simple-datatables"
import * as fIcon from 'react-feather';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function CatIndex({categories}) {


    useEffect(() => {
        let myTable = document.querySelector("#datatablesSimple");
        let dataTable = new DataTable(myTable);

    }, [])



document.querySelectorAll("#datatablesSimple tbody tr .deleteBtn").forEach(
    function (e) {
        e.addEventListener("click", function () {

            let id = e.getAttribute('id');
          //  console.log(id);

            if (confirm("Are you sure you want to delete it?")) {
                Inertia.delete(route("cat.destroy", id));
         }
        })
    }
)


  return (
    <DashboardLayout>
        <Header title ="Category"/>

        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Category Information <Link className='btn btn-primary' style={{'float':'right'}} href={route('cat.create')}>Add Category</Link></div>
                <div className="card-body">
                    <table id="datatablesSimple">
                        <thead>
                            <tr>
                                <th>Category name</th>
                                <th>Category slug</th>
                                <th>Category description</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Category name</th>
                                <th>Category slug</th>
                                <th>Category description</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </tfoot>
                        <tbody>


                        {
                            categories.map((cat, index)=>{

                                return(
                                    <tr key={index}>
                                        <td>{cat.cat_name}</td>
                                        <td>{cat.cat_slug}</td>
                                        <td>{cat.cat_des}</td>
                                        <td><img className='product_list_img' src={'/uploads/'+cat.image.slug} alt="" /></td>
                                        <td>
                                            <Link  href={route('cat.edit',cat.id)} className="btn btn-datatable btn-icon btn-transparent-dark me-2"> <fIcon.Edit2 /></Link>
                                            <Link as='button' id={cat.id}   className="btn btn-datatable btn-icon btn-transparent-dark deleteBtn"><fIcon.Trash2 /></Link>
                                     
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
