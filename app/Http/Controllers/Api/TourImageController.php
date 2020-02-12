<?php

namespace App\Http\Controllers\Api;

use App\Tour;
use App\TourImage;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController;

class TourImageController extends BaseController
{
    protected $tourImage;

    public function __construct(TourImage $tourImage)
    {
        $this->tourImage = $tourImage;
    }

    public function index(Tour $tour)
    {
        return $this->respond($tour->tourImages);
    }

    public function store(Request $request, Tour $tour)
    {
        $tour->tourImages()->create($request->all());
        
        return $this->respondSuccess();
    }

    public function destroy(Tour $tour, $id)
    {
        $tour->tourDepartures()->findOrFail($id)->delete();
        
        return $this->respondSuccess();
    }
}
