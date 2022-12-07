import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import { useForm } from '@inertiajs/inertia-react'

export default function CatEdit({cat_data}) {

    const {data, setData, post, processing, errors, reset} = useForm({
            'id': cat_data.id,
            'cat_name': cat_data.cat_name,
            'cat_slug': cat_data.cat_slug,
            'cat_des': cat_data.cat_des,
            'image': null,
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
        post(route('cat.update',cat_data.id));
    }

   console.log(data);

  return (
    <DashboardLayout>
        <Header title ="Category Edit"/>
        
        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Category Information</div>
                <div className="card-body">
                <form onSubmit={submitHandle}>
                    <div className="form-group">
                    <label className="col-sm-2 col-form-label">Category name</label>
                        <input onChange={inputHandle} value={data.cat_name} name='cat_name' type="text" className="form-control"  />
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Category slug</label>
                        <input onChange={inputHandle} value={data.cat_slug} name='cat_slug' type="text" className="form-control"  />
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Category description</label>
                        <input onChange={inputHandle}  value={data.cat_des?data.cat_des:" "} name='cat_des' type="text" className="form-control"  />
                    </div>                    
                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label"> Image</label>
                        <input onChange={inputFileHandle}  name='image' type="file" className="form-control"  />
                    </div> 

                    <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>

</DashboardLayout>    
  ) 
}
