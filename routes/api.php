<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ApiFileController;
use App\Http\Controllers\Api\CurrentUserController;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\ApiRegisteredUserController;
use App\Http\Controllers\Api\PasswordResetLinkController;
use App\Http\Controllers\Api\AuthenticatedSessionController;




/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware(['auth:sanctum','ApiIsAdmin'])->group(function () {
    Route::get('/getCurentUser',[CurrentUserController::class, 'getCurentUser']);
    Route::post('/logout',[CurrentUserController::class, 'logout']);
    Route::post('/changepassword', [CurrentUserController::class, 'change_password']);
    Route::post('/account-update', [CurrentUserController::class, 'account_update']);
    Route::post('/account-image-update',[CurrentUserController::class, 'account_img_update'])->name('apiaccount.imgupdate');

    Route::get('admin/file',[ApiFileController::class, 'index'])->name('apifile');
 //   Route::get('admin/file/create',[ApiFileController::class, 'create'])->name('file.create');
    Route::post('admin/file/create',[ApiFileController::class, 'store'])->name('apifile.store');
    Route::get('admin/file/{id}/edit',[ApiFileController::class, 'edit'])->name('apifile.edit');
    Route::post('admin/file/{id}',[ApiFileController::class, 'update'])->name('apifile.update');
    Route::delete('admin/file/{ids}',[ApiFileController::class, 'destroy'])->name('apifile.destroy');
  //  Route::put('admin/file/{id}/restore',[ApiFileController::class, 'restore'])->name('file.restore');


  Route::get('admin/category',[CategoryController::class, 'index'])->name('apicat');
  Route::get('admin/category/create',[CategoryController::class, 'create'])->name('apicat.create');
  Route::post('admin/category/create',[CategoryController::class, 'store'])->name('apicat.store');
  Route::get('admin/category/{id}/edit',[CategoryController::class, 'edit'])->name('apicat.edit');
  Route::put('admin/category/{id}',[CategoryController::class, 'update'])->name('apicat.update');
  Route::delete('admin/category/{ids}',[CategoryController::class, 'destroy'])->name('apicat.destroy');
  Route::put('admin/category/{id}/restore',[CategoryController::class, 'restore'])->name('apicat.restore');

  Route::get('admin/tag',[TagController::class, 'index'])->name('apitag');
  Route::get('admin/tag/create',[TagController::class, 'create'])->name('apitag.create');
  Route::post('admin/tag/create',[TagController::class, 'store'])->name('apitag.store');
  Route::get('admin/tag/{id}/edit',[TagController::class, 'edit'])->name('apitag.edit');
  Route::put('admin/tag/{id}',[TagController::class, 'update'])->name('apitag.update');
  Route::delete('admin/tag/{ids}',[TagController::class, 'destroy'])->name('apitag.destroy');
  Route::put('admin/tag/{id}/restore',[TagController::class, 'restore'])->name('apitag.restore');    
  
  Route::get('admin/product',[ProductController::class, 'index'])->name('apiproduct');
  Route::get('admin/product/create',[ProductController::class, 'create'])->name('apiproduct.create');
  Route::post('admin/product/create',[ProductController::class, 'store'])->name('apiproduct.store');
  Route::get('admin/product/{id}/edit',[ProductController::class, 'edit'])->name('apiproduct.edit');
  Route::post('admin/product/{id}',[ProductController::class, 'update'])->name('apiproduct.update');
  Route::delete('admin/product/{ids}',[ProductController::class, 'destroy'])->name('apiproduct.destroy');
  Route::put('admin/product/{id}/restore',[ProductController::class, 'restore'])->name('apiproduct.restore');




});

Route::post('forgot-password', [PasswordResetController::class, 'send_reset_password_email']);
Route::post('reset-password/{token}', [PasswordResetController::class, 'reset']);

Route::post('register', [ApiRegisteredUserController::class, 'store']);
Route::post('login', [AuthenticatedSessionController::class, 'store']);

