<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ArticlePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can create an article (Draft).
     */
    public function create(User $user): bool
    {
        return $user->hasRole('writer');
    }

    /**
     * Determine whether the user can update the article.
     * Only the original writer can edit it.
     */
    public function update(User $user, Article $article): bool
    {
        return $user->hasRole('writer') && $user->id === $article->writer_id;
    }

    /**
     * Determine whether the user can submit the article.
     */
    public function submit(User $user, Article $article): bool
    {
        // Must be the original writer, and the article must currently be a draft or need revision
        return $user->hasRole('writer') 
            && $user->id === $article->writer_id 
            && in_array($article->status->name, ['draft', 'needs_revision']);
    }

    /**
     * Determine whether the user can request a revision.
     */
    public function requestRevision(User $user, Article $article): bool
    {
        // Only editors can request revisions on submitted articles
        return $user->hasRole('editor') && $article->status->name === 'submitted';
    }

    /**
     * Determine whether the user can publish the article.
     */
    public function publish(User $user, Article $article): bool
    {
        // Only editors can publish submitted articles
        return $user->hasRole('editor') && $article->status->name === 'submitted';
    }
}