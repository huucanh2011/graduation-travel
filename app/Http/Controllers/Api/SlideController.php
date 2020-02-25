<?php

namespace App\Http\Controllers\Api;

use App\Models\Slide;
use Illuminate\Http\Request;
use App\Http\Resources\SlideResource;
use App\Http\Controllers\Api\BaseController;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\Slides\CreateSlideRequest;
use App\Http\Requests\Slides\UpdateSlideRequest;

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
            querySearchWith(Slide::latest('is_active', 'created_at'), request()->q, $array, $columnSearch, 10)
        );
    }

    public function store(CreateSlideRequest $request)
    {
        $slide = $this->slide->create($request->all());

        return $this->respondData(new SlideResource($slide), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        return $this->respondData(
            new SlideResource($this->slide->findOrFail($id))
        );
    }

    public function update(UpdateSlideRequest $request, $id)
    {
        $slide = $this->slide->findOrFail($id);
        $slide->update($request->all());

        return $this->respondData(new SlideResource($slide), Response::HTTP_ACCEPTED);
    }

    public function updateActive(Request $request, $id)
    {
        $slide = $this->slide->findOrFail($id);
        $slide->update($request->only('is_active'));

        return $this->respondData(new SlideResource($slide), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $this->slide->findOrFail($id)->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }
}
