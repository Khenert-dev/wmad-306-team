<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition(): array
    {
        // Comments should only be made by students
        $student = User::role('student')->inRandomOrder()->first();
        // Ideally, comments are only on published articles, but we'll grab any for dummy data
        $article = Article::inRandomOrder()->first();

        return [
            'article_id' => $article->id ?? Article::factory(),
            'student_id' => $student->id ?? User::factory(),
            'content' => $this->faker->sentence(10),
        ];
    }
}
