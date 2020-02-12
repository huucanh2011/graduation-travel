<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = ['payment_method', 'description'];

    public function tourOrders()
    {
        return $this->hasMany(TourOrder::class);
    }
}
