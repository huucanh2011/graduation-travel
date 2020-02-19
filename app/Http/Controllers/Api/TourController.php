<?php

namespace App\Http\Controllers\Api;

use App\Tour;
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

        return TourResource::collection(
            querySearchWith(Tour::with(['tourCategory', 'user']), request()->keyword, $array, $columnSearch, 10)
        );
    }

    public function store(TourRequest $request)
    {
        $request['slug'] = Str::slug($request->tour_name);
        $tour = auth()->user()->tours()->create($request->all());

        // $this->handleUploadImage($tour, $request);

        return $this->respondData(new TourResource($tour), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        return $this->respondData(
            new TourResource($this->tour->with(['tourCategory', 'user'])->findOrFail($id))
        );
    }

    public function update(TourRequest $request, $id)
    {
        $request['slug'] = Str::slug($request->tour_name);
        $tour = $this->tour->findOrFail($id);
        $tour->update($request->all());

        // $this->handleUploadImage($tour, $request);

        return $this->respondData(new TourResource($tour), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $this->tour->findOrFail($id)->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }

    private function handleUploadImage($slide, $request)
    {
        if ($request->has('image')) {
            $slide->update([
                'image' => $request->image->store('uploads', 'public'),
            ]);

            $image = Image::make(public_path('storage/' . $slide->image))->fit(600, 400);
            $image->save();
        }
    }
}
