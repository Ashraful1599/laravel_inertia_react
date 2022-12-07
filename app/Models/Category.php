<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'cat_name',
        'cat_slug',
        'cat_des',
        'file_id',
    ];

    protected $with = ['image'];
    public function image(){
        return $this->belongsTo(File::class, 'file_id', 'id');
    }
    public function product_count(){
        return $this->hasMany(Product::class, 'cat_id','id');
    }    
    public function products(){
        return $this->hasMany(Product::class, 'cat_id','id');
    }
}
