<?php

namespace App\Http\Controllers;

use App\Models\Sku;
use App\Models\Tag;
use App\Models\Term;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\Attribute;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use GuzzleHttp\Handler\Proxy;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use App\Http\Resources\ProductResource;
use App\Models\Sku_value;
use App\Models\Variant;
use App\Models\Variant_option;
use Illuminate\Support\Facades\Redirect;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
      //   dd($products);
        // foreach( $products as $product){
        //     dd($product->category->cat_name);
        // }
     //   dd($products);
        return  Inertia::render('Admin/ProductIndex',[
            'products'=> $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::all();
        $terms = Term::all();
        $attributes = Attribute::with('terms:id,attribute_id,name')->get();
        $tags = Tag::all();
        return Inertia::render('Admin/ProductCreate',[
            'categories'=> $categories,
            'tags'=> $tags,
            'terms'=> $terms,
            'attributes'=> $attributes,
        ]); 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $request->validate([
            'name' => 'required',
            'description'=>'required',
            'cat_id'=>'required',
            'tag_id'=>'required',
            'image'=>['required', 'max:5000'],
         //   'regular_price'=>'required',
            'status'=>'required',
            'fetured'=>'required',
        ]);

        $FinalFileName2 = '';
        $FinalFileName = '';
        $galleryArray = [];

        if($request->file('image2')){
            $file = $request->file('image2');
            $ext = '.'.$file->getClientOriginalExtension();
            $fileName = str_replace($ext, '', $file->getClientOriginalName()); 
            $FileNameSlug = Str::slug($fileName);
            $FinalFileName2 = $FileNameSlug.'-'.time().$ext;
            File::put('uploads/'.$FinalFileName2, File::get($file));
        }        
        

        if($request->file('image')){
            $file = $request->file('image');
            $ext = '.'.$file->getClientOriginalExtension();
            $fileName = str_replace($ext, '', $file->getClientOriginalName()); 
            $FileNameSlug = Str::slug($fileName);
            $FinalFileName = $FileNameSlug.'-'.time().$ext;
            File::put('uploads/'.$FinalFileName, File::get($file));
        }        
        

        if($request->file('gallery')){
            $gallery = $request->file('gallery');

            $galleryArray = [];
            foreach($gallery as $file){
                
                $ext = '.'.$file->getClientOriginalExtension();
                $fileName = str_replace($ext, '', $file->getClientOriginalName()); 
                $FileNameSlug = Str::slug($fileName);
                $FinalFileName = $FileNameSlug.'-'.time().$ext;
                File::put('uploads/'.$FinalFileName, File::get($file));
                array_push($galleryArray, $FinalFileName);
            }
        }



// dd($variable);

        if($request->product_type == 'simple'){

        $product = Product::create([
            'name'=>$request->name,
            'slug'=>Str::slug($request->name),
            'description'=>$request->description,
            'cat_id'=>$request->cat_id,
            'tag_id'=>$request->tag_id,
            'image'=>$FinalFileName,
            'image2'=>$FinalFileName2,
            'gallery'=>json_encode($galleryArray),
            'regular_price'=>$request->regular_price,
            'offer_price'=>$request->offer_price,
            'status'=>$request->status,
            'fetured'=>$request->fetured,
            'sku'=>$request->sku,
            'promo1'=>$request->promo1,
            'promo2'=>$request->promo2,
            'product_type'=>$request->product_type,
            'tax_class'=>$request->tax_class,
            'variable'=>json_encode($request->variable),
        ])->id;

       // dd($product);

    }else if($request->product_type == 'variable'){

        // $product_id = Product::create([
        //     'name'=>$request->name,
        //     'slug'=>Str::slug($request->name),
        //     'description'=>$request->description,
        //     'cat_id'=>$request->cat_id,
        //     'tag_id'=>$request->tag_id,
        //     'image'=>$FinalFileName,
        //     'image2'=>$FinalFileName2,
        //     'gallery'=>json_encode($galleryArray),
        //   //  'regular_price'=>$request->regular_price,
        // //    'offer_price'=>$request->offer_price,
        //     'status'=>$request->status,
        //     'fetured'=>$request->fetured,
        //  //   'sku'=>$request->sku,
        //     'promo1'=>$request->promo1,
        //     'promo2'=>$request->promo2,
        //     'product_type'=>$request->product_type,
        //     'tax_class'=>$request->tax_class,
        //     'variable'=>json_encode($request->variable),
        // ])->id;



        // $arrays = [
        //     0=> [1,2,3],
        //     1=> [1,2,3],
        //     2=> [1,2,3],
        // ];
        $arrays = $request->variable;
        $newAray = [];
        $sizeofArray = sizeof($arrays);
        for($i = 0; $i<$sizeofArray; $i++){
            $firstrowArray = [];
            foreach($arrays as $array){
                   $j  = 0;
                   foreach($array as $arr){
                       if($j == $i){
                           array_push($firstrowArray, $arr);
                       }
                       $j++;
                   }
               }
               array_push($newAray, $firstrowArray);
        }
          //  dd($newAray);
        //   $sizeofArray = sizeof($request->variable);
          //dd($request->variable);


        $i = 0;
        foreach($request->variable as $var){

        //   dd($var['sku']);
            // $sku_id = Sku::create([
            //     'product_id'=>$product_id,
            //     'sku'=> $var['sku'],
            //     'price'=> $var['price'],
            //     'qty'=>1,
            // ])->id;

            
            $var_values = array_values($var);
            array_splice($var_values, -2);

            $var_keys = array_keys($var);
            array_splice($var_keys, -2);
          //  dd($var_keys);
        //    foreach($var_keys as $var_key){
              $attr = Attribute::where('name',$var_keys[$i])->first();
              
                // $variant_id = Variant::create([
                //     'product_id'=>$product_id,
                //     'attribute_id'=>$attr->id,
                // ])->id;

             dd($var_values);
                           
            foreach($var_values as $var){
   
                // $variant_option_id = Variant_option::create([
                //     'product_id'=>$product_id,
                //     'variant_id'=>$variant_id,
                //     'term_id'=>$var,
                // ])->id;

            //    $skutb_id = Sku_value::create([
            //         'product_id'=>$product_id,
            //         'variant_id'=>$variant_id,
            //         'variant_option_id'=>$variant_option_id,
            //         'sku_id'=>$sku_id,

            //     ]);
            };

         //   }

         $i++;

         }


    }

     //   return Redirect::route('product')->with('success', 'Product inserted successfully');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Product $product)
    {
        $product_by_id = Product::find($request->id);

//dd($product_by_id);

        $productCollection = new ProductResource($product_by_id);
      //  $var_products = Sku::with('var_products')->get();
      //  dd($var_products);
      //   $next = Product::where('id', '>', $request->id)->firstOrFail();
      //   $previous = Product::where('id', '<', $request->id)->firstOrFail();
            $previous = Product::where('id', '<', $request->id)->orderBy('id','desc')->get(['id','name','image'])->first();
            $next = Product::where('id', '>', $request->id)->orderBy('id','asc')->get(['id','name','image'])->first();
            $related = Product::where('tag_id',$product_by_id->tag_id)->get();
       // dd($product);
       $terms = null;
       if($product_by_id->product_type == 'variable'){
           // $variable_decode = json_decode($product_by_id->variable);
            //dd($variable_decode);
            $terms = Term::all();
       }
        return Inertia::render('FrontEnd/ProductView',[
            'productCollection'=>$productCollection,
            'nextProduct'=>$next,
            'prevProduct'=>$previous,
            'related'=>$related,
            'terms'=>$terms,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        $categories = Category::all();
        $terms = Term::all();
        $attributes = Attribute::with('terms:id,attribute_id,name')->get();
        $tags = Tag::all();
        $product = Product::find($request->id);
        return Inertia::render('Admin/ProductEdit',[
            'categories'=> $categories,
            'tags'=> $tags,
            'terms'=> $terms,
            'attributes'=> $attributes,
            'product'=> $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {

        $product = Product::find($request->id);

        $request->validate([
            'name' => 'required',
            'description'=>'required',
            'cat_id'=>'required',
            'tag_id'=>'required',
       //     'image'=>['required', 'max:5000'],
         //   'regular_price'=>'required',
            'status'=>'required',
            'fetured'=>'required',
        ]);

        $FinalFileName2 = $product->image2;
        $FinalFileName = $product->image;
        $galleryArray = [];

        if($request->file('image2')){
            $file = $request->file('image2');
            $ext = '.'.$file->getClientOriginalExtension();
            $fileName = str_replace($ext, '', $file->getClientOriginalName()); 
            $FileNameSlug = Str::slug($fileName);
            $FinalFileName2 = $FileNameSlug.'-'.time().$ext;
            File::put('uploads/'.$FinalFileName2, File::get($file));
        }        
        

        if($request->file('image')){
            $file = $request->file('image');
            $ext = '.'.$file->getClientOriginalExtension();
            $fileName = str_replace($ext, '', $file->getClientOriginalName()); 
            $FileNameSlug = Str::slug($fileName);
            $FinalFileName = $FileNameSlug.'-'.time().$ext;
            File::put('uploads/'.$FinalFileName, File::get($file));
        }        
        

        if($request->file('gallery')){
            $gallery = $request->file('gallery');

            $galleryArray = [];
            foreach($gallery as $file){
                
                $ext = '.'.$file->getClientOriginalExtension();
                $fileName = str_replace($ext, '', $file->getClientOriginalName()); 
                $FileNameSlug = Str::slug($fileName);
                $FinalFileName = $FileNameSlug.'-'.time().$ext;
                File::put('uploads/'.$FinalFileName, File::get($file));
                array_push($galleryArray, $FinalFileName);
            }



        }



        if($request->product_type == 'simple'){

            $product->name = $request->name;
            $product->slug = $request->slug;
            $product->description = $request->description;
            $product->cat_id = $request->cat_id;
            $product->tag_id = $request->tag_id;
            $product->image = $FinalFileName;
            $product->image2 = $FinalFileName2;
            $product->image2 = $FinalFileName2;
            if($request->file('gallery')){
                $product->gallery = json_encode($galleryArray);
            }else{
                $product->gallery =$galleryArray;
            }

            $product->regular_price = $request->regular_price;
            $product->offer_price = $request->offer_price;
            $product->status = $request->status;
            $product->fetured = $request->fetured;
            $product->sku = $request->sku;
            $product->promo1 = $request->promo1;
            $product->promo2 = $request->promo2;
            $product->product_type = $request->product_type;
            $product->tax_class = $request->tax_class;
           // $product->variable = json_encode($request->variable),
    
            $product->save();

    }else if($request->product_type == 'variable'){


        $product->name = $request->name;
        $product->slug = $request->slug;
        $product->description = $request->description;
        $product->cat_id = $request->cat_id;
        $product->tag_id = $request->tag_id;
        $product->image = $FinalFileName;
        $product->image2 = $FinalFileName2;
        $product->image2 = $FinalFileName2;
        if($request->file('gallery')){
            $product->gallery = json_encode($galleryArray);
        }else{
            $product->gallery =$galleryArray;
        }
      //  $product->price = $request->price;
        $product->status = $request->status;
        $product->fetured = $request->fetured;
        $product->sku = $request->sku;
        $product->promo1 = $request->promo1;
        $product->promo2 = $request->promo2;
        $product->product_type = $request->product_type;
        $product->tax_class = $request->tax_class;
        $product->variable = json_encode($request->variable);

        $product->save();




    }





        // if($request->file('image')){
        //     $ext = '.'.$request->image->getClientOriginalExtension();
        //     $fileName = str_replace($ext, '', $request->image->getClientOriginalName());
     
        //     $FileNameSlug = Str::slug($fileName);
        //     $FinalFileName = $FileNameSlug.'-'.time().$ext;

        //     if(File::exists('uploads/'.$product->image)){
        //         File::delete('uploads/'.$product->image);
        //     }
    
        //     File::put('uploads/'.$FinalFileName, File::get($request->image));
        // }else{
        //     $FinalFileName = $request->image;
        // }
        
        // if($request->slug == ""){
        //     $product_slug = Str::slug($request->name);
        // }else{
        //     $product_slug = $request->slug;
        // }

        return Redirect::route('product')->with('success', 'Product updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {

        $selectedRows = $request->ids;
        $arrayids = explode(",", $selectedRows);

   // use this if there is no media so just delete multiple row using commented code
      if (is_array($arrayids)) 
      {
        Product::destroy($arrayids);
      }
      else
      {
        Product::findOrFail($arrayids)->delete();
      }

        return Redirect::route('product')->with('success', 'Product deleted successfully');
    }

    public function duplicate(Request $request){
        $post = Product::find($request->id);
        $newPost = $post->replicate();
        $newPost->created_at = Carbon::now();
        $newPost->save();
        return Redirect::route('product')->with('success', 'Product duplicated successfully');
    }
}


