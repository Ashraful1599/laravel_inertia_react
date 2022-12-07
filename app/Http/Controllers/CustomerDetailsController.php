<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\CustomerDetails;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Order;
use Illuminate\Support\Facades\Redirect;

class CustomerDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function register(){
       return Inertia::render('FrontEnd/Register',[

       ]);
    }    
    
    public function login(){
       return Inertia::render('FrontEnd/Login',[

       ]);
    }

    public function store(Request $request){
    
        $validate = $request->validate([
            'name' => 'required',
            'lname' => 'required',
            'email' => 'required | unique:users',
            'password' => 'required',
        ]);

     $userId = User::create([
            'name'=>$request->name,
            'lname'=>$request->lname,
            'email'=>$request->email,
            'password'=> Hash::make($request->password),
        ])->id;
//dd($userId);
        CustomerDetails::create([
            'user_id'=> $userId,
        ]);

    return Redirect::route('user.login')->with('success', 'You have successfully registered!');

    }

    public function loginCheck(LoginRequest $request){
      //  dd($request);
        $request->authenticate();

        $request->session()->regenerate();

        return Redirect::route('user.account')->with('success', 'You have successfully logged!');
    }

    public function myAccount(Request $request){
        $authId = Auth::user()->id;
        $userById = User::find($authId);
        $userDetails = CustomerDetails::where('user_id', $authId)->first();
        $orderDetails = Order::where('user_id', $authId)->get();
        return Inertia::render('FrontEnd/MyAccount',[
            'userDetails'=>$userDetails,
            'orderDetails'=>$orderDetails,
        ]);
    }



   public function update(Request $request){

    $authId = Auth::user()->id;
    $userById = User::find($authId);
    $inputpassword = $request->password;

    $request->validate([
        'password' => ['nullable', function ($attr, $inputpassword, $validation) use ($userById) {
            if (!Hash::check($inputpassword, $userById->password)) {
                return $validation(__('The current password is incorrect.'));
            }
        }],
    ]);

        if($request->password){
                $userById->password = Hash::make($request->new_password);
                $userById->save();

        }



    $userDetails = CustomerDetails::where('user_id', $authId)->first();

    $userDetails->company_name = $request->company_name;
    $userDetails->country = $request->country;
    $userDetails->address1 = $request->address1;
    $userDetails->address2 = $request->address2;
    $userDetails->city = $request->city;
    $userDetails->state = $request->state;
    $userDetails->postcode = $request->postcode;
    $userDetails->phone = $request->phone;
    $userDetails->ship_first_name = $request->ship_first_name;
    $userDetails->ship_last_name = $request->ship_last_name;
    $userDetails->ship_company_name = $request->ship_company_name;
    $userDetails->ship_country = $request->ship_country;
    $userDetails->ship_address1 = $request->ship_address1;
    $userDetails->ship_address2 = $request->ship_address2;
    $userDetails->ship_city = $request->ship_city;
    $userDetails->ship_state = $request->ship_state;
    $userDetails->ship_postcode = $request->ship_postcode;
    $userDetails->ship_phone = $request->ship_phone;
    $userDetails->save();

    return Redirect::back()->with('success', 'You have successfully updated!');

    }





    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/login');
    }
}
