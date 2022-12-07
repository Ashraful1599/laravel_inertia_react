<?php

namespace App\Models;

use App\Models\Term;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Variant_option extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'product_id',
        'variant_id',
        'term_id',
    ];
    protected $with = ['term'];
    public function term(){
        return $this->belongsTo(Term::class);
    }  
}
