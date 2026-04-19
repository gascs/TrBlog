<?php

use Illuminate\Foundation\Inspiring;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|\n| This file is where you may define all of your Closure based console commands.
| Each Closure is bound to a command instance allowing a simple approach to
| defining console commands without requiring a full command class.
|\n*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
