<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrderShipping extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'ship_first_name',
        'ship_last_name',
        'ship_company_name',
        'ship_country',
        'ship_address1',
        'ship_address2',
        'ship_city',
        'ship_state',
        'ship_postcode',
        'ship_phone',
    ];

}
