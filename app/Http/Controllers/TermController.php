<?php

namespace App\Http\Controllers;

use App\Models\Term; 
use Inertia\Inertia;
use App\Models\Attribute;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TermController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() 
    {
        $tags = Term::all();
        return  Inertia::render('Admin/TermIndex',[
            'terms'=> $tags,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $attribute = Attribute::all();
        return Inertia::render('Admin/TermCreate',[
            'attribute'=>$attribute,
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
        $tags = Term::create([
            'name' => $request->name,
            'des' => $request->des,
            'attribute_id' => $request->attribute_id,
            'slug' => Str::slug($request->name),
        ]);

        return Redirect::route('term')->with('success',"Attribute insert successfully");
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
        $attribute = Attribute::all();
        $tag = Term::find($request->id);
        return Inertia::render('Admin/TermEdit',[
            'term'=>$tag,
            'attribute'=>$attribute,
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
        $tag = Term::find($request->id);
        $tag->name = $request->name;
        $tag->des = $request->des;
        $tag->slug = $request->slug;
        $tag->save();
        return Redirect::route('term');
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
        Term::destroy($arrayids);
      }
      else
      {
        Term::findOrFail($arrayids)->delete();
      }

        return Redirect::route('term')->with('success', 'Attribute deleted successfully');
    }
}
