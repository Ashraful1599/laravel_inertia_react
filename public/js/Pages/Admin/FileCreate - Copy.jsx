import React, {useEffect, useRef, useState} from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import { useForm } from '@inertiajs/inertia-react'
import Dropzone, {useDropzone} from 'react-dropzone'

    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
      };
      
      const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box'
      };
      
      const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
      };
      
      const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
      };



export default function FileCreate({categories, tags}) {


  //  const editorRef = useRef(null);
  

    const {data, setData, post, processing, errors, reset, progress} = useForm({
            'file': '',
    });
    const inputHandle = (e) =>{
        e.preventDefault();
        setData( e.target.name, e.target.value )
    }
    const inputFileHandle = (e) =>{
        e.preventDefault();
          setData( 'image', e.target.files[0] );
      }

    const submitHandle = (e) =>{
        e.preventDefault();
        post(route('product.store'));
    }

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

  const onDrop =(files)=> {
        if (files.length > 0) {
          setState({ selectedFiles: files });
        }
    }
    // const state = {
    //     selectedFiles: undefined,
    //     currentFile: undefined,
    //     progress: 0,
    //     message: '',
    //     fileInfos: [],
    //   };

    const [selectedFile, setState] = useState({
        selectedFiles: undefined,
        currentFile: undefined,
        progress: 0,
        message: '',
        fileInfos: [],
    })










   console.log(data);
   console.log(errors);

  return (
    <DashboardLayout>
        <Header title ="File"/>
        
        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">File Information</div>
                <div className="card-body">
                <form onSubmit={submitHandle}>

                    <div className="form-group">
                    <label className="col-sm-2 col-form-label">Name</label>


    <Dropzone onDrop={onDrop} multiple={false}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {selectedFile.selectedFiles && selectedFile.selectedFiles[0].name ? (
                  <div className="selected-file">
                    {selectedFile.selectedFiles && selectedFile.selectedFiles[0].name}
                  </div>
                ) : (
                  'Drag and drop file here, or click to select file'
                )}
              </div>
              <aside className="selected-file-wrapper">
                <button
                  className="btn btn-success"
                  disabled={!selectedFile.selectedFiles}
               //   onClick={this.upload}
                >
                  Upload
                </button>
              </aside>
            </section>
          )}
        </Dropzone>



        <div className="alert alert-light" role="alert">
          {}
        </div>

        {selectedFile.fileInfos.length > 0 && (
          <div className="card">
            <div className="card-header">List of Files</div>
            <ul className="list-group list-group-flush">
              {selectedFile.fileInfos.map((file, index) => (
                <li className="list-group-item" key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}


                        {errors && <div className='text-danger'>{errors.name}</div>}
                    </div>                     
                    
                    <div className="row mb-3">
                        {progress && (
                                  <progress value={progress.percentage} max="100">
                                      {progress.percentage}%
                                  </progress>
                                  )}
                    </div>

                    <button disabled={processing} type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>

</DashboardLayout>    
  ) 
}
