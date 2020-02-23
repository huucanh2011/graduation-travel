<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpFoundation\Response;

class CheckPartner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (auth()->user()->role->role_name !== 'partner') {
            return response()->json(['message' => 'Access denied'], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
