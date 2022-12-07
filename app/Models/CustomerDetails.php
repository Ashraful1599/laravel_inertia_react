<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CustomerDetails extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'user_id',
        'company_name',
        'country',
        'address1',
        'address2',
        'city',
        'state',
        'postcode',
        'phone',
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
