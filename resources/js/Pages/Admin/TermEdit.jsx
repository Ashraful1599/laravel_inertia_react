import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import { useForm } from '@inertiajs/inertia-react'

export default function TermEdit({term,attribute}) {

    const {data, setData, post, processing, errors, reset} = useForm({
            'id': term.id,
            'name': term.name,
            'slug': term.slug,
            'des': term.des,
            'attribute_id': term.attribute_id,
    })
    const inputHandle = (e) =>{
        e.preventDefault();
        setData(
            e.target.name, e.target.value
        )
    }
    const submitHandle = (e) =>{
        e.preventDefault();
        post(route('term.update',tag.id));
    }

 //   console.log(data);

  return (
    <DashboardLayout>
        <Header title ="Attribute Edit"/>
        
        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Attbuite Information</div>
                <div className="card-body">
                <form onSubmit={submitHandle}>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Attribute name</label>

                        <select onChange={inputHandle}  name="attribute_id" className='form-control' defaultValue={data.attribute_id}>
                            <option>Select a attribute</option>
                            {
                                attribute.map((item, index)=> <option value={item.id} key={index}>{item.name}</option> )
                            }
                        </select>

                    </div> 
                    <div className="form-group">
                    <label className="col-sm-2 col-form-label">Attribute name</label>
                        <input onChange={inputHandle} value={data.name} name='name' type="text" className="form-control"  />
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Attribute slug</label>
                        <input onChange={inputHandle} value={data.slug} name='slug' type="text" className="form-control"  />
                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Attribute description</label>
                        <input onChange={inputHandle}  value={data.des?data.des: ""} name='des' type="text" className="form-control"  />
                    </div>                    
                    
  

                    <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>

</DashboardLayout>    
  ) 
}
