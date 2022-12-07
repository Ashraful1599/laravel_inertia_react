<?php

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TagController;
use App\Http\Resources\ProductResource;
use App\Http\Controllers\CartController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\TermController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\AttributeController;
use App\Http\Controllers\StripePaymentController;
use App\Http\Controllers\CategoryProductController;
use App\Http\Controllers\CustomerDetailsController;
use App\Http\Controllers\Auth\CurrentUserController;
use App\Http\Controllers\ShopController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

  //  return "Hello World!";

    $categories = Category::with('product_count:id,cat_id')->get();
   // dd($categories);
   // $products = Product::all();
  //  $productsCustom = ProductResource::collection( Product::with('category:id,cat_name')->get());
    $productsCustom = ProductResource::collection( Product::all());
    return Inertia::render('Welcome', [
        'categories' => $categories,
        'productsCustom' => $productsCustom,
    ]);

})->name('home');

Route::middleware(['AuthCustomer'])->group(function(){
  Route::get('my-account/',[CustomerDetailsController::class, 'myAccount'])->name('user.account');
  Route::get('logout/',[CustomerDetailsController::class, 'destroy'])->name('user.logout');
  Route::post('my-account/update/',[CustomerDetailsController::class, 'update'])->name('user.account.update');
});
Route::get('register/',[CustomerDetailsController::class, 'register'])->name('user.register');
Route::post('register/',[CustomerDetailsController::class, 'store'])->name('user.register.store');
Route::get('login/',[CustomerDetailsController::class, 'login'])->name('user.login');
Route::post('login/',[CustomerDetailsController::class, 'loginCheck'])->name('login.check');


Route::get('/product/{slug}',[ProductController::class, 'show'])->name('product.show');
Route::post('/search/{search}',[ProductController::class, 'search'])->name('search');
Route::get('/allproduct',[ProductController::class, 'all'])->name('product.all');
Route::get('/shop',[ShopController::class, 'index'])->name('shop.index');
Route::get('/category/{slug}',[CategoryProductController::class, 'show'])->name('category.product.show');
Route::get('cart', [CartController::class, 'cartList'])->name('cart.list');
Route::post('cart', [CartController::class, 'addToCart'])->name('cart.store');
Route::post('update-cart', [CartController::class, 'updateCart'])->name('cart.update');
Route::post('remove', [CartController::class, 'removeCart'])->name('cart.remove');
Route::post('clear', [CartController::class, 'clearAllCart'])->name('cart.clear');

