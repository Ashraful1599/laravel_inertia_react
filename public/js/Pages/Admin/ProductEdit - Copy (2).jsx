import React, {useEffect, useRef,useState} from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import { useForm } from '@inertiajs/inertia-react'
//import ReactRichEditor from 'react-rich-text-editor'
//import { Editor } from "react-draft-wysiwyg";
import { Editor } from '@tinymce/tinymce-react';
import * as fIcon from 'react-feather';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export default function ProductEdit({categories, tags, terms, attributes, product}) {


  //  const editorRef = useRef(null);
  
console.log(product)

 const {data, setData, post, processing, errors, reset, progress} = useForm({
    'name': product.name,
    'slug': product.slug,
    'regular_price': product.regular_price,
    'offer_price': product.offer_price,
    'sku': product.sku,
    'promo1': product.promo1,
    'promo2': product.promo2,
    'tax_class': product.tax_class,
    'cat_id': product.cat_id,
    'tag_id': product.tag_id,
    'image': null,
    'image2': null,
    'gallery': null,
    'status': product.status,
    'fetured': product.fetured,
    'description': product.description,
    'product_type': product.product_type,
    'variable': JSON.parse(product.variable),
});

//console.log(data.variable)

    const inputHandle = (e) =>{
       // e.preventDefault();
        setData( e.target.name, e.target.value )

       // console.log(data)
    }
    const inputFileHandle = (e) =>{
        e.preventDefault();
          setData( 'image', e.target.files[0] );
      }    
      const inputFileHandle2 = (e) =>{
        e.preventDefault();
          setData( 'image2', e.target.files[0] );
      }    
      
      
      const inputGalleryHandle = (e) =>{
        e.preventDefault();
        //console.log(e)
          setData( 'gallery', e.target.files );
      }


    const textareaHandle = (content) =>{
        setData('description', content )
      // console.log(content)
    }

    const submitHandle = (e) =>{
        e.preventDefault();
      //  console.log(data);
        post(route('product.store'));
    }

   console.log(data);
  // console.log(errors);

  const attriValue = {};
  attributes.map((item)=>{
      return attriValue[item.name.toLowerCase()] = '';
  }) 

  const [obj, setObj] = useState(attriValue);


  const inputElement = [];
  
  const variableAdditionalFeld = {
      price: "",
      sku: "",
  }
  
  let objWithAddition = {
      ...obj,
      ...variableAdditionalFeld
  };

const [attributesValNew, setattributesValNew] = useState({});

//  let attributesValNew = {}
  attributes.map((item)=>{
    var filterTerm = terms.filter((trm)=> item.id == trm.attribute_id );
      var termArray = [];
      filterTerm.forEach((item)=>{
          termArray.push(item.id);
      })
      return attributesValNew[item.name.toLowerCase()] = termArray;
  })

  let attrs = [];
  
  for (const [attr, values] of Object.entries(attributesValNew))
    attrs.push(values.map(v => ({[attr]:v})));
  
  attrs = attrs.reduce((a, b) => a.flatMap(d => b.map(e => ({...d, ...e}))));


attrs.map((item)=>{
    Object.defineProperty(item, 'price', {
        value: "",
        writable: true,
        configurable: true,
        enumerable: true
    })
    Object.defineProperty(item, 'sku', {
        value: "",
        writable: true,
        configurable: true,
        enumerable: true
    })
});


//console.log(attrs);

  const [arr, setArr] = useState(attrs);
  const [inarr, setInarr] = useState(attributes);
 const [checked, setChecked] = useState([]);
 const varArr = JSON.parse(product.variable);
//const setChecked = [];

  const variableCheck = (e)=>{
  //  e.preventDefault();

  var variant_check = document.querySelectorAll('.variant_check:checked');

  if(variant_check.length == 1){
    variant_check[0].disabled = true;
  }else{
    variant_check.forEach((item)=>{
        item.disabled = false;
    })
  }


   if(e.target.checked){
    const index = checked.indexOf(e.target.name);
    if (index > -1) { // only splice array when item is found
        checked.splice(index, 1); // 2nd parameter means remove one item only
    }
    let attributesValNewCheck3 = {}
    attributes.map((item)=>{
      var filterTerm = terms.filter((trm)=> item.id == trm.attribute_id );
        var termArray2 = [];
        filterTerm.forEach((item)=>{
            termArray2.push(item.id);
        });
        if(item.name.toLowerCase() == e.target.name || checked.includes(item.name.toLowerCase()) == false){
            attributesValNewCheck3[item.name.toLowerCase()] = termArray2;
        }
    });

    let attrs3 = [];
  
    for (const [attr3, values] of Object.entries(attributesValNewCheck3))
      attrs3.push(values.map(v => ({[attr3]:v})));
    
    attrs3 = attrs3.reduce((a, b) => a.flatMap(d => b.map(e => ({...d, ...e}))));

    attrs3.map((item)=>{
        Object.defineProperty(item, 'price', {
            value: "",
            writable: true,
            configurable: true,
            enumerable: true
        })
        Object.defineProperty(item, 'sku', {
            value: "",
            writable: true,
            configurable: true,
            enumerable: true
        })
    });
    
    console.log(attrs3)
    setArr(attrs3);
    setData('variable', arr);



    var fileredItem =  attributes.filter((item)=> item.name.toLowerCase() == e.target.name);
  //  console.log(fileredItem);

//    setArr(attrs);

    setInarr(el=>{
        return[
            ...el,
            ...fileredItem,
        ]
    });

     //   setArr(inarr);

   // setData('variable', arr);

   }else{

    setChecked(checked =>{
        return [
            ...checked,
            e.target.name
        ]
    }
    );

   // console.log(checked);

    let attributesValNewCheck = {}
    attributes.map((item)=>{
      var filterTerm = terms.filter((trm)=> item.id == trm.attribute_id );
        var termArray = [];
        filterTerm.forEach((item)=>{
            termArray.push(item.id);
        });
        if(item.name.toLowerCase() != e.target.name && checked.includes(item.name.toLowerCase()) == false){
            attributesValNewCheck[item.name.toLowerCase()] = termArray;
        }
    });

    let attrs2 = [];
  
    for (const [attr, values] of Object.entries(attributesValNewCheck))
      attrs2.push(values.map(v => ({[attr]:v})));
    
    attrs2 = attrs2.reduce((a, b) => a.flatMap(d => b.map(e => ({...d, ...e}))));

    attrs2.map((item)=>{
        Object.defineProperty(item, 'price', {
            value: "",
            writable: true,
            configurable: true,
            enumerable: true
        })
        Object.defineProperty(item, 'sku', {
            value: "",
            writable: true,
            configurable: true,
            enumerable: true
        })
    });
    
  //  console.log(attrs2)
    setArr(attrs2);
    setData('variable', arr);

    var fileredItem =  inarr.filter((item)=> item.name.toLowerCase() != e.target.name);
  //  console.log(fileredItem)
    setInarr(fileredItem);

   }

  }

  const addInput = () => {
    setArr(s => {
      //  console.log(inarr);
      return [
        ...s,
     //   inarr,
        objWithAddition
      ];
    });
  };

  let removeFormFields = (i) => {
    let newFormValues = [...arr];
    newFormValues.splice(i, 1);
  //  console.log(newFormValues);
    setData('variable', newFormValues);
    setArr(newFormValues)

}


  const AddHandleChange = e => {
    e.preventDefault();

    const index = e.target.id;
  //  console.log(e.target.name);
    setArr(s => {
      const newArr = s.slice();
   //   console.log(newArr)

      newArr[index][e.target.name] = e.target.value;
      return newArr;

    });

    setData('variable', arr);

  };  

  var tagOptions = [];

  tags.map((item)=>{
        tagOptions.push({value:  item.id, label: item.tag_name})
      //  tagOptions.push({label: item.tag_name})
  })
 
  const inputTagHandle = (e) =>{
        setData('tag_id', e);
  }

  console.log(arr);

  return (
    <DashboardLayout>
        <Header title ="Product"/>
        
        <div className="container-xl px-4">
        <form onSubmit={submitHandle}>    
            <div className="row">
            <div className="col-lg-8">
                <div className="card mb-4">
                    <div className="card-header">Product Information</div>
                    <div className="card-body">

           
                        <div className="form-group">
                        <label className="col-sm-2 col-form-label">Name</label>
                            <input onChange={inputHandle} value={data.name} name='name' type="text" className="form-control"  />
                            {errors && <div className='text-danger'>{errors.name}</div>}
                        </div>                     
                        {/* <div className="form-group">
                        <label className="col-sm-2 col-form-label">Slug</label>
                            <input onChange={inputHandle} value={data.slug} name='slug' type="text" className="form-control"  />
                        </div>                   */}
                        
                   
                        <div className="form-group mb-3">
                        <label className="col-sm-2 col-form-label">Description</label>

                        <Editor
                            apiKey='nkkvgg6v97wpitv8o0qjvf3zsut8x3eqyb5difq13e14dzko'
                            //onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={data.description}
                            init={{
                            height: 400,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

                            images_upload_url: 'http://127.0.0.1:8000/imgupload',
                            automatic_uploads: true

                            }}
                            onEditorChange={textareaHandle}
                        />

                            {/* <textarea className="form-control editorClassName" onChange={inputHandle} value={data.description} name="description" id="textarea" cols="30" rows="10">{data.description}</textarea> */}
                            {errors && <div className='text-danger'>{errors.description}</div>}
                        </div>    

<div className="form-group mt-3 mb-3">
<div className=" form-check-inline">
  <label className="form-check-label" >Product type:</label>
</div>
<div className="form-check form-check-inline">
    <label className="form-check-label" htmlFor="inlineCheckbox1">Simple</label>
    <input onChange={inputHandle} checked={data.product_type=='simple'}  name='product_type' className="form-check-input" type="radio" id="inlineCheckbox1" value="simple" />
</div>
<div className="form-check form-check-inline">
    <label className="form-check-label" htmlFor="inlineCheckbox2">Variable</label>
    <input onChange={inputHandle} checked={data.product_type=='variable'}   name='product_type' className="form-check-input" type="radio" id="inlineCheckbox2" value="variable" />
</div>
</div>

{data.product_type === 'simple'?
    <div className="d-flex align-items-start">
    <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" >Price</button>
        <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" >SKU</button>
        <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button">Tax class</button>
        <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" >Promo label</button>
    </div>
    <div className="tab-content product_tab_content" id="v-pills-tabContent">
        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" >
                    <div className="form-group">
                        <label className="col-form-label">Regular Price</label>
                            <input onChange={inputHandle} value={data.regular_price} name='regular_price' type="number" className="form-control"  />
                            {errors && <div className='text-danger'>{errors.regular_price}</div>}
                    </div>                     
                    <div className="form-group">
                        <label className="col-form-label">Offer Price</label>
                            <input onChange={inputHandle} value={data.offer_price} name='offer_price' type="number" className="form-control"  />
                            {errors && <div className='text-danger'>{errors.offer_price}</div>}
                    </div> 
        </div>
        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" >
                <div className="form-group">
                        <label className="col-form-label">SKU</label>
                            <input onChange={inputHandle} value={data.sku} name='sku' type="text" className="form-control"  />
                            {errors && <div className='text-danger'>{errors.sku}</div>}
                </div> 
        </div>
        <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                <div className="form-group">
                        <label className="col-form-label">Tax class</label>
                        <select onChange={inputHandle} className='form-select' name="tax_class" defaultValue='no_tax'>
                            <option value="">Select a tax class</option>
                            <option value="no_tax">No tax</option>
                            <option value="standard">Standard</option>
                        </select>
                </div> 

        </div>
        <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" >

        <div className="form-group">
                        <label className="col-form-label">Promotional label 1</label>
                            <input onChange={inputHandle} value={data.promo1} name='promo1' type="text" className="form-control"  />
                            {errors && <div className='text-danger'>{errors.promo1}</div>}
           </div> 

        <div className="form-group">
                        <label className="col-form-label">Promotional label 2</label>
                            <input onChange={inputHandle} value={data.promo2} name='promo2' type="text" className="form-control"  />
                            {errors && <div className='text-danger'>{errors.promo2}</div>}
           </div> 


        </div>
    </div>
    </div>
  :     <div className="d-flex align-items-start">
  <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" >Variable</button>
      {/* <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" >SKU</button> */}
      <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button">Tax class</button>
      <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" >Promo label</button>
  </div>
  <div className="tab-content product_tab_content" id="v-pills-tabContent">
      <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" >


                        <div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <button className='btn btn-secondary ' type='button' onClick={addInput}>Add variable</button>
                                </div>
                                <div className="col-sm-8">
                                    {
                                        attributes.map((item, index)=>{
                                            return(
                                                <div key={index} className="form-check form-check-inline">
                                                 <input onChange={variableCheck} defaultChecked name={item.name.toLowerCase()} className="form-check-input variant_check" type="checkbox" value={item.name.toLowerCase()} />
                                                 <label className="form-check-label" >{item.name}</label>
                                                </div> 
                                            )
                                        })
                                    }
                                   
            
                                 </div>
                            </div>
       
                        {varArr.map((arritem, i) => {
                            return (
                                <div key={i} className="row mt-3 variable_row">

                                    {
                                        inarr.map((item, index)=>{
                                            return(
                                                <div key={index} className={'col-sm attr_'+item.name.toLowerCase()}>
                                                    {item.name?
                                                    <select required value={arritem[item.name.toLowerCase()]}  name={item.name.toLowerCase()} onChange={AddHandleChange} id={i} className={'form-select '+arritem[item.name.toLowerCase()]}>
                                                        <option className={"firstItem"+item.name.toLowerCase()} value={item.name.toLowerCase()}>Select {item.name}</option>
                                                        {
                                                            item.terms.map((item, index)=><option key={index} value={item.id}>{item.name}</option>)
                                                        }
                                                        
                                                    </select>: ""
                                                    }
                                                </div>
                                            )
                                        })
                                    }

                                    <div  className="col-sm">
                                    <input
                                            onChange={AddHandleChange}
                                            required
                                            placeholder="Enter price"
                                            name={'price'}
                                            value={arritem.price}
                                            id={i}
                                            type="number"
                                            size="40"
                                            className='form-control'
                                        />
                                    </div>
                           
                                    <div  className="col-sm">
                                    <input
                                            onChange={AddHandleChange}
                                            placeholder="Enter SKU"
                                            name={'sku'}
                                            value={arritem.sku}
                                            id={i}
                                            type="text"
                                            size="40"
                                            className='form-control'
                                        />

                                     <button type="button"  className=" variable_remove" onClick={() => removeFormFields(i)}> <fIcon.XCircle /> </button>
                                    </div>
                                </div>
    
                            );
                        })}
                        </div>



                  {/* <div className="form-group">
                      <label className="col-form-label">Regular Price</label>
                          <input onChange={inputHandle} value={data.regular_price} name='regular_price' type="number" className="form-control"  />
                          {errors && <div className='text-danger'>{errors.regular_price}</div>}
                  </div>                     
                  <div className="form-group">
                      <label className="col-form-label">Offer Price</label>
                          <input onChange={inputHandle} value={data.offer_price} name='offer_price' type="number" className="form-control"  />
                          {errors && <div className='text-danger'>{errors.offer_price}</div>}
                  </div>  */}
      </div>
      {/* <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" >
              <div className="form-group">
                      <label className="col-form-label">SKU (Entering SKU here, all SKU generate automaticallly for all variable)</label>
                          <input placeholder='Enter SKU' onChange={inputHandle} value={data.sku} name='sku' type="text" className="form-control"  />
                          {errors && <div className='text-danger'>{errors.sku}</div>}
              </div> 
      </div> */}
      <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
              <div className="form-group">
                      <label className="col-form-label">Tax class</label>
                      <select onChange={inputHandle} className='form-select' name="tax_class" defaultValue='no_tax'>
                          <option value="">Select a tax class</option>
                          <option value="no_tax">No tax</option>
                          <option value="standard">Standard</option>
                      </select>
              </div> 

      </div>
      <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" >

      <div className="form-group">
                      <label className="col-form-label">Promotional label 1</label>
                          <input onChange={inputHandle} value={data.promo1} name='promo1' type="text" className="form-control"  />
                          {errors && <div className='text-danger'>{errors.promo1}</div>}
         </div> 

      <div className="form-group">
                      <label className="col-form-label">Promotional label 2</label>
                          <input onChange={inputHandle} value={data.promo2} name='promo2' type="text" className="form-control"  />
                          {errors && <div className='text-danger'>{errors.promo2}</div>}
         </div> 


      </div>
  </div>
  </div>             

 }


                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card mb-4 nav-sticky">
                    <div className="card-header">Product Information</div>
                    <div className="card-body">



                        
                    <div className="form-group">
                        <label className="col-sm-2 col-form-label">Category</label>
                            <select className="form-control" onChange={inputHandle} name="cat_id" defaultValue='general'>
                            <option>Select a Category</option>

                                {
                                    categories.map((item, index)=>{
                                        return(
                                            <option key={index} value={item.id}>{item.cat_name}</option>
                                        )
                                    })
                                }
                            </select>
                            {errors && <div className='text-danger'>{errors.cat_id}</div>}
                        </div>                     
                        
                        <div className="form-group">
                            <label className="col-sm-2 col-form-label">Tag</label>
                            <Select
                              //  closeMenuOnSelect={false}
                                isMulti
                                options={tagOptions}
                           //     value={value}
                                name="tag_id"
                              //  className="form-select"
                                classNamePrefix="select"
                                onChange={inputTagHandle}
                                />


                            {/* <select className="form-control" onChange={inputHandle} name="tag_id" defaultValue='tag'>
                            <option>Select a tag</option>

                                {
                                    tags.map((item, index)=>{
                                        return(
                                            <option key={index} value={item.id}>{item.tag_name}</option>
                                        )
                                    })
                                }
        
                            </select> */}
                            {errors && <div className='text-danger'>{errors.tag_id}</div>}
                        </div>                     
                        
                        <div className="form-group">
                            <label className=" col-form-label">Fetured</label>
                            <select className="form-control" onChange={inputHandle} name="fetured" defaultValue={data.fetured}>
                                <option>Select featured status</option>
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                            </select>
                            {errors && <div className='text-danger'>{errors.fetured}</div>}
                        </div>                    
                        <div className="form-group">
                            <label className=" col-form-label">Status</label>
                            <select className="form-control" onChange={inputHandle} name="status" defaultValue={data.status}>
                                <option value="1">Publish</option>
                                <option value="0">Draft</option>
                            </select>
                            {errors && <div className='text-danger'>{errors.status}</div>}
                        </div>                     
                        

                        <div className="form-group mb-3">
                            <label className=" col-form-label">Small image</label>
                            <input onChange={inputFileHandle} name='image' type="file"  className="form-control"  />
                            {errors && <div className='text-danger'>{errors.image}</div>}
                        </div>                         
                        
                        <div className="form-group mb-3">
                            <label className=" col-form-label">Small image on hover</label>
                            <input onChange={inputFileHandle2} name='image2' type="file"  className="form-control"  />
                            {errors && <div className='text-danger'>{errors.image2}</div>}
                        </div> 
                         
                        
                        <div className="form-group mb-3">
                            <label className=" col-form-label">Gallery (you can select multiple images)</label>
                            <input multiple="multiple" onChange={inputGalleryHandle} name='gallery' type="file"  className="form-control"  />
                            {errors && <div className='text-danger'>{errors.gallery}</div>}
                        </div> 
                        <div className="row">
                            {progress && (
                                    <progress value={progress.percentage} max="100">
                                        {progress.percentage}%
                                    </progress>
                                    )}
                        </div>

                        <button disabled={processing} type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
            </div>
        </form>
        </div>

</DashboardLayout>    
  ) 
}
