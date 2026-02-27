<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Article;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can comment on a specific article.
     */
    public function comment(User $user, Article $article): bool
    {
        // User must be a student and the article must be published
        return $user->hasRole('student') && $article->status->name === 'published';
    }
}