<?php

namespace App\Http\Controllers\Api\Auth;

use App\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Requests\Auth\LoginRequest;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Controllers\Api\BaseController;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends BaseController
{
    public function __construct()
    {
        $this->middleware('jwt.auth')->except(['login', 'register', 'redirectToProvider', 'handleProviderCallback']);
    }

    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback($provider)
    {
        $providerUser = Socialite::driver($provider)->stateless()->user();

        // return $providerUser->getName();
        return response()->json($providerUser);

        // $token = JWTAuth::fromUser(auth()->user());

        // return $this->respondWithToken($token);
        // auth()->login($providerUser);

        // $token = JWTAuth::fromUser($providerUser);

        // return auth()->user();
        // return $this->respondWithToken($token);
    }

    public function login(LoginRequest $request)
    {
        $credentials = ['email' => $request->email, 'password' => $request->password];

        if (!$token = auth()->attempt($credentials)) {
            return $this->respondError('Email or password incorect', Response::HTTP_UNAUTHORIZED);
        }

        return $this->respondWithToken($token);
    }

    public function register(RegisterRequest $request)
    {
        if ($request->role_slug === 'partner') {
            $request['is_active'] = false;

            $user = User::create($request->all());
        } else {
            $user = User::create($request->all());
        }

        auth()->login($user);
        $token = JWTAuth::fromUser($user);

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth()->logout();

        return $this->respondSuccess('Successfully logged out');
    }

    public function me()
    {
        $token = JWTAuth::fromUser(auth()->user());

        return $this->respondWithToken($token);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            '__auth' => $token,
            'user' => auth()->user(),
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 24 * 30 // 30 days
        ]);
    }
}
