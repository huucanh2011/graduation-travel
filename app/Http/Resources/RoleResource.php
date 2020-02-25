<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
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
            'role_name' => $this->role_name,
            'slug' => $this->slug,
            'created_at' => (string) $this->created_at->diffForHumans(),
            'updated_at' => (string) $this->updated_at->diffForHumans(),
        ];
    }
}
