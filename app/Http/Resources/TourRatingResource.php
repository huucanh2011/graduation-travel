<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TourRatingResource extends JsonResource
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
            'scores' => $this->scores,
            'content' => $this->content,
            'is_active' => (bool) $this->is_active,
            'author' => $this->user->name,
            'tour' => $this->tour->tour_name,
            'created_at' => (string) $this->created_at->diffForHumans(),
        ];
    }
}
