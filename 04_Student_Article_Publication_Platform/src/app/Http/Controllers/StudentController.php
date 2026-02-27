<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class StudentController extends Controller
{
    /**
     * Display the Student Dashboard
     */
    public function studentDashboard()
    {
        $publishedStatus = ArticleStatus::where('name', 'published')->first();

        // Load published articles with their writer, category, and approved comments
        $articles = Article::with(['writer', 'category', 'comments.student'])
            ->where('status_id', $publishedStatus->id)
            ->latest()
            ->get();

        return Inertia::render('Student/Dashboard', [
            'articles' => $articles,
        ]);
    }

    /**
     * Post a comment on an article
     */
    public function comment(Request $request, Article $article)
    {
        Gate::authorize('comment', $article);

        $validated = $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        $article->comments()->create([
            'student_id' => $request->user()->id,
            'content' => $validated['content'],
        ]);

        // (Phase 5: You would trigger the CommentPostedNotification here)

        return redirect()->back()->with('success', 'Comment posted successfully!');
    }
}