<?php

namespace App\Http\Controllers\Auth;


use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Validation\ValidationException;

class CurrentUserController extends Controller

{
    public function create(){

       // $user = Auth::user();

        return Inertia::render('Account/AccountProfile');
    }
    public function password_change(Request $request){
        $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        $logged_user = Auth::user();
        $logged_user->password = Hash::make($request->password);
        $logged_user->save();

   
      // redirect to another page
        //return Redirect::route('account-profile')->with('success', 'Password changed success');
        //redirect to same page 
        return Redirect::back()->with('success', 'Password changed success');

    }


    public function account_update(Request $request){

        $request->validate([
            'name'=>['required'],
            'lname'=>['required'],
            'email'=>['required'],
        ]);

        $logged_user = Auth::user();
        $logged_user->name = $request->name;
        $logged_user->lname = $request->lname;
        $logged_user->email = $request->email;
        $logged_user->save();

        return Redirect::back()->with('success', 'Account updated success');
    }

    public function account_img_update(Request $request){
  

        $request->validate([
            'file' =>['required']
        ]);
     //   dd($request->file);
        $fileName = time().'.'.$request->file->extension();  
        
      //  $request->file->move(public_path('uploads'), $fileName);

    //    Storage::put($fileName, $contents, 'public');
      //  Storage::put('users/'.$fileName, File::get($request->file), 'public');


      File::put('uploads/'.$fileName, File::get($request->file));
        
        $logged_user = Auth::user();


        if(File::exists('uploads/'.$logged_user->image)){
            File::delete('uploads/'.$logged_user->image);

        }

        $logged_user->image = $fileName;
        $logged_user->save();

        return Redirect::back()->with('success', 'Image updated');


      
    }

    public function imgupload(Request $request){


        if($request->file('file')){
            $ext = '.'.$request->file->getClientOriginalExtension();
            $fileName = str_replace($ext, '', $request->file->getClientOriginalName()); 
            $FileNameSlug = Str::slug($fileName);
            $FinalFileName = $FileNameSlug.'-'.time().$ext;
            File::put('uploads/'.$FinalFileName, File::get($request->file));

            return response()->json(['location'=> env('APP_URL')."/uploads/".$FinalFileName]); 
        }
    }


}


// return Inertia::render('Auth/Login', [
//     'canResetPassword' => Route::has('password.request'),
//     'status' => session('status'),
// ]);