Route::get('checkout', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('order', [OrderController::class, 'store'])->name('order.store');
Route::get('order', [OrderController::class, 'index'])->name('order.index');

Route::controller(StripePaymentController::class)->group(function(){
 // Route::get('stripe', 'stripe');
  Route::post('stripe', 'stripePost')->name('stripe.post');
});






// Route::post('cart', [CartController::class, 'addToCart'])->name('cart.store');
// Route::post('update-cart', [CartController::class, 'updateCart'])->name('cart.update');
// Route::post('remove', [CartController::class, 'removeCart'])->name('cart.remove');
// Route::post('clear', [CartController::class, 'clearAllCart'])->name('cart.clear');


// Route::post('imgupload',function(){
//     return response()->json([
//         'location' => 'http://moxiecode.cachefly.net/tinymce/v9/images/logo.png',
//     ]); 
// });
Route::post('imgupload',[CurrentUserController::class, 'imgupload']);


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified','IsAdmin' ])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('dashboard/account-profile',[CurrentUserController::class, 'create'])->name('account-profile');
    Route::post('dashboard/password-change',[CurrentUserController::class, 'password_change'])->name('password.change');
    Route::post('dashboard/account-update',[CurrentUserController::class, 'account_update'])->name('account.update');
    Route::post('dashboard/account-image-update',[CurrentUserController::class, 'account_img_update'])->name('account.imgupdate');
    Route::get('dashboard/users',[UsersController::class, 'create'])->name('users');
    Route::get('dashboard/users/edit/{id}',[UsersController::class, 'edit'])->name('user.edit');
    Route::post('dashboard/users/edit/',[UsersController::class, 'update'])->name('user.update');
    Route::get('dashboard/users/delete/{id}',[UsersController::class, 'destroy'])->name('user.delete');
    Route::get('dashboard/users/add',[UsersController::class, 'user_index'])->name('user.index');
    Route::post('dashboard/users/add',[UsersController::class, 'user_add'])->name('user.add');
    

    Route::get('dashboard/category',[CategoryController::class, 'index'])->name('cat');
    Route::get('dashboard/category/create',[CategoryController::class, 'create'])->name('cat.create');
    Route::post('dashboard/category/create',[CategoryController::class, 'store'])->name('cat.store');
    Route::get('dashboard/category/{id}/edit',[CategoryController::class, 'edit'])->name('cat.edit');
    Route::post('dashboard/category/{id}',[CategoryController::class, 'update'])->name('cat.update');
    Route::delete('dashboard/category/{id}',[CategoryController::class, 'destroy'])->name('cat.destroy');
    Route::put('dashboard/category/{id}/restore',[CategoryController::class, 'restore'])->name('cat.restore');

    Route::get('dashboard/tag',[TagController::class, 'index'])->name('tag');
    Route::get('dashboard/tag/create',[TagController::class, 'create'])->name('tag.create');
    Route::post('dashboard/tag/create',[TagController::class, 'store'])->name('tag.store');
    Route::get('dashboard/tag/{id}/edit',[TagController::class, 'edit'])->name('tag.edit');
    Route::put('dashboard/tag/{id}',[TagController::class, 'update'])->name('tag.update');
    Route::delete('dashboard/tag/{id}',[TagController::class, 'destroy'])->name('tag.destroy');
    Route::put('dashboard/tag/{id}/restore',[TagController::class, 'restore'])->name('tag.restore');    
    
    Route::get('dashboard/product',[ProductController::class, 'index'])->name('product');
    Route::get('dashboard/product/create',[ProductController::class, 'create'])->name('product.create');
    Route::post('dashboard/product/create',[ProductController::class, 'store'])->name('product.store');
    Route::get('dashboard/product/{id}/edit',[ProductController::class, 'edit'])->name('product.edit');
    Route::post('dashboard/product/{id}',[ProductController::class, 'update'])->name('product.update');
    Route::delete('dashboard/product/{ids}',[ProductController::class, 'destroy'])->name('product.destroy');
    Route::put('dashboard/product/{id}/restore',[ProductController::class, 'restore'])->name('product.restore');
    Route::get('dashboard/product/{id}',[ProductController::class, 'duplicate'])->name('product.duplicate');


    Route::get('dashboard/file',[FileController::class, 'index'])->name('file');
    Route::get('dashboard/file/create',[FileController::class, 'create'])->name('file.create');
    Route::post('dashboard/file/create',[FileController::class, 'store'])->name('file.store');
    Route::get('dashboard/file/{id}/edit',[FileController::class, 'edit'])->name('file.edit');
    Route::post('dashboard/file/{id}',[FileController::class, 'update'])->name('file.update');
    Route::delete('dashboard/file/{ids}',[FileController::class, 'destroy'])->name('file.destroy');
    Route::put('dashboard/file/{id}/restore',[FileController::class, 'restore'])->name('file.restore');    
    
    Route::get('dashboard/attribute',[AttributeController::class, 'index'])->name('attribute');
    Route::get('dashboard/attribute/create',[AttributeController::class, 'create'])->name('attribute.create');
    Route::post('dashboard/attribute/create',[AttributeController::class, 'store'])->name('attribute.store');
    Route::get('dashboard/attribute/{id}/edit',[AttributeController::class, 'edit'])->name('attribute.edit');
    Route::post('dashboard/attribute/{id}',[AttributeController::class, 'update'])->name('attribute.update');
    Route::delete('dashboard/attribute/{ids}',[AttributeController::class, 'destroy'])->name('attribute.destroy');
    Route::put('dashboard/attribute/{id}/restore',[AttributeController::class, 'restore'])->name('attribute.restore');    
    
    Route::get('dashboard/term',[TermController::class, 'index'])->name('term');
    Route::get('dashboard/term/create',[TermController::class, 'create'])->name('term.create');
    Route::post('dashboard/term/create',[TermController::class, 'store'])->name('term.store');
    Route::get('dashboard/term/{id}/edit',[TermController::class, 'edit'])->name('term.edit');
    Route::post('dashboard/term/{id}',[TermController::class, 'update'])->name('term.update');
    Route::delete('dashboard/term/{ids}',[TermController::class, 'destroy'])->name('term.destroy');
    Route::put('dashboard/term/{id}/restore',[TermController::class, 'restore'])->name('term.restore');    

    Route::get('dashboard/review',[ReviewController::class, 'index'])->name('review');
    Route::get('dashboard/review/create',[ReviewController::class, 'create'])->name('review.create');
    Route::post('dashboard/review/create',[ReviewController::class, 'store'])->name('review.store');
    Route::get('dashboard/review/{id}/edit',[ReviewController::class, 'edit'])->name('review.edit');
    Route::post('dashboard/review/{id}',[ReviewController::class, 'update'])->name('review.update');
    Route::delete('dashboard/review/{ids}',[ReviewController::class, 'destroy'])->name('review.destroy');
    Route::put('dashboard/review/{id}/restore',[ReviewController::class, 'restore'])->name('review.restore');


 });






require __DIR__.'/auth.php';
