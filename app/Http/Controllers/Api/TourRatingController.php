<?php

namespace App\Http\Controllers\Api;

use App\Models\TourRating;
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
            'content'
        );
        $pageSize = request()->pageSize ? (int) request()->pageSize : 5;

        return TourRatingResource::collection(
            querySearch(TourRating::class, request()->q, $array, $columnSearch, $pageSize)
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

    public function update(Request $request, TourRating $tourRating)
    {
        $tourRating->update($request->only('is_active'));

        return $this->respondData(new TourRatingResource($tourRating), Response::HTTP_ACCEPTED);
    }

    public function destroy(TourRating $tourRating)
    {
        $tourRating->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }
}
