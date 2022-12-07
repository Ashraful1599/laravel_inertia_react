<?php

namespace App\Models;

use App\Models\Term;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Attribute extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'slug',
        'des',
    ];

 //   protected $with = ['terms'];
    public function terms()
    {
        return $this->hasMany(Term::class, 'attribute_id', 'id');
    }

}
  