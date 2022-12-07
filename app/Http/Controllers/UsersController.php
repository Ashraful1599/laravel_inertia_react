<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use function Termwind\render;
use Illuminate\Support\Facades\Redirect;

class UsersController extends Controller
{
    public function create(){

      $users =   User::all();

        return Inertia::render('Admin/Users',[
            'users'=>$users,
        ]);
    }
    public function edit(Request $request){
        $user = User::where('id',$request->id)->first();
        return Inertia::render('Admin/UserEdit',[
            'user'=>$user,
        ]);
    }
    public function update(Request $request){
        $user = User::find($request->id);
        $user->name = $request->name;
        $user->lname = $request->lname;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->save();
        return Redirect::route('users')->with('success','User updated successfully');
    }
    public function destroy(Request $request){

        $user = User::find($request->id);
        $user->delete();
        return Redirect::back()->with('success','User deleted successfully');
    }

    public function user_index(){
        return Inertia::render('Admin/AddUser');
    }

    public function user_add(Request $request){


        $request->validate([
            'password'=>'required|confirmed',
            'name'=>'required',
            'lname'=>'required',
            'email' => 'required|string|email|max:255|unique:users',
            'role'=>'required'
        ]);


        $user = User::create([
            'name' => $request->name,
            'lname'=> $request->lname,
            'email' => $request->email,
            'role' => $request->role,
            'password'=> Hash::make($request->password),
        ]);

        return Redirect::route('users')->with('success','User updated successfully');
    }

}
