<?php

namespace App\Models;

use App\Models\Sku;
use App\Models\Variant;
use App\Models\Category;
use App\Models\Sku_value;
use App\Models\ProductTag;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, HasApiTokens, Notifiable, Sluggable;

    protected $fillable = [
        'name','slug','description', 'image', 'regular_price', 'cat_id', 'status','fetured','variable','image2', 'sku', 'gallery','promo1', 'promo2','tax_class','product_type','offer_price'
    ];
  

    protected $with = ['category','tag','variant','sku_value','skus'];

    public function category(){
        return $this->belongsTo(Category::class, 'cat_id','id');
    }

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function tag(){
        return $this->belongsToMany(Tag::class, ProductTag::class);
    }
    // public function variations(){
    //     return $this->hasMany(Sku::class);
    // }
    public function sku_value(){
        return $this->hasMany(Sku_value::class);
    }    
   
     public function variant(){
         return $this->hasMany(Variant::class);
     }
    //  public function variant_option(){
    //     return $this->hasMany(Variant_option::class,'product_id','id');
    // } 

     public function skus(){
         return $this->hasMany(Sku::class);
     }

    public function getRouteKeyName()
    {
        return 'slug';
    }


}
