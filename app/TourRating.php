<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TourRating extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }
}
