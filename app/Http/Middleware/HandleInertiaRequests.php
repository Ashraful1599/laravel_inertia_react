<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use App\Models\Category;
use Tightenco\Ziggy\Ziggy;
use Illuminate\Http\Request;
use Gloudemans\Shoppingcart\Facades\Cart;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
   // protected $rootView = 'app';


    public function rootView(Request $request)
    {

        if ($request->is('admin/*') || $request->is('dashboard/*') || $request->is('dashboard') || $request->is('admin')) {
        
          return 'admin';
        }
          return 'welcome';
    
      //  return parent::rootView($request);
    }





    /**
     * Determine the current asset version.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request)
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed[]
     */
    public function share(Request $request)
    {

        $cartItems = Cart::content();
        $subtotal = Cart::subtotal();
        $total = Cart::total();
        $count = Cart::count();

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'data' => $request->session()->get('data'),
                    'error' => $request->session()->get('error'),
                ];
            },
            'flashData'=>[
                'categories'=>Category::all('id','cat_name','cat_slug'),
                'cartItems'=> $cartItems,
                'subtotal'=> $subtotal,
                'total'=> $total,
                'count'=> $count,
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
