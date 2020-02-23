<?php

namespace App\Http\Controllers\Api;

use App\TourRating;
use Illuminate\Http\Request;
use App\Http\Resources\TourRatingResource;
use App\Http\Controllers\Api\BaseController;
use Symfony\Component\HttpFoundation\Response;

class TourRatingController extends BaseController
{
    protected $tourRating;

    public function __construct(TourRating $tourRating)
    {
        $this->tourRating = $tourRating;
    }

    public function index()
    {
        $array = array(
            'sortBy' => request()->sortBy ?? 'created_at',
            'orderBy' => request()->orderBy ?? 'desc',
        );
        $columnSearch = array(
            'rating_content'
        );

        return TourRatingResource::collection(
            querySearch(TourRating::class, request()->q, $array, $columnSearch, 10)
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
        $tourRating = $this->tourRating->findOrFail($id);
        $tourRating->update($request->only('is_active'));

        return $this->respondData(new TourRatingResource($tourRating), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $this->tourRating->findOrFail($id)->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }
}
