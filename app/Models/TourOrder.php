<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class TourOrder extends Model
{
    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }

    public function tourDeparture()
    {
        return $this->belongsTo(TourDeparture::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
