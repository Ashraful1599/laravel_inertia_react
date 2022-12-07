<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use App\Models\File as ModelsFile;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;

class CategoryController extends Controller
{


    public function index(){

        $categories = Category::all();

     return   Inertia::render('Admin/CatIndex',[
            'categories' => $categories,
        ]);
    }

    public function create(){
        return Inertia::render('Admin/CatAdd');
    }

    public function store(Request $request){

        $file = $request->file('image');
        
        if($file){
            $ext = '.'.$file->getClientOriginalExtension();
            $fileName = str_replace($ext, '', $file->getClientOriginalName()); 
            $FileNameSlug = Str::slug($fileName);
            $FinalFileName = $FileNameSlug.'-'.time().$ext;
            File::put('uploads/'.$FinalFileName, File::get($file));

            $filetbl = ModelsFile::create([
                'name'=>$fileName,
                'slug'=>$FinalFileName,
            ])->id;
        }

        $category = Category::create([
            'cat_name' => $request->cat_name,
            'cat_slug' => Str::slug($request->cat_name),
            'cat_des' => $request->cat_des,
            'file_id' => $filetbl,
        ]);

       
        return Redirect::route('cat')->with('success','User updated successfully'); 

    }

    public function edit(Request $request){

        $cat_data = Category::find($request->id);
        return Inertia::render('Admin/CatEdit',[
            'cat_data' => $cat_data
        ]);
    }

    public function update(Request $request){


        $cat_data = Category::find($request->id);
        $file = $request->file('image');
        
        if($file){
            $ext = '.'.$file->getClientOriginalExtension();
            $fileName = str_replace($ext, '', $file->getClientOriginalName()); 
            $FileNameSlug = Str::slug($fileName);
            $FinalFileName = $FileNameSlug.'-'.time().$ext;
            File::put('uploads/'.$FinalFileName, File::get($file));

            $filetbl = ModelsFile::create([
                'name'=>$fileName,
                'slug'=>$FinalFileName, 
            ])->id;

            $cat_data->file_id = $filetbl;
        }


        $cat_data->cat_name = $request->cat_name;
        $cat_data->cat_slug = $request->cat_slug;
        $cat_data->cat_des = $request->cat_des;
        $cat_data->save();

        return Redirect::route('cat')->with('success','User updated successfully'); 

    }

    public function destroy(Request $request){
        $cat_id = Category::find($request->id);
        $cat_id->delete();


        // $categories = Category::all();

        // return   Inertia::render('Admin/CatIndex',[
        //        'categories' => $categories,
        //    ]);
        
        return Redirect::route('cat.create')->with('success','Category updated successfully'); 
    }



}
