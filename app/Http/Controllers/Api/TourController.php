<?php

namespace App\Http\Controllers\Api;

use App\Models\Tour;
use Illuminate\Support\Str;
use App\Http\Requests\TourRequest;
use App\Http\Resources\TourResource;
use App\Http\Controllers\Api\BaseController;
use Symfony\Component\HttpFoundation\Response;

class TourController extends BaseController
{
    protected $tour;

    public function __construct(Tour $tour)
    {
        $this->tour =  $tour;
    }

    public function index()
    {
        $array = array(
            'sortBy' => request()->sortBy ?? 'created_at',
            'orderBy' => request()->orderBy ?? 'desc',
        );
        $columnSearch = array(
            'tour_name',
            'slug',
            'from_place',
            'to_place',
            'transport',
            'number_days',
            'number_persons',
            'price_default',
            'price_children',
            'price_baby'
        );
        $pageSize = request()->pageSize ? (int) request()->pageSize : 5;

        return TourResource::collection(
            querySearchWith(Tour::with(['tourCategory', 'user']), request()->q, $array, $columnSearch, $pageSize)
        );
    }

    public function store(TourRequest $request)
    {
        $request['slug'] = Str::slug($request->tour_name);
        $tour = auth()->user()->tours()->create($request->all());

        return $this->respondData(new TourResource($tour), Response::HTTP_CREATED);
    }

    public function show(Tour $tour)
    {
        return $this->respondData(new TourResource($tour->with(['tourCategory', 'user'])));
    }

    public function update(TourRequest $request, Tour $tour)
    {
        $request['slug'] = Str::slug($request->tour_name);
        $tour->update($request->all());

        return $this->respondData(new TourResource($tour), Response::HTTP_ACCEPTED);
    }

    public function destroy(Tour $tour)
    {
        $tour->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }
}
