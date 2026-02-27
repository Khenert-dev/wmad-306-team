<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('password'); // Standard easy password for testing

        $writer = User::factory()->create([
            'name' => 'Writer Doe',
            'email' => 'writer@example.com',
            'password' => $password,
        ]);
        $writer->assignRole('writer');

        $editor = User::factory()->create([
            'name' => 'Editor Smith',
            'email' => 'editor@example.com',
            'password' => $password,
        ]);
        $editor->assignRole('editor');

        $student = User::factory()->create([
            'name' => 'Student Jones',
            'email' => 'student@example.com',
            'password' => $password,
        ]);
        $student->assignRole('student');
    }
}