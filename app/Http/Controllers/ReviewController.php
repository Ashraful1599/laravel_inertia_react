<?php

namespace App\Http\Controllers;

use App\Models\Term; 
use Inertia\Inertia;
use App\Models\Attribute;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() 
    {
        $reviews = Review::all();
        return  Inertia::render('Admin/Review/Index',[
            'reviews'=> $reviews,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $attribute = Product::all();
        return Inertia::render('Admin/Review/Create',[
            'product'=>$attribute,
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
        $tags = Review::create([
            'review' => $request->review,
            'rating' => $request->rating,
            'product_id' => $request->product_id,
            'user_id' => '1',
        ]);

        return Redirect::route('review')->with('success',"Attribute insert successfully");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function show(Term $term)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Term $term)
    {
        $attribute = Product::all();
        $review = Review::find($request->id);
        return Inertia::render('Admin/Review/Edit',[
            'review'=>$review,
            'products'=>$attribute,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Term $term)
    {
       // dd($request);
        $tag = Review::find($request->id);
        $tag->review = $request->review;
        $tag->rating = $request->rating;
        $tag->product_id = $request->product_id;
        $tag->user_id = 1;
        $tag->save();
        return Redirect::route('review');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $selectedRows = $request->ids;
        $arrayids = explode(",", $selectedRows);

   // use this if there is no media so just delete multiple row using commented code
      if (is_array($arrayids)) 
      {
        Review::destroy($arrayids);
      }
      else
      {
        Review::findOrFail($arrayids)->delete();
      }

        return Redirect::route('review')->with('success', 'Attribute deleted successfully');
    }
}
