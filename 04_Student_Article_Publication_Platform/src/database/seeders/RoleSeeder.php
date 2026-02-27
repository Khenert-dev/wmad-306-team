<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        Role::create(['name' => 'writer']);
        Role::create(['name' => 'editor']);
        Role::create(['name' => 'student']);
    }
}