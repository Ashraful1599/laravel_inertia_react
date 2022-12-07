<?php

namespace App\Models;

use App\Models\Attribute;
use App\Models\Sku_value;
use App\Models\Variant_option;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Variant extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $with = ['variant_option','attribute']; 

    protected $fillable = [
        'product_id',
        'attribute_id',
    ];

    public function variant_option(){
        return $this->hasMany(Variant_option::class);
    }     
    
    public function attribute(){
        return $this->belongsTo(Attribute::class);
    } 
}

