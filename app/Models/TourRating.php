<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class TourRating extends Model
{
    protected $fillable = ['rating_scores', 'rating_content', 'is_active', 'role_id', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }
}
