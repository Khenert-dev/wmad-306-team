<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\Revision;
use App\Models\Comment;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed the foundations first!
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            ArticleStatusSeeder::class,
            CategorySeeder::class,
        ]);

        // 2. Generate Dummy Data using Factories
        // Generate 20 random articles
        Article::factory(20)->create();

        // Generate 10 random revisions for editor feedback
        Revision::factory(10)->create();

        // Generate 30 random comments from students
        Comment::factory(30)->create();
    }
}