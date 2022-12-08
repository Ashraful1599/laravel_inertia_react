import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import { useForm } from '@inertiajs/inertia-react'

export default function TagEdit({tag}) {

    const {data, setData, put, processing, errors, reset} = useForm({
            'id': tag.id,
            'tag_name': tag.tag_name,
            'tag_slug': tag.tag_slug,
            'tag_des': tag.tag_des,
    })
    const inputHandle = (e) =>{
        e.preventDefault();
        setData(
            e.target.name, e.target.value
        )
    }
    const submitHandle = (e) =>{
        e.preventDefault();
        put(route('tag.update',tag.id));
    }

 //   console.log(data);

  return (
    <DashboardLayout>
        <Header title ="Tag Edit"/>
        
        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Tag Information</div>
                <div className="card-body">
                <form onSubmit={submitHandle}>
                    <div className="form-group">
                    <label className="col-sm-2 col-form-label">Category name</label>
                        <input onChange={inputHandle} value={data.tag_name} name='tag_name' type="text" className="form-control"  />
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Category slug</label>
                        <input onChange={inputHandle} value={data.tag_slug} name='tag_slug' type="text" className="form-control"  />
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Category description</label>
                        <input onChange={inputHandle}  value={data.tag_des} name='tag_des' type="text" className="form-control"  />
                    </div>                    
                    
  

                    <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>

</DashboardLayout>    
  ) 
}
