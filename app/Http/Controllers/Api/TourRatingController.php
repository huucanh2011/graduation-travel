<?php

namespace App\Http\Controllers\Api;

use App\TourRating;
use Illuminate\Http\Request;
use App\Http\Resources\TourRatingResource;
use App\Http\Controllers\Api\BaseController;

class TourRatingController extends BaseController
{
    protected $tourRating;

    public function __construct(TourRating $tourRating)
    {
        $this->tourRating = $tourRating;
    }

    public function index()
    {
        return TourRatingResource::collection(
            TourRating::latest()->paginate(10)
        );
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        $this->tourRating->findOrFail($id)->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }
}
