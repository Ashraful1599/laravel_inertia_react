<?php

namespace App\Http\Controllers\Api;

use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\File as FileModel;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;

class ApiFileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $files = FileModel::all();
        return response()->json([
            'files'=> $files,
        ], 200);
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

     //   return $request->file('files')[0]->extension();

       if($request->hasFile('files')){
        
       $files = $request->file('files');

    //   dd($files);
        
        foreach ($files as $key => $file) {
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
     
         return response([
             'msg' => 'Image Updated Successfully',
             'status'=>'success',
         ], 200);
     
        }






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


        if($request->hasFile('files')){
        
            $files = $request->file('files');
     
         //   dd($files);
             
             foreach ($files as $key => $file) {
                 if($file){
                     $ext = '.'.$file->getClientOriginalExtension();
                     $fileName = str_replace($ext, '', $file->getClientOriginalName()); 
                     $FileNameSlug = Str::slug($fileName);
                     $FinalFileName = $FileNameSlug.'-'.time().$ext;
                     File::put('uploads/'.$FinalFileName, File::get($file));

                     $filerow = FileModel::find($request->id);
                    
                     $filerow->name = $fileName;
                     $filerow->slug = $FinalFileName;
                     $filerow->save();


                 }
             }
          
              return response([
                  'msg' => 'Image Updated Successfully',
                  'status'=>'success',
              ], 200);
          
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

      $files = FileModel::find($arrayids);

      foreach($files as $file){
          File::delete('uploads/'.$file->slug);
          $file->delete();
      }

     $files = FileModel::all();

      return response([
        'msg' => 'Images deleted Successfully',
        'status'=>'success',
        'files' => $files,
    ], 200);

    }
}


