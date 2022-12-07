<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;

class CategoryProductController extends Controller
{
    public function show(Request $request){
        $cat = Category::where('cat_slug', $request->slug)->first();
        $catProduct = Category::with('products')->withCount('products')->get();
        $products = Product::where('cat_id',$cat->id)->get();
    //    dd($products);
        $products =  ProductResource::collection($products);
        return Inertia::render('FrontEnd/Category',[
            'cat'=>$cat,
            'products'=>$products,
            'catProduct'=>$catProduct,
        ]);
    }
}
