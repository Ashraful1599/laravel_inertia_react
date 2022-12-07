<?php

namespace App\Http\Controllers\Api;

use Inertia\Inertia;
use App\Models\Tag;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use GrahamCampbell\ResultType\Success;
use Illuminate\Support\Facades\Redirect;

class TagController extends Controller
{


    public function index(){

            $categories = Tag::all();

            return   response([
                'tags'=> $categories
            ],200);
    }

    public function create(){
        return Inertia::render('Admin/CatAdd');
    }

    public function store(Request $request){
        
        $category = Tag::create([
            'tag_name' => $request->tag_name,
            'tag_slug' => Str::slug($request->tag_name),
            'tag_des' => $request->tag_des,
        ]);

       
        return response([
            'msg' => 'Category inserted successfully',
            'status'=> 'success'
        ],200);

    }

    public function edit(Request $request){

        $cat_data = Tag::find($request->id);
        return response([
            'tags'=> $cat_data,
        ],200);
    }

    public function update(Request $request){
        $cat_data = Tag::find($request->id);
        $cat_data->tag_name = $request->tag_name;
        $cat_data->tag_slug = $request->tag_slug;
        $cat_data->tag_des = $request->tag_des;
        $cat_data->save();

        return response([
            'msg' => 'Category updated successfully',
            'status'=> 'success',
        ],200);

    }

    public function destroy(Request $request){


        $selectedRows = $request->ids;
        $arrayids = explode(",", $selectedRows);

        if (is_array($arrayids)) 
        {
            Tag::destroy($arrayids);
        }
        else
        {
            Tag::findOrFail($arrayids)->delete();
        }




      $categories = Tag::all();

      return response([
          'msg' => 'Tag deleted successfully',
          'status'=> 'success',
          'tags'=> $categories,
      ],200);



    }



}
