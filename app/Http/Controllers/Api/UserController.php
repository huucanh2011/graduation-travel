<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\Users\CreateUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use Symfony\Component\HttpFoundation\Response;

class UserController extends BaseController
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
            'email',
            'name'
        );
        $pageSize = request()->pageSize ? (int) request()->pageSize : 5;

        return UserResource::collection(
            querySearch(User::class, request()->q, $array, $columnSearch, $pageSize)
        );
    }

    public function store(CreateUserRequest $request)
    {
        $user = User::create($request->all());

        return $this->respondData(new UserResource($user), Response::HTTP_CREATED);
    }

    public function show(User $user)
    {
        return $this->respondData(new UserResource($user));
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->all());

        return $this->respondData(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function updateActive(Request $request, User $user)
    {        
        $user->update($request->only('is_active'));

        return $this->respondData(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }
}
