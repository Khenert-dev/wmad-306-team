<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\User;
use App\Models\ArticleStatus;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    protected $model = Article::class;

    public function definition(): array
    {
        // Grab random IDs for our foreign keys
        $writer = User::role('writer')->inRandomOrder()->first();
        $editor = User::role('editor')->inRandomOrder()->first();
        $status = ArticleStatus::inRandomOrder()->first();
        $category = Category::inRandomOrder()->first();

        return [
            'title' => $this->faker->sentence(),
            // Jodit editor uses HTML, so let's generate some basic HTML paragraphs
            'content' => '<p>' . implode('</p><p>', $this->faker->paragraphs(4)) . '</p>',
            'status_id' => $status->id ?? 1,
            'category_id' => $category->id ?? 1,
            'writer_id' => $writer->id ?? User::factory(),
            'editor_id' => $editor->id ?? null,
        ];
    }
}