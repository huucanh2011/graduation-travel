<?php

namespace App\Http\Resources;

use App\Http\Resources\TourResource;
use Illuminate\Http\Resources\Json\JsonResource;

class TourCategoryResource extends JsonResource
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
            'cate_name' => $this->cate_name,
            'slug' => $this->slug,
            'tours' => TourResource::collection($this->whenLoaded('tours')),
            'tours_count' => $this->tours()->count(),
            'created_at' => (string) $this->created_at->diffForHumans(),
            'updated_at' => (string) $this->updated_at->diffForHumans(),
        ];
    }
}
