import React, {useState, useEffect} from 'react'
import { useForm } from '@inertiajs/inertia-react'
import Profile from "../../assets/img/illustrations/profiles/profile-1.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePage } from '@inertiajs/inertia-react';

export default function AccountProfileImg() {

 const { flash, auth } = usePage().props;
 //   const success = flash.success;
 //   const [ntoast, setToast] = useState("");


    
// useEffect(()=>{


//     toast.success(success, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         });

// },[success,ntoast])

    const { data, setData, post, progress,errors,processing } = useForm({
        file: null,
      })

      // console.log(data);
      // console.log(errors);

      const inputHandle = (e) =>{
        //console.log(e.target.files[0]);
          setData('file', e.target.files[0]);

       //   setToast(Math.random());
      }
      
      function submit(e) {
        e.preventDefault();
        console.log(data);
        post(route('account.imgupdate'));
      }


//console.log(auth)



  return (
    <div>
                <img className="img-account-profile rounded-circle mb-2" src={ auth.user.image?'/public/uploads/'+auth.user.image : Profile} alt="" />

                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>

                     <form onSubmit={submit}> 
                
                        <div className="row">
                                <input name='file' id='file' type="file"   onChange={inputHandle} />
                                  {errors && <div className='text-danger'>{errors.file}</div>}
                        </div>
                        <div className="row">
                        {progress && (
                                  <progress value={progress.percentage} max="100">
                                      {progress.percentage}%
                                  </progress>
                                  )}
                        </div>

                         <button disabled={processing} type='submit' className="btn btn-primary mt-4">Save image</button>
                     </form> 
    </div>
  )
}
