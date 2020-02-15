<?php

namespace App\Http\Controllers\Api\Auth;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\ChangePasswordRequest;
use Symfony\Component\HttpFoundation\Response;

class ResetPasswordController extends BaseController
{
    public function process(ChangePasswordRequest $request)
    {
        return $this->getPasswordResetTableRow($request)->count() > 0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();
    }

    private function getPasswordResetTableRow($request)
    {
        return DB::table('password_resets')->where([
            'email' => $request->email,
            'token' => $request->resetToken,
        ]);
    }

    private function changePassword($request)
    {
        $user = User::where('email', $request->email)->first();
        $user->update(['password' => $request->password]);
        $this->getPasswordResetTableRow($request)->delete();

        return $this->respondSuccess('Password Successfully Changed');
    }

    private function tokenNotFoundResponse()
    {
        return $this->respondError('Token or Email is incorrect', Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
