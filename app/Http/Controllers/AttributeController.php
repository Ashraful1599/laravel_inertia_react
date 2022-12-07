<?php

namespace App\Http\Controllers;

use App\Http\Resources\AttributeResource;
use App\Models\Tag;
use Inertia\Inertia;
use App\Models\Attribute;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class AttributeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $attributes = Attribute::with('terms:id,attribute_id,name')->get();
     //   $attributes = Attribute::all();

        return  Inertia::render('Admin/Attribute/Index',[
            'attributes'=> $attributes,
        ]);
    } 

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/AttributeCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tags = Attribute::create([
            'name' => $request->name,
            'des' => $request->des,
            'slug' => Str::slug($request->name),
        ]);

        return Redirect::route('attribute')->with('success',"Attribute insert successfully");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function show(Tag $tag)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Tag $tag)
    {
   
        $tag = Attribute::find($request->id);
        return Inertia::render('Admin/AttributeEdit',[
            'attribute'=>$tag,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tag $tag)
    {
       // dd($request);
        $tag = Attribute::find($request->id);
        $tag->name = $request->name;
        $tag->des = $request->des;
        $tag->slug = $request->slug;
        $tag->save();
        return Redirect::route('attribute');
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
        Attribute::destroy($arrayids);
      }
      else
      {
        Attribute::findOrFail($arrayids)->delete();
      }

        return Redirect::route('attribute')->with('success', 'Attribute deleted successfully');
    }
}
