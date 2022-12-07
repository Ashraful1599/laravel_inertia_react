<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tag extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'tag_name',
        'tag_slug',
        'tag_des',
    ];
    
}
 