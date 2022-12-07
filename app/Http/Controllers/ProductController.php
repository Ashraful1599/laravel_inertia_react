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
use App\Models\ProductTag;
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

           //   dd($request->variable);
        
        $request->validate([
            'name' => 'required',
        //    'slug' => 'required | unique:products, slug',
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



        if($request->product_type == 'simple'){

        $product_id = Product::create([
            'name'=>$request->name,
            'slug'=>Str::slug($request->name),
            'description'=>$request->description,
            'cat_id'=>$request->cat_id,
           // 'tag_id'=>1,
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

       // dd($request->variable);

        $product_id = Product::create([
            'name'=>$request->name,
            'slug'=>Str::slug($request->name),
            'description'=>$request->description,
            'cat_id'=>$request->cat_id,
        //    'tag_id'=>$tag_ids,
            'image'=>$FinalFileName,
            'image2'=>$FinalFileName2,
            'gallery'=>json_encode($galleryArray),
          //  'regular_price'=>$request->regular_price,
        //    'offer_price'=>$request->offer_price,
            'status'=>$request->status,
            'fetured'=>$request->fetured,
         //   'sku'=>$request->sku,
            'promo1'=>$request->promo1,
            'promo2'=>$request->promo2,
            'product_type'=>$request->product_type,
            'tax_class'=>$request->tax_class,
            'variable'=>json_encode($request->variable),
        ])->id;


        $i = 0;
        foreach($request->variable as $varkey => $var){ 
            
            if($var['sku'] == null){
                $getsku = $product_id."-".$i+1;
            }else{
                $getsku = $var['sku'];
            }
            //loop 4 times
            $sku_id = Sku::create([
                'product_id'=>$product_id,
                'sku'=> $getsku,
                'price'=> $var['price'],
                'qty'=>1,
            ])->id;

           $k = 0;
           //reomved price and sku from array
           unset($var['price']);
           unset($var['sku']);

        foreach($var as $key=>$avar){  //loop 2 times  //loop 2 times

            if(!$avar == null){

              $attr = Attribute::where('name',$key)->first();

              $attr_id = Variant::where('product_id', $product_id)->where('attribute_id', $attr->id)->first();
              
              if(!$attr_id){
                $variant_id = Variant::create([
                    'product_id'=>$product_id,
                    'attribute_id'=>$attr->id,
                ])->id;
                }else{
                    $variant_id  = $attr_id->id;
                }
    
            $k++;
           }
        }       


        foreach($var as $key=>$avar){  //loop 2 times

                if(!$avar == null){
                 $attr = Attribute::where('name',$key)->first();

               $variant_id = Variant::where('product_id', $product_id)->where('attribute_id', $attr->id)->first();
               $var_id = Variant_option::where('product_id', $product_id)->where('variant_id', $variant_id->id)->where('term_id', $avar)->first(); 
               if(!$var_id){
                $variant_option_id = Variant_option::create([
                    'product_id'=>$product_id,
                    'variant_id'=>$variant_id->id,
                    'term_id'=>$avar,
                ])->id;
               }else{
                $variant_option_id  = $var_id->id;
              }
 
               $skutb_id = Sku_value::create([
                    'product_id'=>$product_id,
                    'variant_id'=>$variant_id->id,
                    'variant_option_id'=>$variant_option_id,
                    'sku_id'=>$sku_id,

                ]);

            }
            };
    

         $i++;

         }


    }


    foreach($request->tag_id as $tag_id){
        ProductTag::create([
            'product_id'=> $product_id,
            'tag_id'=>$tag_id['value'],
        ]);
    }

        return Redirect::route('product')->with('success', 'Product inserted successfully');

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Product $product)
    {
        $product_by_slug = Product::where('slug',$request->slug)->first();
     //   dd($product_by_slug->product_type);
        $product_id = $product_by_slug->id;

//dd($product_by_id);

        $productCollection = new ProductResource($product_by_slug);
      //  $var_products = Sku::with('var_products')->get();
       // dd($product_by_slug->tag[0]);
      //   $next = Product::where('id', '>', $request->id)->firstOrFail();
      //   $previous = Product::where('id', '<', $request->id)->firstOrFail();
            $previous = Product::where('id', '<', $product_id)->orderBy('id','desc')->get(['id','slug','name','image'])->first();
            $next = Product::where('id', '>', $product_id)->orderBy('id','asc')->get(['id','slug','name','image'])->first();
            $first_product_tag = ProductTag::where('tag_id','=',$product_by_slug->tag[0]->id)->where('product_id','!=',$product_id)->get();
            $related_prod_arr = [];
            foreach($first_product_tag as $tag){
                array_push($related_prod_arr, $tag->product_id);
            }
            $related = Product::findMany($related_prod_arr);

      //  dd($related);
       $terms = null;
       if($product_by_slug->product_type == 'variable'){
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
        $skus = Sku::where('product_id','=',$request->id)->with('var_products')->get();
      //  dd($skus);
        //->with('var_products');
        return Inertia::render('Admin/ProductEdit',[
            'categories'=> $categories,
            'tags'=> $tags,
            'terms'=> $terms,
            'attributes'=> $attributes,
            'product'=> $product,
            'skus'=>$skus
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
        //dd($request);
        $product = Product::find($request->id);
        $product_id = $product->id;
        
        $request->validate([
            'name' => 'required',
        //    'slug' => 'required | unique:products, slug',
            'description'=>'required',
       //     'cat_id'=>'required',
        //    'tag_id'=>'required',
        //    'image'=>['required', 'max:5000'],
         //   'regular_price'=>'required',
        //    'status'=>'required',
        //    'fetured'=>'required',
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


        if($request->product_type == 'simple'){

              //  $product->slug = null;
                $product->name = $request->name;
                $product->slug = $request->slug;
                $product->description = $request->description;
                $product->cat_id = $request->cat_id;
            //  $product->tag_id = $request->tag_id;
                if($request->file('image')){
                    $product->image = $FinalFileName;
                }          
                
                if($request->file('image2')){
                    $product->image2 = $FinalFileName2;
                }
 
                if($request->file('gallery')){
                    $product->gallery = json_encode($galleryArray);
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
                $product->variable = json_encode($request->variable);

                $product->save();


       // dd($product);

    }else if($request->product_type == 'variable'){

       // dd($request->variable);


       $product->name = $request->name;
       $product->slug = $request->slug;
       $product->description = $request->description;
       $product->cat_id = $request->cat_id;
   //  $product->tag_id = $request->tag_id;
       if($request->file('image')){
           $product->image = $FinalFileName;
       }          
       
       if($request->file('image2')){
           $product->image2 = $FinalFileName2;
       }

       if($request->file('gallery')){
           $product->gallery = json_encode($galleryArray);
       }

    //   $product->regular_price = $request->regular_price;
    //   $product->offer_price = $request->offer_price;
       $product->status = $request->status;
       $product->fetured = $request->fetured;
    //   $product->sku = $request->sku;
       $product->promo1 = $request->promo1;
       $product->promo2 = $request->promo2;
       $product->product_type = $request->product_type;
       $product->tax_class = $request->tax_class;
       $product->variable = json_encode($request->variable);

       $product->save();

       

       $sku_ids = Sku::where('product_id', $product_id)->get();
       Sku::destroy($sku_ids);

       $Sku_value = Sku_value::where('product_id', $product_id)->get();
       Sku_value::destroy($Sku_value);       
       
       $var_ids = Variant::where('product_id', $product_id)->get();
       Variant::destroy($var_ids);  

       $Variant_option = Variant_option::where('product_id', $product_id)->get();
       Variant_option::destroy($Variant_option);       
       


        $i = 0;
        foreach($request->variable as $varkey => $var){ 
            
            if($var['sku'] == null){
                $getsku = $product_id."-".$i+1;
            }else{
                $getsku = $var['sku'];
            }
            //loop 4 times
            $sku_id = Sku::create([
                'product_id'=>$product_id,
                'sku'=> $getsku,
                'price'=> $var['price'],
                'qty'=>1,
            ])->id;

           $k = 0;
           //reomved price and sku from array
           unset($var['price']);
           unset($var['sku']);

        foreach($var as $key=>$avar){  //loop 2 times  //loop 2 times

            if(!$avar == null){

              $attr = Attribute::where('name',$key)->first();

              $attr_id = Variant::where('product_id', $product_id)->where('attribute_id', $attr->id)->first();
              
              if(!$attr_id){
                $variant_id = Variant::create([
                    'product_id'=>$product_id,
                    'attribute_id'=>$attr->id,
                ])->id;
                }else{
                    $variant_id  = $attr_id->id;
                }
    
            $k++;
           }
        }       


        foreach($var as $key=>$avar){  //loop 2 times

                if(!$avar == null){
                 $attr = Attribute::where('name',$key)->first();

               $variant_id = Variant::where('product_id', $product_id)->where('attribute_id', $attr->id)->first();
               $var_id = Variant_option::where('product_id', $product_id)->where('variant_id', $variant_id->id)->where('term_id', $avar)->first(); 
               if(!$var_id){
                $variant_option_id = Variant_option::create([
                    'product_id'=>$product_id,
                    'variant_id'=>$variant_id->id,
                    'term_id'=>$avar,
                ])->id;
               }else{
                $variant_option_id  = $var_id->id;
              }
 
               $skutb_id = Sku_value::create([
                    'product_id'=>$product_id,
                    'variant_id'=>$variant_id->id,
                    'variant_option_id'=>$variant_option_id,
                    'sku_id'=>$sku_id,

                ]);

            }
            };
    

         $i++;

         }


    }


    $ProductTag = ProductTag::where('product_id', $product_id)->get();
    ProductTag::destroy($ProductTag);
    
    foreach($request->tag_id as $tag_id){
        ProductTag::create([
            'product_id'=> $product_id,
            'tag_id'=>$tag_id['value'],
        ]);
    }

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
     //   dd($newPost->id);

     $copyTags = ProductTag::where('product_id',$request->id)->get();
    // dd($copyTags);

        foreach($copyTags as $tag_id){
            ProductTag::create([
                'product_id'=> $newPost->id,
                'tag_id'=>$tag_id->tag_id,
            ]);
        }


        // if($post->product_type == 'variable'){
        //     $copysku = Sku::where('product_id',$request->id)->get();
        //     foreach($copysku as $tag_id){
        //         Sku::create([
        //             'product_id'=> $newPost->id,
        //             'sku'=> $tag_id->sku,
        //             'price'=>$tag_id->price,
        //             'qty'=>$tag_id->qty,
        //         ]);
        //     }            
            
        //     $copysku = Variant::where('product_id',$request->id)->get();
        //     foreach($copysku as $tag_id){
        //         Variant::create([
        //             'product_id'=> $newPost->id,
        //             'attribute_id'=>$tag_id->attribute_id,
        //         ]);
        //     }           
            
        //     $copysku = Variant_option::where('product_id',$request->id)->get();
        //     foreach($copysku as $tag_id){
        //         Variant_option::create([
        //             'product_id'=> $newPost->id,
        //             'variant_id'=>$tag_id->variant_id,
        //             'term_id'=>$tag_id->term_id,
        //         ]);
        //     }            
            
        //     $copysku = Sku_value::where('product_id',$request->id)->get();
        //     foreach($copysku as $tag_id){
        //         Sku_value::create([
        //             'product_id'=> $newPost->id,
        //             'variant_id'=>$tag_id->variant_id,
        //             'variant_option_id'=>$tag_id->variant_option_id,
        //             'sku_id'=>$tag_id->sku_id,
        //         ]);
        //     }

        // }

        return Redirect::route('product')->with('success', 'Product duplicated successfully');
    }

    public function search(Request $request){
     //   dd($request->search);
     if($request->search != " "){
        $products = Product::where('name', 'LIKE', "%$request->search%")->orderBy('name', 'desc')->take(10)->get();

// split on 1+ whitespace & ignore empty (eg. trailing space)
// $searchValues = preg_split('/\s+/', $request->search, -1, PREG_SPLIT_NO_EMPTY); 

// $products = Product::where(function ($q) use ($searchValues) {
//   foreach ($searchValues as $value) {
//     $q->orWhere('name', 'like', "%{$value}%");
//   }
// })->orderBy('name', 'desc')->take(10)->get();

//dd($products);

       if($products){
        return Redirect::back()->with(['data'=>['search'=> $products]]);
       }
     }
    }

    public function all(){
        $products = Product::all();
        return response([
            'products' => $products,
            'status'=> 'success'
        ],200);
       // return Redirect::back()->with(['data'=>['allprod'=> $products]]);
    }

}


