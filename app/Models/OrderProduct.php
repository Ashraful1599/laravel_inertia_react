<?php

namespace App\Models;

use App\Models\Product;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderProduct extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'product_id',
        'product_name',
        'order_id',
        'qty',
        'attribute',
        'price',
    ];

//    protected $with = ['order'];
//     public function order(){
//       return  $this->belongsTo(Order::class,'order_id', 'id');
//     }

}
