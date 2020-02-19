<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\PermissionResource;
use App\Http\Controllers\Api\BaseController;
use Symfony\Component\HttpFoundation\Response;

class PermissionController extends BaseController
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function index()
    {
        $array = array(
            'sortBy' => request()->sortBy ?? 'created_at',
            'orderBy' => request()->orderBy ?? 'desc',
        );
        $columnSearch = array(
            'name',
            'email',
        );

        return PermissionResource::collection(
            querySearch(User::class, request()->keyword, $array, $columnSearch, 10)
        );
    }

    public function update(Request $request, $id)
    {
        $user = $this->user->findOrFail($id);

        if (!is_null($request->is_active)) {
            $user->update($request->only('is_active'));
        }

        if (!is_null($request->role_id)) {
            $user->update($request->only('role_id'));
        }

        return $this->respondData(new PermissionResource($user), Response::HTTP_ACCEPTED);
    }
}
