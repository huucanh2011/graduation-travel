<?php

namespace App\Http\Controllers\Api;

use App\User;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Http\Controllers\Api\BaseController;
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
        return UserResource::collection(
            User::latest()->paginate(10)
        );
    }

    public function store(UserRequest $request)
    {
        $user = $this->user->create($request->all());

        return $this->respond(new UserResource($user), Response::HTTP_CREATED);
    }

    public function show($id)
    {
        return $this->respond(
            new UserResource($this->user->findOrFail($id))
        );
    }

    public function update(UserRequest $request, $id)
    {
        $user = $this->user->findOrFail($id);
        $user->update($request->all());

        return $this->respond(new UserResource($user));
    }

    public function destroy($id)
    {
        $this->user->findOrFail($id)->delete();
        
        return $this->respond(['data' => 'Delete Successfully']);
    }
}
