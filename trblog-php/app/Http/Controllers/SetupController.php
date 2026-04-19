<?php

namespace App\Http\Controllers;

use App\Http\Requests\SetupRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Artisan;
use Illuminate\View\View;

class SetupController extends Controller
{
    /**
     * Show the setup form.
     */
    public function index(): View
    {
        return view('setup.index');
    }

    /**
     * Handle the setup form submission.
     */
    public function store(SetupRequest $request): RedirectResponse
    {
        // Update .env file
        $this->updateEnvFile($request->validated());

        // Run database migrations
        Artisan::call('migrate');

        // Create admin user
        Artisan::call('db:seed', ['--class' => 'AdminUserSeeder']);

        // Mark setup as complete
        file_put_contents(storage_path('app/setup_complete'), '1');

        return redirect()->route('login')->with('success', 'Setup completed successfully. Please login with the admin credentials.');
    }

    /**
     * Update the .env file with the provided configuration.
     */
    protected function updateEnvFile(array $data): void
    {
        $envFile = base_path('.env');
        $envContent = file_get_contents($envFile);

        // Update database configuration
        $envContent = preg_replace('/DB_CONNECTION=.*/', 'DB_CONNECTION='.$data['db_connection'], $envContent);
        $envContent = preg_replace('/DB_HOST=.*/', 'DB_HOST='.$data['db_host'], $envContent);
        $envContent = preg_replace('/DB_PORT=.*/', 'DB_PORT='.$data['db_port'], $envContent);
        $envContent = preg_replace('/DB_DATABASE=.*/', 'DB_DATABASE='.$data['db_database'], $envContent);
        $envContent = preg_replace('/DB_USERNAME=.*/', 'DB_USERNAME='.$data['db_username'], $envContent);
        $envContent = preg_replace('/DB_PASSWORD=.*/', 'DB_PASSWORD='.$data['db_password'], $envContent);

        // Update app configuration
        $envContent = preg_replace('/APP_NAME=.*/', 'APP_NAME='.$data['app_name'], $envContent);
        $envContent = preg_replace('/APP_URL=.*/', 'APP_URL='.$data['app_url'], $envContent);

        file_put_contents($envFile, $envContent);
    }
}
