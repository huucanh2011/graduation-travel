<?php

namespace App\Http\Controllers\Api;

use App\Slide;
use Illuminate\Http\Request;
use App\Http\Requests\SlideRequest;
use App\Http\Resources\SlideResource;
use App\Http\Controllers\Api\BaseController;
use Symfony\Component\HttpFoundation\Response;

class SlideController extends BaseController
{
    public $slide;

    public function __construct(Slide $slide)
    {
        $this->slide = $slide;
    }

    public function index()
    {
        $array = array(
            'sortBy' => request()->sortBy ?? 'created_at',
            'orderBy' => request()->orderBy ?? 'desc',
        );
        $columnSearch = array(
            'title',
            'description'
        );

        return SlideResource::collection(
            querySearchWith(Slide::latest('is_active', 'created_at'), request()->keyword, $array, $columnSearch, 10)
        );
    }

    public function store(SlideRequest $request)
    {
        $slide = $this->slide->create($request->all());

        // $this->handleUploadImage($slide, $request);

        return $this->respondData(new SlideResource($slide), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        return $this->respondData(
            new SlideResource($this->slide->findOrFail($id))
        );
    }

    public function update(SlideRequest $request, $id)
    {
        $slide = $this->slide->findOrFail($id);
        $slide->update($request->all());

        // $this->handleUploadImage($slide, $request);

        return $this->respondData(new SlideResource($slide), Response::HTTP_ACCEPTED);
    }

    public function updateActive(Request $request, $id)
    {
        $slide = $this->slide->findOrFail($id);
        $slide->update($request->only('is_active'));

        // $this->handleUploadImage($slide, $request);

        return $this->respondData(new SlideResource($slide), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $this->slide->findOrFail($id)->delete();

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
