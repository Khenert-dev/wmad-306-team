<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Notifications\CommentPostedNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StudentController extends Controller
{
    public function studentDashboard(Request $request): Response
    {
        $publishedArticles = Article::query()
            ->with(['writer', 'category', 'comments.student', 'status'])
            ->whereHas('status', fn ($query) => $query->where('name', 'published'))
            ->latest('updated_at')
            ->get();

        $featuredArticle = $publishedArticles->first();
        $latestPublications = $publishedArticles->take(6)->values();

        $studentComments = $publishedArticles
            ->flatMap(fn ($article) => $article->comments)
            ->where('student_id', $request->user()->id)
            ->values();

        return Inertia::render('Student/Dashboard', [
            'publishedArticles' => $publishedArticles,
            'featuredArticle' => $featuredArticle,
            'latestPublications' => $latestPublications,
            'myComments' => $studentComments,
        ]);
    }

    public function comment(Request $request, Article $article): RedirectResponse
    {
        $article->load('status', 'writer', 'editor');
        $this->authorize('comment', $article);

        $validated = $request->validate([
            'content' => ['required', 'string', 'max:2000'],
        ]);

        $comment = $article->comments()->create([
            'student_id' => $request->user()->id,
            'content' => $validated['content'],
        ]);

        $article->writer?->notify(new CommentPostedNotification($article, $comment));
        $article->editor?->notify(new CommentPostedNotification($article, $comment));

        return back()->with('success', 'Comment posted.');
    }
}
