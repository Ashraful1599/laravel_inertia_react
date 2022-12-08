import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import { useForm } from '@inertiajs/inertia-react'

export default function UserEdit() {

    const {data, setData, post, processing, errors, reset} = useForm({
            'cat_name': '',
            'cat_des': '',
            'image': '',
    })
    const inputHandle = (e) =>{
        e.preventDefault();
        setData(
            e.target.name, e.target.value
        )
    }    
    
    const inputFileHandle = (e) =>{
        e.preventDefault();
        setData(
            'image', e.target.files[0]
        )
    }
    const submitHandle = (e) =>{
        e.preventDefault();
        post(route('cat.store'));
    }

  // console.log(data);
  // console.log(errors);

  return (
    <DashboardLayout>
        <Header title ="Category Edit"/>
        
        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Category Information</div>
                <div className="card-body">
                <form onSubmit={submitHandle}>
                    <div className="form-group">
                    <label className="col-sm-2 col-form-label"> Name</label>
                        <input onChange={inputHandle} value={data.cat_name} name='cat_name' type="text" className="form-control"  />
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label"> Description</label>
                        <input onChange={inputHandle} value={data.cat_des} name='cat_des' type="text" className="form-control"  />
                    </div>                      
                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label"> Image</label>
                        <input onChange={inputFileHandle}  name='image' type="file" className="form-control"  />
                    </div>                    

                    <button disabled={processing} type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>

</DashboardLayout>    
  ) 
}
