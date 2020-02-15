<?php

namespace App\Http\Controllers\Api\Auth;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\Api\BaseController;
use Symfony\Component\HttpFoundation\Response;

class ForgotPasswordController extends BaseController
{
    public function sendMail(Request $request)
    {
        if(!$this->validateEmail($request->email)) {
            return $this->failedResponse();
        }

        $this->send($request->email);
        return $this->successResponse();
    }

    private function validateEmail($email)
    {
        return !! User::where('email', $email)->first();
    }

    private function failedResponse()
    {
        return $this->respondError('Email doesn\'t found on our database');
    }

    private function send($email)
    {
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    private function createToken($email)
    {
        $oldToken = DB::table('password_resets')->where('email', $email)->first();

        if($oldToken) {
            return $oldToken->token;
        }

        $token = str_random(60);
        $this->saveToken($token, $email);

        return $token;
    }

    private function saveToken($token, $email)
    {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    private function successResponse()
    {
        return $this->respondSuccess('Reset Email is send successfully, please check your inbox');
    }
}
