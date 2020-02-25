<?php

namespace App\Http\Controllers\Api;

use App\Models\Role;
use Illuminate\Support\Str;
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
        // $this->middleware(['jwt.auth', 'auth.admin']);
        $this->role = $role;
    }

    public function index()
    {
        $array = array(
            'sortBy' => request()->sortBy ?? 'created_at',
            'orderBy' => request()->orderBy ?? 'desc',
        );
        $columnSearch = array(
            'role_name',
            'slug',
            'id'
        );
        $pageSize = request()->pageSize ? (int) request()->pageSize : 5;

        return RoleResource::collection(
            querySearch(Role::class, request()->q, $array, $columnSearch, $pageSize)
        );
    }

    public function store(CreateRoleRequest $request)
    {
        $request['slug'] = Str::slug($request->role_name);
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
        $request['slug'] = Str::slug($request->role_name);
        $role->update($request->all());

        return $this->respondData(new RoleResource($role), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $role = $this->role->findOrFail($id)->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }

    public function getRoles()
    {
        return RoleResource::collection(
            Role::oldest('id')->get()
        );
    }
}
