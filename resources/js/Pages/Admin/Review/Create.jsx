import React from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import { useForm } from '@inertiajs/inertia-react'
import Select from 'react-select'


export default function Create({product}) {


        const options = []
        product.map((item, index)=> options[index] = {value: item.id, label: '#'+item.id+' '+item.name} )

//    console.log(attribute);


    const {data, setData, post, processing, errors, reset} = useForm({
            'product_id': '',
            'rating': 5,
            'review':''
    })
    const inputHandle = (e) =>{
        e.preventDefault();
        setData(
            e.target.name, e.target.value
        )
    }
    const onSelectChnage = e =>{
        
        setData(
            'product_id', e.value
        )
    }
    const submitHandle = (e) =>{
        e.preventDefault();
        post(route('review.store'));
    }

   console.log(data);
  // console.log(errors);

  return (
    <DashboardLayout>
        <Header title ="Review Create"/>
        
        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Review Information</div>
                <div className="card-body">
                <form onSubmit={submitHandle}>

                    <div className="form-group">
                    <label className="col-sm-2 col-form-label">Product</label>

                        <Select 
                        placeholder="Select a product"
                        options={options} 
                        defaultValue="" 
                      //  value="" 
                        name='product_id'
                     //  isMulti
                        onChange={onSelectChnage}
                         />

                    </div>  
                   
                    
                     <div className="form-group">
                    <label className="col-sm-2 col-form-label">Product</label>

                        <select onChange={inputHandle} defaultValue="5"  name="rating" className='form-select'>
                            <option >Select a rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>

                    </div>                    
                    <div className="form-group mb-3">
                    <label className="col-sm-2 col-form-label">Write Review</label>
                        <input onChange={inputHandle} value={data.review} name='review' type="text" className="form-control"  />
                    </div>                    

                    <button disabled={processing} type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>

</DashboardLayout>    
  ) 
}
