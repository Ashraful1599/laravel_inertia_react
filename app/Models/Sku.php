<?php

namespace App\Models;

use App\Models\Sku_value;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sku extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'product_id', 
        'sku',
        'price',
        'qty'
    ];

 //   protected $with = ['var_products'];

    public function var_products(){
     return   $this->hasMany(Sku_value::class);
    }    
    // public function var_attribute(){
    //     $this->belongsToMany(Attribute::class);
    // }
}
