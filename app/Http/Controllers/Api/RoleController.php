<?php

namespace App\Http\Controllers\Api;

use App\Role;
use App\Http\Requests\RoleRequest;
use App\Http\Resources\RoleResource;
use App\Http\Controllers\Api\BaseController;
use Symfony\Component\HttpFoundation\Response;

class RoleController extends BaseController
{
    protected $role;

    public function __construct(Role $role)
    {
        $this->role = $role;
    }

    public function index()
    {
        $array = array(
            'sortBy' => request()->sortBy ?? 'created_at',
            'orderBy' => request()->orderBy ?? 'desc',
        );
        return RoleResource::collection(
            querySort(Role::class, $array, 5)
        );
    }

    public function store(RoleRequest $request)
    {
        $role = $this->role->create($request->all());

        return $this->respondData(new RoleResource($role), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        return $this->respondData(
            new RoleResource($this->role->findOrFail($id))
        );
    }

    public function update(RoleRequest $request, $id)
    {
        $role = $this->role->findOrFail($id);
        $role->update($request->all());

        return $this->respondData(new RoleResource($role), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $role = $this->role->findOrFail($id)->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }

    // public function search(Request $request)
    // {

    // }
}
