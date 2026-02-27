<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\ArticleStatus;
use App\Models\Comment;
use App\Models\Revision;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            CategorySeeder::class,
            ArticleStatusSeeder::class,
            UserSeeder::class,
        ]);

        $submittedStatusId = ArticleStatus::query()->where('name', 'submitted')->value('id');
        $publishedStatusId = ArticleStatus::query()->where('name', 'published')->value('id');
        $needsRevisionStatusId = ArticleStatus::query()->where('name', 'needs_revision')->value('id');

        Article::factory()->count(4)->create([
            'status_id' => $submittedStatusId,
        ]);
        Article::factory()->count(4)->create([
            'status_id' => $publishedStatusId,
        ]);
        Article::factory()->count(2)->create([
            'status_id' => $needsRevisionStatusId,
        ]);

        Revision::factory()->count(4)->create();
        Comment::factory()->count(8)->create();

        User::factory(2)->create()->each(function (User $user): void {
            $user->assignRole('student');
        });
    }
}
