<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'review',
        'rating',
        'user_id',
        'product_id',
    ];

    protected $with = ['product', 'user'];
    public function product(){
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }    
    
    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

}
