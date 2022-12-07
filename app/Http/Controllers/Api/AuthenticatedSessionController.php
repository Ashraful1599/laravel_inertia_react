<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Providers\RouteServiceProvider;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

    //  $request->session()->regenerate();

        //return redirect()->intended(RouteServiceProvider::HOME);


         $user = User::where('email', $request->email)->first();
 
        if($user){
            
            if($user->role == 1){
                $token = $user->createToken($request->email,['server:admin'])->plainTextToken;
            }else{
                $token = $user->createToken($request->email)->plainTextToken;
            }
      

            return response()->json([
                'status' => 200,
                'token'=> $token,
                'msg'=>"You have successfully logged",
                'username'=>$user->name,
                'email'=>$user->email,
                'role'=>$user->role,
                'image'=>$user->image,
    
            ]);
        }

 



    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
