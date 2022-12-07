import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import { useForm } from '@inertiajs/inertia-react'

export default function TagCreate() {

    const {data, setData, post, processing, errors, reset} = useForm({
            'tag_name': '',
            'tag_des': '',
    })
    const inputHandle = (e) =>{
        e.preventDefault();
        setData(
            e.target.name, e.target.value
        )
    }
    const submitHandle = (e) =>{
        e.preventDefault();
        post(route('tag.store'));
    }

  // console.log(data);
  // console.log(errors);

  return (
    <DashboardLayout>
        <Header title ="Tag Edit"/>
        
        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Tag Information</div>
                <div className="card-body">
                <form onSubmit={submitHandle}>
                    <div className="form-group">
                    <label className="col-sm-2 col-form-label">Tag name</label>
                        <input onChange={inputHandle} value={data.tag_name} name='tag_name' type="name" className="form-control"  />
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Tag description</label>
                        <input onChange={inputHandle} value={data.tag_des} name='tag_des' type="lname" className="form-control"  />
                    </div>                    

                    <button disabled={processing} type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>

</DashboardLayout>    
  ) 
}
