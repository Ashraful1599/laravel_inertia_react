import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import { useForm } from '@inertiajs/inertia-react'

export default function UserEdit() {

    const {data, setData, post, processing, errors, reset} = useForm({
            'name': '',
            'lname': '',
            'email': '',
            'role': '0',
            'password_confirmation': '12345678',
            'password': '12345678',
    })
    const inputHandle = (e) =>{
        e.preventDefault();
        setData(
            e.target.name, e.target.value
        )
    }
    const submitHandle = (e) =>{
        e.preventDefault();
        post(route('user.add'));
    }

   console.log(errors);

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
                        <input onChange={inputHandle}  value={data.email} name='email' type="email" className="form-control"  />
                    </div>                    
                    
                    <div className="form-group mb-3">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <input onChange={inputHandle}  value={data.password} name='password' type="password" className="form-control"  />
                    </div>                     
                    
                    <div className="form-group mb-3">
                        <label className="col-sm-2 col-form-label">Confirm password</label>
                        <input onChange={inputHandle}  value={data.password_confirmation} name='password_confirmation' type="password" className="form-control"  />
                    </div> 

                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Role</label>
                        <select onChange={inputHandle} defaultValue={data.role}  className="form-control" name="role" id="">
                            <option  value="0">Customer</option>
                            <option  value="1">Admin</option>
                        </select>
                    </div>                    
  

                    <button disabled={processing} type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>

</DashboardLayout>    
  ) 
}
