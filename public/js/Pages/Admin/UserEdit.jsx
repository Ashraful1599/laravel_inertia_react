import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import { useForm } from '@inertiajs/inertia-react'

export default function UserEdit({user}) {

    const {data, setData, post, processing, errors, reset} = useForm({
            'id': user.id,
            'name': user.name,
            'lname': user.lname,
            'email': user.email,
            'role': user.role,
    })
    const inputHandle = (e) =>{
        e.preventDefault();
        setData(
            e.target.name, e.target.value
        )
    }
    const submitHandle = (e) =>{
        e.preventDefault();
        post(route('user.update'));
    }

 //   console.log(data);

  return (
    <DashboardLayout>
        <Header title ="User Edit"/>
        
        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Users Information</div>
                <div className="card-body">
                <form onSubmit={submitHandle}>
                    <div className="form-group">
                    <label className="col-sm-2 col-form-label">First name</label>
                        <input onChange={inputHandle} value={data.name} name='name' type="name" className="form-control"  />
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Last name</label>
                        <input onChange={inputHandle} value={data.lname} name='lname' type="lname" className="form-control"  />
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Email</label>
                        <input readOnly  value={data.email} name='email' type="email" className="form-control"  />
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Role</label>
                        <select onChange={inputHandle} defaultValue={user.role} className="form-control" name="role" id="">
                            <option  value="0">Customer</option>
                            <option  value="1">Admin</option>
                        </select>
                    </div>                    
  

                    <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>

</DashboardLayout>    
  ) 
}
