<?php

namespace App\Http\Resources;

use App\Http\Resources\UserResource;
use App\Http\Resources\TourCategoryResource;
use Illuminate\Http\Resources\Json\JsonResource;

class TourResource extends JsonResource
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
            'tour_name' => $this->tour_name,
            'slug' => $this->slug,
            'image' => $this->image,
            'gallery' => $this->gallery,
            'description' => $this->description,
            'from_place' => $this->from_place,
            'to_place' => $this->to_place,
            'transport' => $this->transport,
            'number_days' => $this->number_days,
            'number_persons' => $this->number_persons,
            'price_default' => $this->price_default,
            'price_children' => $this->price_children,
            'price_baby' => $this->price_baby,
            'note' => $this->note,
            // 'tour_category' => new TourCategoryResource($this->whenLoaded('tourCategory')),
            // 'company' => new UserResource($this->whenLoaded('user')),
            'tour_category' => $this->tourCategory->cate_name,
            'company' => $this->user->name,
            'is_active' => (bool) $this->is_active,
            'created_at' => (string) $this->created_at,
            'updated_at' => (string) $this->updated_at,
        ];
    }
}
