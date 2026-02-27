<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleStatus;
use App\Notifications\ArticlePublished; // Added
use App\Notifications\RevisionRequested; // Added
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class EditorController extends Controller
{
    /**
     * Display the Editor Dashboard
     */
    public function index()
    {
        $submittedStatus = ArticleStatus::where('name', 'submitted')->first();
        $publishedStatus = ArticleStatus::where('name', 'published')->first();

        $pendingArticles = Article::with(['writer', 'category'])
            ->where('status_id', $submittedStatus->id)
            ->latest()
            ->get();

        $publishedArticles = Article::with(['writer', 'category'])
            ->where('status_id', $publishedStatus->id)
            ->latest()
            ->get();

        return Inertia::render('Editor/Dashboard', [
            'pendingArticles' => $pendingArticles,
            'publishedArticles' => $publishedArticles,
        ]);
    }

    /**
     * Request a revision from the writer
     */
    public function requestRevision(Request $request, Article $article)
    {
        Gate::authorize('requestRevision', $article);

        $validated = $request->validate([
            'comments' => 'required|string',
        ]);

        $needsRevisionStatus = ArticleStatus::where('name', 'needs_revision')->first();

        // 1. Update article status
        $article->update([
            'status_id' => $needsRevisionStatus->id,
            'editor_id' => $request->user()->id,
        ]);

        // 2. Log the revision request transparently
        $article->revisions()->create([
            'editor_id' => $request->user()->id,
            'comments' => $validated['comments'],
        ]);

        // --- TRIGGER NOTIFICATION ---
        // Notify the writer and pass the comments to the email
        $article->writer->notify(new RevisionRequested($article, $validated['comments']));

        return redirect()->back()->with('success', 'Revision requested successfully.');
    }

    /**
     * Publish an article
     */
    public function publish(Request $request, Article $article)
    {
        Gate::authorize('publish', $article);

        $publishedStatus = ArticleStatus::where('name', 'published')->first();

        $article->update([
            'status_id' => $publishedStatus->id,
            'editor_id' => $request->user()->id,
        ]);

        // --- TRIGGER NOTIFICATION ---
        // Notify the writer that their work is now live
        $article->writer->notify(new ArticlePublished($article));

        return redirect()->back()->with('success', 'Article published successfully!');
    }
}