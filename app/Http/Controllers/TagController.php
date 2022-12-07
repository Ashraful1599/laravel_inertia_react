<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tags = Tag::all();
        return  Inertia::render('Admin/TagIndex',[
            'tags'=> $tags,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/TagCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tags = Tag::create([
            'tag_name' => $request->tag_name,
            'tag_des' => $request->tag_des,
            'tag_slug' => Str::slug($request->tag_name),
        ]);

        return Redirect::route('tag')->with('success',"Tag insert successfully");
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
   
        $tag = Tag::find($request->id);
        return Inertia::render('Admin/TagEdit',[
            'tag'=>$tag,
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
        $tag = Tag::find($request->id);
        $tag->tag_name = $request->tag_name;
        $tag->tag_des = $request->tag_des;
        $tag->tag_slug = $request->tag_slug;
        $tag->save();
        return Redirect::route('tag');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $tag = Tag::find($request->id);
        $tag->delete();
        return Redirect::route('tag.create');
    }
}
