<?php

namespace App\Http\Controllers;

use Exception;
use Stripe\Charge;
use Stripe\Stripe;
use App\Models\User;
use Inertia\Inertia;
use Stripe\Customer;
use App\Models\Order;
use App\Models\Payment;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use App\Models\OrderShipping;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Gloudemans\Shoppingcart\Facades\Cart;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
  
     return   Inertia::render('FrontEnd/OrderComplete',[
           // 'orderDetails'=>$orderDetails,
        ]);
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        if(Cart::count()<1){
            return Redirect::back()->with(['error'=>'The cart is empty!' ]);

        }


        $cart_items = Cart::content();  
        if(Auth::check()){
            $user_id = Auth::id(); 
        }else if($request->create_account){

            $request->validate(
                [
                'email'=>'required|unique:users,email',
                ],
                [
                    'required'=>"The email fiedl is required",
                    'unique'=> "The email already registered! Please login now"
                ]
            );

            $user_id = User::create([
                'name'=>$request->name,
                'lname'=>$request->lname,
                'email'=>$request->email,
                'password'=> Hash::make($request->password),
            ])->id;
        }

        $total = Cart::total();
        $total = str_replace( ',', '', $total );

        if($request->payment_method == 'stripe'){
            Stripe::setApiKey(config('app.STRIPE_SECRET')); 
            $existCustomer = Customer::all(["email" => $request->email]);
            if(empty($existCustomer->data)){
       
             $customer = Customer::create(array(
         
                     "address" => [
         
                             "line1" => $request->address1,
         
                             "postal_code" => $request->postcode,
         
                             "city" => $request->city,
         
                             "state" => $request->state,
         
                             "country" => $request->country,
         
                         ],
         
                     "email" => $request->email,
         
                     "name" => $request->name.' '.$request->lname,
         
                     "source" => $request->token_id,
         
                  ));
             $cus_id = $customer->id;
       
            }else{
             $cus_id = $existCustomer->data[0]->id;
            }
       
             $charge = null;
       

       
       
             try {
       
                 $charge = Charge::create ([
         
                     "amount" => $total * 100,
         
                     "currency" => "usd",
         
                     "customer" => $cus_id,
         
                     "description" => $request->note,
         
                     "shipping" => [
         
                       "name" => $request->ship_name.' '.$request->ship_lname,
       
                       "address" => [
         
                           "line1" => $request->ship_address1,
       
                           "postal_code" => $request->ship_postcode,
       
                           "city" => $request->ship_city,
       
                           "state" => $request->ship_state,
       
                           "country" => $request->ship_country,
       
                       ],
         
                     ]
         
             ]);
             } catch (Exception $e) {
                 $charge['error'] = $e->getMessage();
             }
        }


    //   if (!empty($charge) && $charge['status'] == 'succeeded') {
    //       return Redirect::back()->with('success','Payment completed.');
    //   } else {
    //       return Redirect::back()->with('error','Payment failed.');
    //   }

      
        


    //    dd($cart_items);
      $payment_id = Payment::create([
        'payment_method'=> $request->payment_method,
      ])->id;
    if($request->shipping_different){
        $shipping_id = OrderShipping::create([
            'ship_first_name'=> $request->ship_first_name,
            'ship_last_name'=> $request->ship_last_name,
            'ship_company_name'=> $request->ship_company_name,
            'ship_country'=> $request->ship_country,
            'ship_address1'=> $request->ship_address1,
            'ship_address2'=> $request->ship_address2,
            'ship_city'=> $request->ship_city,
            'ship_state'=> $request->ship_state,
            'ship_postcode'=> $request->ship_postcode,
            'ship_phone'=> $request->ship_phone,
      ])->id;
    }else{
        $shipping_id = OrderShipping::create([
            'ship_first_name'=> $request->first_name,
            'ship_last_name'=> $request->last_name,
            'ship_company_name'=> $request->company_name,
            'ship_country'=> $request->country,
            'ship_address1'=> $request->address1,
            'ship_address2'=> $request->address2,
            'ship_city'=> $request->city,
            'ship_state'=> $request->state,
            'ship_postcode'=> $request->postcode,
            'ship_phone'=> $request->phone,
      ])->id;
    }



      $order_id = Order::create([
            'user_id'=> $user_id,
            'payment_id'=> $payment_id,
            'order_shipping_id'=> $shipping_id,
            'shipping'=> $request->shipping,
            'order_note'=> $request->note,
            'total_qty'=> (float) str_replace(',', '', Cart::count()),
            'total_price'=> $total,
            'subtotal'=> (float) str_replace(',', '', Cart::subtotal()),
            'tax'=> (float) str_replace(',', '', Cart::tax()),
            'status'=> $request->status,
      ]);



      foreach($cart_items as $item){
        $order_product = OrderProduct::create([
            'product_id'=> $item->id,
            'product_name'=> $item->name,
            'order_id'=> $order_id->id,
            'qty'=> $item->qty,
            'attribute'=> json_encode($item->options->attr),
            'price'=> $item->price,
          ]);
      }
      $orderDetails = Order::find($order_id->id);
      $orderProductDetails = OrderProduct::where('order_id', $order_id->id)->get();

      Cart::destroy();

//   if (!empty($charge) && $charge['status'] == 'succeeded') {
//     return Redirect::back()->with('success','Payment completed.');
// } else {
//     return Redirect::back()->with('error','Payment failed.');
// }


      return Redirect::route('order.index')->with(['data'=>[$orderDetails,$orderProductDetails],'success'=>'The order has been successfully submitted!' ]);


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
