<?php

namespace App\Http\Controllers\Api;

use App\TourCategory;
use App\Http\Requests\TourCategoryRequest;
use App\Http\Controllers\Api\BaseController;
use App\Http\Resources\TourCategoryResource;
use Symfony\Component\HttpFoundation\Response;

class TourCategoryController extends BaseController
{
    protected $tourCategory;

    public function __construct(TourCategory $tourCategory)
    {
        $this->tourCategory = $tourCategory;
    }

    public function index()
    {
        return TourCategoryResource::collection(
            TourCategory::with(['tours'])->oldest('id')->paginate(10)
        );
    }

    public function store(TourCategoryRequest $request)
    {
        $request['slug'] = str_slug($request->cate_name);
        $tourCategory = $this->tourCategory->create($request->all());

        return $this->respond(new TourCategoryResource($tourCategory), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        return $this->respond(
            new TourCategoryResource($this->tourCategory->with(['tours'])->findOrFail($id))
        );
    }

    public function update(TourCategoryRequest $request, $id)
    {
        $request['slug'] = str_slug($request->cate_name);
        $tourCategory = $this->tourCategory->findOrFail($id);
        $tourCategory->update($request->all());

        return $this->respond(new TourCategoryResource($tourCategory));
    }

    public function destroy($id)
    {
        $this->tourCategory->findOrFail($id)->delete();
        
        return $this->respond(['data' => 'Delete Successfully']);
    }
}
