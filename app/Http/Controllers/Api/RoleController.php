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
        return RoleResource::collection(
            Role::oldest('id')->paginate(10)
        );
    }

    public function store(RoleRequest $request)
    {
        $role = $this->role->create($request->all());

        return $this->respond(new RoleResource($role), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        return $this->respond(
            new RoleResource($this->role->findOrFail($id))
        );
    }

    public function update(RoleRequest $request, $id)
    {
        $role = $this->role->findOrFail($id);
        $role->update($request->all());

        return $this->respond(new RoleResource($role));
    }

    public function destroy($id)
    {
        $role = $this->role->findOrFail($id)->delete();

        return $this->respond(['data' => 'Delete Successfully']);
    }

    // public function search(Request $request)
    // {

    // }
}
