<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\CustomerDetails;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class CheckoutController extends Controller
{
    public function index(){

        if(Cart::count() < 1){
            return Redirect::route('cart.list');
        }

        $authId = Auth::id();
        $userById = "";
        $userDetails = "";
        if($authId){
            $userById = User::find($authId);
            $userDetails = CustomerDetails::where('user_id', $authId)->first();
        }

        $cartItems = Cart::content();
        $subtotal = Cart::subtotal();
        $tax = Cart::tax();
        $total = Cart::total();

        return Inertia::render('FrontEnd/Checkout',[
            'userById'=>$userById,
            'userDetails'=>$userDetails,
            'cartItems'=> $cartItems,
            'subtotal'=> $subtotal,
            'tax'=> $tax,
            'total'=> $total,
        ]);
    }
}
