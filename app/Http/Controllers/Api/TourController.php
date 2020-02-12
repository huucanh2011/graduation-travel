<?php

namespace App\Http\Controllers\Api;

use App\Tour;
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
        return TourResource::collection(
            Tour::with(['tourCategory', 'user'])->latest()->paginate(10)
        );
    }

    public function store(TourRequest $request)
    {
        $request['slug'] = str_slug($request->tour_name);
        $tour = auth()->user()->tours()->create($request->all());

        // $this->handleUploadImage($tour, $request);

        return $this->respond(new TourResource($tour), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        return $this->respond(
            new TourResource($this->tour->with(['tourCategory', 'user'])->findOrFail($id))
        );
    }

    public function update(TourRequest $request, $id)
    {
        $request['slug'] = str_slug($request->tour_name);
        $tour = $this->tour->findOrFail($id);
        $tour->update($request->all());

        // $this->handleUploadImage($tour, $request);

        return $this->respond(new TourResource($tour));
    }

    public function destroy($id)
    {
        $this->tour->findOrFail($id)->delete();
        
        return $this->respond(['data' => 'Delete Successfully']);
    }

    private function handleUploadImage($slide, $request)
    {
        if($request->has('image')) {
            $slide->update([
                'image' => $request->image->store('uploads', 'public'),
            ]);

            $image = Image::make(public_path('storage/' . $slide->image))->fit(600, 400);
            $image->save();
        }
    }
}
