<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;

class ShopController extends Controller
{
    public function index(Request $request){
   //     $cat = Category::where('cat_slug', $request->slug)->first();
        $catProduct = Category::with('products')->withCount('products')->get();
        $products = Product::all();
    //    dd($products);
        $products =  ProductResource::collection($products);
        return Inertia::render('FrontEnd/Shop',[
          //  'cat'=>$cat,
            'products'=>$products,
            'catProduct'=>$catProduct,
        ]);
    }
}
