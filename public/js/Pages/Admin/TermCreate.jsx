import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import { useForm } from '@inertiajs/inertia-react'

export default function TermCreate({attribute}) {

//    console.log(attribute);

    const {data, setData, post, processing, errors, reset} = useForm({
            'name': '',
            'des': '',
            'attribute_id':','
    })
    const inputHandle = (e) =>{
        e.preventDefault();
        setData(
            e.target.name, e.target.value
        )
    }
    const submitHandle = (e) =>{
        e.preventDefault();
        post(route('term.store'));
    }

  // console.log(data);
  // console.log(errors);

  return (
    <DashboardLayout>
        <Header title ="Term Create"/>
        
        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Term Information</div>
                <div className="card-body">
                <form onSubmit={submitHandle}>
                    <div className="form-group">
                    <label className="col-sm-2 col-form-label">Attribute name</label>

                        <select onChange={inputHandle} value={data.attribute_id} name="attribute_id" className='form-control'>
                            <option>Select a attribute</option>
                            {
                                attribute.map((item, index)=> <option value={item.id} key={index}>{item.name}</option> )
                            }
                        </select>

                    </div> 
                    <div className="form-group">
                    <label className="col-sm-2 col-form-label">Term name</label>
                        <input onChange={inputHandle} value={data.name} name='name' type="name" className="form-control"  />
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Term description</label>
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
