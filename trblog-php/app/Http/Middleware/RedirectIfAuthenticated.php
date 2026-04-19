<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\RedirectIfAuthenticated as Middleware;
use Illuminate\Http\Request;

class RedirectIfAuthenticated extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are authenticated.
     *
     * @param  Request  $request
     * @param  mixed  $guard
     * @return string|null
     */
    protected function redirectTo($request, $guard = null)
    {
        if ($guard == 'admin' && auth()->guard($guard)->check()) {
            return route('admin.dashboard');
        }

        if (auth()->guard($guard)->check()) {
            return route('home');
        }
    }
}
