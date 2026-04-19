<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Cookie Path
    |--------------------------------------------------------------------------
    |
    | The default path for all cookies created by your application. The default
    | is set to "/" which will make all cookies available for your entire
    | application, on all paths within your application's domain.
    |
    */

    'path' => '/',

    /*
    |--------------------------------------------------------------------------
    | Default Cookie Domain
    |--------------------------------------------------------------------------
    |
    | Here you may change the default domain for all cookies created by your
    | application. This will determine which domains the cookies are available
    | to. A sensible default has been set. So you do not need to change this
    | value unless you have a specific need to do so.
    |
    */

    'domain' => env('COOKIE_DOMAIN'),

    /*
    |--------------------------------------------------------------------------
    | HTTPS Only Cookies
    |--------------------------------------------------------------------------
    |
    | By setting this option to true, cookies will only be sent back to the
    | server if the browser has a HTTPS connection. This will keep your
    | cookies secure as they will not be sent over insecure connections.
    |
    */

    'secure' => env('COOKIE_SECURE', false),

    /*
    |--------------------------------------------------------------------------
    | HTTP Access Only
    |--------------------------------------------------------------------------
    |
    | Setting this value to true will prevent JavaScript from accessing the
    | value of the cookie and the cookie will only be accessible through
    | the HTTP protocol. You are free to modify this option if needed.
    |
    */

    'http_only' => true,

    /*
    |--------------------------------------------------------------------------
    | Same-Site Cookies
    |--------------------------------------------------------------------------
    |
    | This option determines how your cookies behave when cross-site requests
    | take place, and can be used to mitigate CSRF attacks. By default, we
    | will set this value to "lax" since this is a secure default value.
    |
    | Supported: "lax", "strict", "none", null
    |
    */

    'same_site' => 'lax',

];
