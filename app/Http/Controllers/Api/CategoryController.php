<?php

namespace App\Http\Controllers\Api;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use GrahamCampbell\ResultType\Success;
use Illuminate\Support\Facades\Redirect;

class CategoryController extends Controller
{


    public function index(){

            $categories = Category::all();

            return   response([
                'categories'=> $categories
            ],200);
    }

    public function create(){
        return Inertia::render('Admin/CatAdd');
    }

    public function store(Request $request){
        
        $category = Category::create([
            'cat_name' => $request->cat_name,
            'cat_slug' => Str::slug($request->cat_name),
            'cat_des' => $request->cat_des,
        ]);

       
        return response([
            'msg' => 'Category inserted successfully',
            'status'=> 'success'
        ],200);

    }

    public function edit(Request $request){

        $cat_data = Category::find($request->id);
        return response([
            'categories'=> $cat_data,
        ],200);
    }

    public function update(Request $request){
        $cat_data = Category::find($request->id);
        $cat_data->cat_name = $request->cat_name;
        $cat_data->cat_slug = $request->cat_slug;
        $cat_data->cat_des = $request->cat_des;
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
            Category::destroy($arrayids);
        }
        else
        {
            Category::findOrFail($arrayids)->delete();
        }




      $categories = Category::all();

      return response([
          'msg' => 'Category deleted successfully',
          'status'=> 'success',
          'categories'=> $categories,
      ],200);



    }



}
