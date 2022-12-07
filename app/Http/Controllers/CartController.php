<?php

namespace App\Http\Controllers;


use Inertia\Inertia;
use Illuminate\Http\Request;
use function Termwind\render;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Gloudemans\Shoppingcart\Facades\Cart;

class CartController extends Controller
{
    public function cartList()
    {
        if(Auth::check()){
            $loggedCart = DB::table('shoppingcart')->where('identifier',Auth::id())->first();
            if($loggedCart){
               // dd($loggedCart);
                $cartItems = unserialize($loggedCart->content);
                Cart::restore(Auth::id());
            }
        }

        $cartItems = Cart::content();
        $subtotal = Cart::subtotal();
        $total = Cart::total();

        return Inertia::render('FrontEnd/Cart',[
            'cartItems'=> $cartItems,
            'subtotal'=> $subtotal,
            'total'=> $total,
        ]);
    }


    public function addToCart(Request $request)
    {
       // dd($request->all());
       Cart::setGlobalTax(20);

       if($request->product_type != "variable"){
            $newPrice = str_replace('$',' ',$request->price);
         //   Cart::store('email');
            Cart::add([
                'id' => $request->id, 
                'name' => $request->name, 
                'qty' => $request->quantity, 
                'price' => $newPrice, 
                'image' => $request->image, 
                'weight'=>'00',
                'options' => ['image' => $request->image, 'slug'=>$request->slug]
            ]);
       }else{
        $newPrice = str_replace('$',' ',$request->var_price);
      //  Cart::store('email');
        Cart::add([
            'id' => $request->id, 
            'name' => $request->name, 
            'qty' => $request->quantity, 
            'price' => $newPrice, 
            'image' => $request->image, 
            'weight'=>'00',
            'options' => ['image' => $request->image, 'slug'=>$request->slug, 'attr'=>$request->attr_array]
        ]);


       }

    // Merge the contents of 'savedcart' into 'username'.
    if(Auth::check()){
        Cart::erase(Auth::id());
        Cart::store(Auth::id());
    }




        return Redirect::back()->with('success', 'Product is Added to Cart Successfully !');
    }

    public function updateCart(Request $request)
    {
  

      $cart = Cart::content()->where('rowId',$request->rowId);
      if($cart->isNotEmpty()){
        Cart::update($request->rowId, $request->qty);
      }
      if(Auth::check()){
        Cart::erase(Auth::id());
        Cart::store(Auth::id());
      }
        return Redirect::route('cart.list')->with('success', 'Item Cart is Updated Successfully !');
    }


    public function removeCart(Request $request)
    {
        $cart = Cart::content()->where('rowId',$request->rowId);
        if($cart->isNotEmpty()){
            Cart::remove($request->rowId);
        }
        if(Auth::check()){
            Cart::erase(Auth::id());
            Cart::store(Auth::id());
        }
        return Redirect::route('cart.list')->with('success', 'Item removed Successfully !');
    }

    public function clearAllCart()
    {
        Cart::clear();
        if(Auth::check()){
             Cart::erase(Auth::id());
        }

        session()->flash('success', 'All Item Cart Clear Successfully !');

        return redirect()->route('cart.list');
    }
}