import React, {useEffect, useRef, useState} from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import { useForm } from '@inertiajs/inertia-react'
import Dropzone, {useDropzone} from 'react-dropzone'

export default function FileCreate() {


    const {data, setData, post, processing, errors, reset, progress} = useForm({
            'file': '',
    });

    const submitHandle = (e) =>{
        e.preventDefault();
        post(route('file.store'));
    }

  const onDrop =(files)=> {
        if (files.length > 0) {
          setData( 'file', files );
        }
    }


   console.log(data);
   console.log(errors);

  return (
    <DashboardLayout>
        <Header title ="File"/>
        
        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Upload Files</div>
                <div className="card-body">
                <form onSubmit={submitHandle}>

                    <div className="form-group">
    <Dropzone onDrop={onDrop} multiple={true}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {data.file? (
                  <ul style={{'marginBottom': '0'}} className="selected-file">
                     {data.file.map((item, index)=>{

                        return(
                            <li  key={index}>{item.name}</li> 
                        )
                     })
                     }
                  </ul>
                ) : (
                  'Drag and drop file here, or click to select file'
                )}
              </div>
            </section>
          )}
        </Dropzone>

                        {errors && <div className='text-danger'>{errors.file}</div>}
                    </div>                     
                    
                    <div className="row mb-3">
                        {progress && (
                                  <progress value={progress.percentage} max="100">
                                      {progress.percentage}%
                                  </progress>
                                  )}
                    </div>

                    <button disabled={!data.file || processing} type="submit" className="btn btn-primary">Upload</button>
                    </form>
                </div>
            </div>
        </div>

</DashboardLayout>    
  ) 
}
