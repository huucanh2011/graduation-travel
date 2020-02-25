<?php

namespace App;

use App\Models\Role;
use App\Models\Tour;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\TourOrder;
use App\Models\TourRating;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'phone_number', 'address', 'is_active', 'role_slug'
    ];

    protected $hidden = [
        'password',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
       return [];
    }

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_slug', 'slug');
    }

    public function tours()
    {
        return $this->hasMany(Tour::class);
    }

    public function tourRatings()
    {
        return $this->hasMany(TourRating::class);
    }

    public function tourOrders()
    {
        return $this->hasMany(TourOrder::class);
    }
}
