<?php

namespace App\Http\Controllers\Api;

use App\Role;
use App\Http\Resources\RoleResource;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Roles\CreateRoleRequest;
use App\Http\Requests\Roles\UpdateRoleRequest;
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
        // return cleanAccents();

        $array = array(
            'sortBy' => request()->sortBy ?? 'created_at',
            'orderBy' => request()->orderBy ?? 'desc',
        );
        $columnSearch = array(
            'role_name',
            'id'
        );

        return RoleResource::collection(
            querySearch(Role::class, request()->keyword, $array, $columnSearch, 5)
        );
    }

    public function store(CreateRoleRequest $request)
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

    public function update(UpdateRoleRequest $request, $id)
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
