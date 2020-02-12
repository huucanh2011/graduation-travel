<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'provider' => $this->provider,
            'provider_id' => $this->provider_id,
            'avatar' => $this->avatar,
            'image_cover' => $this->image_cover,
            'phone_number' => $this->phone_number,
            'address' => $this->address,
            'is_active' => (boolean) $this->is_active,
            'role' => $this->role->role_name,
            'role_id' => $this->role_id,
            'tours_count' => $this->tours()->count(),
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
