<?php

namespace App\Http\Controllers\Api;

use App\Models\Tag;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use GrahamCampbell\ResultType\Success;
use Illuminate\Support\Facades\Redirect;

class ProductController extends Controller
{


    public function index(){

            $products = Product::all();

            return   response()->json([
                'products'=> $products
            ],200);
    }

    public function create(){
        $categories = Category::all();
        $tags = Tag::all();
        return response([
            'categories'=> $categories,
            'tags'=> $tags,
        ],200);
    }

    public function store(Request $request){
        
        $request->validate([
            'name' => 'required',
            'description'=>'required',
            'cat_id'=>'required',
            'tag_id'=>'required',
         //   'image'=>['required', 'max:5000'],
            'price'=>'required',
            'status'=>'required',
            'fetured'=>'required',
        ]);


        if($request->file('image')){
            $file = $request->file('image');
            $ext = '.'.$file->getClientOriginalExtension();
            $fileName = str_replace($ext, '', $file->getClientOriginalName()); 
            $FileNameSlug = Str::slug($fileName);
            $FinalFileName = $FileNameSlug.'-'.time().$ext;
            File::put('uploads/'.$FinalFileName, File::get($file));
        }

        $product = Product::create([
            'name'=>$request->name,
            'slug'=>Str::slug($request->name),
            'description'=>$request->description,
            'cat_id'=>$request->cat_id,
            'tag_id'=>$request->tag_id,
            'image'=>$FinalFileName,
            'price'=>$request->price,
            'status'=>$request->status,
            'fetured'=>$request->fetured,
        ]);
       
        return response([
            'msg' => 'Product inserted successfully',
            'status'=> 'success'
        ],200);

    }

    public function edit(Request $request){

        $data = Product::find($request->id);
        $categories = Category::all();
        $tags = Tag::all();
        return response([
            'categories'=> $categories,
            'tags'=> $tags,
            'product'=> $data,
        ],200);
    }

    public function update(Request $request){


        $product = Product::find($request->id);

        if($request->file('image')){
            $file = $request->file('image');
            $ext = '.'.$file->getClientOriginalExtension();
            $fileName = str_replace($ext, '', $file->getClientOriginalName());
     
            $FileNameSlug = Str::slug($fileName);
            $FinalFileName = $FileNameSlug.'-'.time().$ext;

            if(File::exists('uploads/'.$product->image)){
                File::delete('uploads/'.$product->image);
            }
    
            File::put('uploads/'.$FinalFileName, File::get($request->image));
        }else{
            $FinalFileName = $request->image;
        }
        
        if($request->slug == ""){
            $product_slug = Str::slug($request->name);
        }else{
            $product_slug = $request->slug;
        }


        $product->name = $request->name;
        $product->slug = $product_slug;
        $product->description = $request->description;
        $product->cat_id = $request->cat_id;
        $product->tag_id = $request->tag_id;
        $product->image = $FinalFileName;
        $product->price = $request->price;
        $product->status = $request->status;
        $product->fetured = $request->fetured;

        $product->save();


        return response([
            'msg' => 'Product updated successfully',
            'status'=> 'success',
        ],200);

    }

    public function destroy(Request $request){


        $selectedRows = $request->ids;
        $arrayids = explode(",", $selectedRows);

        if (is_array($arrayids)) 
        {
            Product::destroy($arrayids);
        }
        else
        {
            Product::findOrFail($arrayids)->delete();
        }




      $products = Product::all();

      return response([
          'msg' => 'Tag deleted successfully',
          'status'=> 'success',
          'products'=> $products,
      ],200);



    }



}
