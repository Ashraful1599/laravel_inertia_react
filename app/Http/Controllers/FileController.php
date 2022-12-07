<?php

namespace App\Http\Controllers;

use App\Models\File as FileModel;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\File;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $files = FileModel::all();
        return Inertia::render('Admin/FileIndex',[
            'files'=> $files,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        return Inertia::render('Admin/FileCreate',[

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

        foreach($request->file as $file){
            if($file){
                $ext = '.'.$file->getClientOriginalExtension();
                $fileName = str_replace($ext, '', $file->getClientOriginalName()); 
                $FileNameSlug = Str::slug($fileName);
                $FinalFileName = $FileNameSlug.'-'.time().$ext;
                File::put('uploads/'.$FinalFileName, File::get($file));

                $filetbl = FileModel::create([
                    'name'=>$fileName,
                    'slug'=>$FinalFileName,
                ]);
            }
        }

        return Redirect::route('file')->with('success', 'Product inserted successfully');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */
    public function show(File $file)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        return Inertia::render('Admin/FileEdit',[
            'file_id' => $request->id
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, File $file)
    {


        if($request->file){
            $file = $request->file[0];
            $ext = '.'.$file->getClientOriginalExtension();
            $fileName = str_replace($ext, '', $file->getClientOriginalName()); 
            $FileNameSlug = Str::slug($fileName);
            $FinalFileName = $FileNameSlug.'-'.time().$ext;
            File::put('uploads/'.$FinalFileName, File::get($file));

            $file_id = FileModel::find($request->id);

            $file_id->name = $fileName;
            $file_id->slug = $FinalFileName;
            $file_id->save();

            return Redirect::route('file')->with('success', 'Product inserted successfully');
        }


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\File  $file
     * @return \Illuminate\Http\Response
     */    
    
    public function destroy(Request $request)
    {
        $selectedRows = $request->ids;
        $arrayids = explode(",", $selectedRows);

    //use this if there is no media so just delete multiple row using commented code
      // if (is_array($arrayids)) 
      // {
      //     FileModel::destroy($arrayids);
      // }
      // else
      // {
      //     FileModel::findOrFail($arrayids)->delete();
      // }

      $files = FileModel::find($arrayids);

      foreach($files as $file){
          File::delete('uploads/'.$file->slug);
          $file->delete();
      }
        return Redirect::route('file')->with('success', 'File deleted successfully');
    }
}


