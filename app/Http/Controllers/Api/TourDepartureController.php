<?php

namespace App\Http\Controllers\Api;

use App\Models\Tour;
use Illuminate\Http\Request;
use App\Models\TourDeparture;
use App\Http\Controllers\Api\BaseController;
use Symfony\Component\HttpFoundation\Response;

class TourDepartureController extends BaseController
{
    protected $tourDeparture;

    public function __construct(TourDeparture $tourDeparture)
    {
        $this->tourDeparture = $tourDeparture;
    }

    public function index(Tour $tour)
    {
        return $this->respondData($tour->tourDepartures);
    }

    public function store(Request $request, Tour $tour)
    {
        $request['tour_code'] = config('tourcode.code') . $tour->id . '_' . $request->date_departure;
        $request['date_departure'] = $request->date_departure;
        $request['available_persons'] = $tour->number_persons;
        $tour->tourDepartures()->create($request->all());

        return $this->respondSuccess(config('message.create_success'), Response::HTTP_CREATED);
    }

    public function destroy(Tour $tour, $id)
    {
        $tour->tourDepartures()->findOrFail($id)->delete();
        
        return $this->respondSuccess(config('message.delete_success'));
    }
}
