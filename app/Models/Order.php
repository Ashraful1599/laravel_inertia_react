<?php

namespace App\Models;

use App\Models\Payment;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $fillable = ['user_id','payment_id','order_shipping_id','shipping','order_note','total_qty','total_price','status','subtotal', 'tax'];

    protected $with = ['payment'];
    public function payment(){
        return $this->belongsTo(Payment::class, 'payment_id', 'id');
    }
}
