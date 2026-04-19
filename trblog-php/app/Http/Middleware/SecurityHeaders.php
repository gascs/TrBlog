<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // 防止浏览器猜测MIME类型
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        
        // 防止点击劫持
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        
        // 启用浏览器的XSS过滤器
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        
        // 强制使用HTTPS
        $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        
        // 控制Referer头的发送
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        return $response;
    }
}
