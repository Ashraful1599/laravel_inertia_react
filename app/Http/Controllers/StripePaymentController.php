<?php

namespace App\Http\Controllers;

use Exception;
use Stripe\Token;
use Stripe\Charge;
use Stripe\Stripe;
use Stripe\Customer;
use Stripe\StripeClient;
use Illuminate\Http\Request;
use Stripe\Exception\CardException;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;

class StripePaymentController extends Controller
{

    // public function stripe(){
    //     return view('stripe');
    // }
    


    // private $stripe;
    // public function __construct()
    // {
    //     $this->stripe = new StripeClient(config('stripe.api_keys.secret_key'));
    // }

    // public function payment(Request $request)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'fullName' => 'required',
    //         'cardNumber' => 'required',
    //         'month' => 'required',
    //         'year' => 'required',
    //         'cvv' => 'required'
    //     ]);

    //     if ($validator->fails()) {
    //         $request->session()->flash('danger', $validator->errors()->first());
    //         return response()->redirectTo('/');
    //     }

       
    //     if (!empty($token['error'])) {
    //         $request->session()->flash('danger', $token['error']);
    //         return response()->redirectTo('/');
    //     }
    //     if (empty($token['id'])) {
    //         $request->session()->flash('danger', 'Payment failed.');
    //         return response()->redirectTo('/');
    //     }

    //     $charge = $this->createCharge($token['id'], 2000);
    //     if (!empty($charge) && $charge['status'] == 'succeeded') {
    //         $request->session()->flash('success', 'Payment completed.');
    //     } else {
    //         $request->session()->flash('danger', 'Payment failed.');
    //     }
    //     return response()->redirectTo('/');
    // }

    // private function createToken($cardData)
    // {
    //     $token = null;
    //     try {
    //         $token = $this->stripe->tokens->create([
    //             'card' => [
    //                 'number' => $cardData['cardNumber'],
    //                 'exp_month' => $cardData['month'],
    //                 'exp_year' => $cardData['year'],
    //                 'cvc' => $cardData['cvv']
    //             ]
    //         ]);
    //     } catch (CardException $e) {
    //         $token['error'] = $e->getError()->message;
    //     } catch (Exception $e) {
    //         $token['error'] = $e->getMessage();
    //     }
    //     return $token;
    // }

    // private function createCharge($tokenId, $amount)
    // {
    //     $charge = null;
    //     try {
    //         $charge = $this->stripe->charges->create([
    //             'amount' => $amount,
    //             'currency' => 'usd',
    //             'source' => $tokenId,
    //             'description' => 'My first payment'
    //         ]);
    //     } catch (Exception $e) {
    //         $charge['error'] = $e->getMessage();
    //     }
    //     return $charge;
    // }






    public function stripePost(Request $request)
    {
   //     dd($request->all());

    //   $request->validate([
    //         'cardNumber' => 'required',
    //         'month' => 'required',
    //         'year' => 'required',
    //         'cvv' => 'required'
    //   ]);


        Stripe::setApiKey(env('STRIPE_SECRET'));

        // $token = $this->createToken($request);
        
        // if (!empty($token['error'])) {
        //     return Redirect::back()->with('error',$token['error']);
        // }
        // if (empty($token['id'])) {
        //     return Redirect::back()->with('error','Payment failed.');
        // }

    //  dd($request->token_id);

       $existCustomer = Customer::all(["email" => "smashrafulcsee@gmail.com"]);
       if(empty($existCustomer->data)){

        $customer = Customer::create(array(
    
                "address" => [
    
                        "line1" => "Khaddo boyra",
    
                        "postal_code" => "6700",
    
                        "city" => "Sirajganj",
    
                        "state" => "sg",
    
                        "country" => "BD",
    
                    ],
    
                "email" => "smashrafulcsee@gmail.com",
    
                "name" => "Ashraful Islam",
    
                "source" => $request->token_id,
    
             ));
        $cus_id = $customer->id;

       }else{
        $cus_id = $existCustomer->data[0]->id;
       }

        $charge = null;
        try {

            $charge = Charge::create ([
    
                "amount" => 50 * 100,
    
                "currency" => "usd",
    
                "customer" => $cus_id,
    
                "description" => "Test payment from expertoftech.com.",
    
                "shipping" => [
    
                  "name" => "Ashraful Islam",
    
                  "address" => [
    
                    "line1" => "Khaddo boyra",

                    "postal_code" => "6700",

                    "city" => "Sirajganj",

                    "state" => "sg",

                    "country" => "BD",

                ],
    
                ]
    
        ]);
        } catch (Exception $e) {
            $charge['error'] = $e->getMessage();
        }

        if (!empty($charge) && $charge['status'] == 'succeeded') {
            return Redirect::back()->with('success','Payment completed.');
        } else {
            return Redirect::back()->with('error','Payment failed.');
        }




    }

// private function createToken($cardData)
//     {
//         $token = null;
//         try {
//             $token = Token::create([
//                 'card' => [
//                     // 'number' => $cardData['cardNumber'],
//                     // 'exp_month' => $cardData['month'],
//                     // 'exp_year' => $cardData['year'],
//                     // 'cvc' => $cardData['cvv']                        
//                     'number' => '4242 4242 4242 4242',
//                     'exp_month' => '12',
//                     'exp_year' => '2026',
//                     'cvc' => '123'
//                 ]
//             ]);
//         } catch (CardException $e) {
//             $token['error'] = $e->getError()->message;
//         } catch (Exception $e) {
//             $token['error'] = $e->getMessage();
//         }
//   //      dd($token);
//         return $token;
//     }


}
