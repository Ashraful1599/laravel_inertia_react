import React, {useEffect} from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import {DataTable} from "simple-datatables"
import * as fIcon from 'react-feather';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';

export default function TagIndex({tags}) {


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
                Inertia.delete(route("tag.destroy", id));
         }
        })
    }
)


  return (
    <DashboardLayout>
        <Header title ="Tag"/>

        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Tag Information <Link className='btn btn-primary' style={{'float':'right'}} href={route('tag.create')}>Add tag</Link></div>
                <div className="card-body">
                    <table id="datatablesSimple">
                        <thead>
                            <tr>
                                <th>Tag name</th>
                                <th>Tag slug</th>
                                <th>Tag description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>Tag name</th>
                                <th>Tag slug</th>
                                <th>Tag description</th>
                                <th>Actions</th>
                            </tr>
                        </tfoot>
                        <tbody>


                        {
                            tags.map((tag, index)=>{

                                return(
                                    <tr key={index}>
                                        <td>{tag.tag_name}</td>
                                        <td>{tag.tag_slug}</td>
                                        <td>{tag.tag_des}</td>
                                        <td>
                                            <Link  href={route('tag.edit',tag.id)} className="btn btn-datatable btn-icon btn-transparent-dark me-2"> <fIcon.Edit2 /></Link>
                                            <Link as='button' id={tag.id}   className="btn btn-datatable btn-icon btn-transparent-dark deleteBtn"><fIcon.Trash2 /></Link>
                                     
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
