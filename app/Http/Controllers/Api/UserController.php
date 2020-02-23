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

        return UserResource::collection(
            querySearch(User::class, request()->q, $array, $columnSearch, 10)
        );
    }

    public function store(CreateUserRequest $request)
    {
        $user = $this->user->create($request->all());

        return $this->respondData(new UserResource($user), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        return $this->respondData(
            new UserResource($this->user->findOrFail($id))
        );
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $user = $this->user->findOrFail($id);
        $user->update($request->all());

        return $this->respondData(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function updateActive(Request $request, $id)
    {
        $user = $this->user->findOrFail($id);
        $user->update($request->only('is_active'));

        return $this->respondData(new UserResource($user), Response::HTTP_ACCEPTED);
    }

    public function destroy($id)
    {
        $this->user->findOrFail($id)->delete();

        return $this->respondSuccess(config('message.delete_success'));
    }
}
