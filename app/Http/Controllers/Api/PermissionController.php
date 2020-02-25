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
        $pageSize = request()->pageSize ? (int) request()->pageSize : 5;

        return PermissionResource::collection(
            querySearch(User::class, request()->q, $array, $columnSearch, $pageSize)
        );
    }

    public function update(Request $request, User $user)
    {
        if (!is_null($user)) {
            if (!is_null($request->is_active)) {
                $user->update($request->only('is_active'));
            }

            if (!is_null($request->role_slug)) {
                $user->update($request->only('role_slug'));
            }

            return $this->respondData(new PermissionResource($user), Response::HTTP_ACCEPTED);
        } else {
            return $this->respondError('User not found');
        }
    }
}
