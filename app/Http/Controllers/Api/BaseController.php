<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;

class BaseController extends Controller
{
    protected function respond($data, $statusCode = 200)
    {
        return response()->json($data, $statusCode);
    }

    protected function respondSuccess()
    {
        return $this->respond(null);
    }

    protected function respondError($message, $statusCode)
    {
        return $this->respond([
            'errors' => [
                'message' => $message,
                'status_code' => $statusCode
            ]
        ], $statusCode);
    }

    protected function respondUnauthorized($message = 'Unauthorized')
    {
        return $this->respondError($message, Response::HTTP_UNAUTHORIZED);
    }

    protected function respondForbidden($message = 'Forbidden')
    {
        return $this->respondError($message, Response::HTTP_FORBIDDEN);
    }
}
