<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;


class CurrentUserController extends Controller
{
    public function getCurentUser(){
      return $current_user =  Auth::user();
    }
    public function logout(Request $request){

        auth()->user()->currentAccessToken()->delete();

       // Auth::user()->currentAccessToken()->delete();
 
       // $request->session()->invalidate();
     
       // $request->session()->regenerateToken();

        return "Logout has been successfully";
    }

    public function change_password(Request $request){
      $request->validate([
          'password' => 'required|confirmed',
      ]);
      $loggeduser = auth()->user();
      $loggeduser->password = Hash::make($request->password);
      $loggeduser->save();
      return response([
          'msg' => 'Password Changed Successfully',
          'status'=>'success'
      ], 200);
  }    
  
  
  public function account_update(Request $request){
      $request->validate([
          'name' => 'required',
          'email' => 'required',
          'email' => 'required',
      ]);
      $loggeduser = auth()->user();
      $loggeduser->name = $request->name;
      $loggeduser->lname = $request->lname;
      $loggeduser->email = $request->email;
      $loggeduser->save();
      return response([
          'msg'=>'Profile update Success',
          'status'=>'success',
          'username' => Auth::user()->name." ".Auth::user()->lname,
          'name'=>Auth::user()->name,
          'lname'=> Auth::user()->lname,
      ], 200);
  }

  public function account_img_update(Request $request){
  

    

    // $request->validate([
    //     'file' =>['required']
    // ]);

    if($request->hasFile('file')){
       $file = $request->file('file');
        $fileName = time().'.'.$file->extension();  


    File::put('uploads/'.$fileName, File::get($file));
    
    $logged_user = Auth::user();


    if(File::exists('uploads/'.$logged_user->image)){
        File::delete('uploads/'.$logged_user->image);

    }

    $logged_user->image = $fileName;
    $logged_user->save();

    return response([
        'msg' => 'Image Updated Successfully',
        'status'=>'success',
        'image'=>Auth::user()->image,
    ], 200);

    }



    //$fileName = time().'.'.$request->file->extension();  



    
  //  $request->file->move(public_path('uploads'), $fileName);

//    Storage::put($fileName, $contents, 'public');
  //  Storage::put('users/'.$fileName, File::get($request->file), 'public');







//   File::put('uploads/'.$fileName, File::get($request->file));
    
//     $logged_user = Auth::user();


//     if(File::exists('uploads/'.$logged_user->image)){
//         File::delete('uploads/'.$logged_user->image);

//     }

//     $logged_user->image = $fileName;
//     $logged_user->save();



  
}


}


