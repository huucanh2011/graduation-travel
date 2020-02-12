<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TourCategory extends Model
{
    protected $fillable = ['cate_name', 'slug'];
    
    public function tours()
    {
        return $this->hasMany(Tour::class, 'tourcate_id');
    }
}
