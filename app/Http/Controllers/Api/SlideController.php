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
        $pageSize = request()->pageSize ? (int) request()->pageSize : 5;

        return SlideResource::collection(
            querySearchWith(Slide::latest('is_active', 'created_at'), request()->q, $array, $columnSearch, $pageSize)
        );
    }

    public function store(CreateSlideRequest $request)
    {
        $slide = Slide::create($request->all());

        return $this->respondData(new SlideResource($slide), Response::HTTP_CREATED);
    }

    public function show(Slide $slide)
    {
        return $this->respondData(new SlideResource($slide));
    }

    public function update(UpdateSlideRequest $request, Slide $slide)
    {
        $slide->update($request->all());

        return $this->respondData(new SlideResource($slide), Response::HTTP_ACCEPTED);
    }

    public function updateActive(Request $request, Slide $slide)
    {
        $slide->update($request->only('is_active'));

        return $this->respondData(new SlideResource($slide), Response::HTTP_ACCEPTED);
    }

    public function destroy(Slide $slide)
    {
        $slide->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }
}
