<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class TourDeparture extends Model
{
    protected $fillable = ['tour_id', 'tour_code', 'date_departure', 'available_persons'];

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }

    public function tourOrders()
    {
        return $this->hasMany(TourOrder::class);
    }
}
