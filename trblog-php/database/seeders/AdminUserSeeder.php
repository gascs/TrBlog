<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
        ]);

        // Create editor user
        User::create([
            'name' => 'Editor',
            'email' => 'editor@example.com',
            'password' => bcrypt('editor123'),
            'role' => 'editor',
        ]);

        // Create regular user
        User::create([
            'name' => 'User',
            'email' => 'user@example.com',
            'password' => bcrypt('user123'),
            'role' => 'user',
        ]);
    }
}