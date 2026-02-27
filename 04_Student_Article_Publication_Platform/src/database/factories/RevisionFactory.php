<?php

namespace Database\Factories;

use App\Models\Revision;
use App\Models\Article;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RevisionFactory extends Factory
{
    protected $model = Revision::class;

    public function definition(): array
    {
        $editor = User::role('editor')->inRandomOrder()->first();
        
        return [
            'article_id' => Article::inRandomOrder()->first()->id ?? Article::factory(),
            'editor_id' => $editor->id ?? User::factory(),
            'comments' => $this->faker->paragraph(),
        ];
    }
}