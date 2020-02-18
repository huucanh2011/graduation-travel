<?php

namespace App\Http\Controllers\Api;

use App\TourCategory;
use Illuminate\Support\Str;
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
        // return cleanAccents();

        $array = array(
            'sortBy' => request()->sortBy ?? 'created_at',
            'orderBy' => request()->orderBy ?? 'desc',
        );
        $columnSearch = array(
            'cate_name',
            'slug'
        );

        return TourCategoryResource::collection(
            querySearch(TourCategory::class, request()->keyword, $array, $columnSearch, 5)
        );
    }

    public function store(TourCategoryRequest $request)
    {
        $request['slug'] = Str::slug($request->cate_name);
        $tourCategory = $this->tourCategory->create($request->all());

        return $this->respondData(new TourCategoryResource($tourCategory), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        return $this->respondData(
            new TourCategoryResource($this->tourCategory->findOrFail($id))
        );
    }

    public function update(TourCategoryRequest $request, $id)
    {
        $request['slug'] = Str::slug($request->cate_name);
        $tourCategory = $this->tourCategory->findOrFail($id);
        $tourCategory->update($request->all());

        return $this->respondData(new TourCategoryResource($tourCategory), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $this->tourCategory->findOrFail($id)->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }
}
