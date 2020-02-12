<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    protected $guarded  = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tourCategory()
    {
        return $this->belongsTo(TourCategory::class, 'tourcate_id');
    }

    public function tourImages()
    {
        return $this->hasMany(TourImage::class);
    }

    public function tourRatings()
    {
        return $this->hasMany(TourRating::class);
    }

    public function tourDepartures()
    {
        return $this->hasMany(TourDeparture::class);
    }
}
