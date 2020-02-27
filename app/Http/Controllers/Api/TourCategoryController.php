<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Str;
use App\Models\TourCategory;
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
        $array = array(
            'sortBy' => request()->sortBy ?? 'created_at',
            'orderBy' => request()->orderBy ?? 'desc',
        );
        $columnSearch = array(
            'cate_name',
            'slug'
        );
        $pageSize = request()->pageSize ? (int) request()->pageSize : 5;

        return TourCategoryResource::collection(
            querySearch(TourCategory::class, request()->q, $array, $columnSearch, $pageSize)
        );
    }

    public function store(TourCategoryRequest $request)
    {
        $request['slug'] = Str::slug($request->cate_name);
        $tourCategory = TourCategory::create($request->all());

        return $this->respondData(new TourCategoryResource($tourCategory), Response::HTTP_CREATED);
    }

    public function show(TourCategory $tourCategory)
    {
        return $this->respondData(new TourCategoryResource($tourCategory));
    }

    public function update(TourCategoryRequest $request, TourCategory $tourCategory)
    {
        $request['slug'] = Str::slug($request->cate_name);
        $tourCategory->update($request->all());

        return $this->respondData(new TourCategoryResource($tourCategory), Response::HTTP_ACCEPTED);
    }

    public function destroy(TourCategory $tourCategory)
    {
        $tourCategory->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }
}
