<?php

namespace App\Models;

use App\Models\Sku;
use App\Models\Product;
use App\Models\Variant_option;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sku_value extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $with = ['sku'];
    protected $fillable = [
        'product_id',
        'variant_id',
        'variant_option_id',
        'sku_id'
    ];

    public function sku(){
        return $this->belongsTo(Sku::class,'sku_id','id');
    } 
}
