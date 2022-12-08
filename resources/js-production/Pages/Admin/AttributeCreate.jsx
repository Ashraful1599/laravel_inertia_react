import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import { useForm } from '@inertiajs/inertia-react'

export default function AttributeCreate() {

    const {data, setData, post, processing, errors, reset} = useForm({
            'name': '',
            'des': '',
    })
    const inputHandle = (e) =>{
        e.preventDefault();
        setData(
            e.target.name, e.target.value
        )
    }
    const submitHandle = (e) =>{
        e.preventDefault();
        post(route('attribute.store'));
    }

  // console.log(data);
  // console.log(errors);

  return (
    <DashboardLayout>
        <Header title ="Attribute Create"/>
        
        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Attribute Information</div>
                <div className="card-body">
                <form onSubmit={submitHandle}>
                    <div className="form-group">
                    <label className="col-sm-2 col-form-label">Attribute name</label>
                        <input onChange={inputHandle} value={data.name} name='name' type="name" className="form-control"  />
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Attribute description</label>
                        <input onChange={inputHandle} value={data.des} name='des' type="lname" className="form-control"  />
                    </div>                    

                    <button disabled={processing} type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>

</DashboardLayout>    
  ) 
}
