<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleStatus;
use App\Notifications\ArticlePublishedNotification;
use App\Notifications\RevisionRequestedNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EditorController extends Controller
{
    public function review(): Response
    {
        $submittedArticles = Article::query()
            ->with(['writer', 'category', 'status'])
            ->whereHas('status', fn ($query) => $query->where('name', 'submitted'))
            ->latest('updated_at')
            ->get();

        $publishedArticles = Article::query()
            ->with(['writer', 'category', 'status'])
            ->whereHas('status', fn ($query) => $query->where('name', 'published'))
            ->latest('updated_at')
            ->get();

        return Inertia::render('Editor/Dashboard', [
            'submittedArticles' => $submittedArticles,
            'publishedArticles' => $publishedArticles,
        ]);
    }

    public function requestRevision(Request $request, Article $article): RedirectResponse
    {
        $article->load('status', 'writer');
        $this->authorize('requestRevision', $article);

        $validated = $request->validate([
            'comments' => ['required', 'string', 'max:3000'],
        ]);

        $needsRevisionStatusId = ArticleStatus::query()->where('name', 'needs_revision')->value('id');

        $article->update([
            'status_id' => $needsRevisionStatusId,
            'editor_id' => $request->user()->id,
        ]);

        $article->revisions()->create([
            'editor_id' => $request->user()->id,
            'comments' => $validated['comments'],
        ]);

        $article->writer->notify(new RevisionRequestedNotification($article, $validated['comments']));

        return back()->with('success', 'Revision requested from writer.');
    }

    public function publish(Request $request, Article $article): RedirectResponse
    {
        $article->load('status', 'writer');
        $this->authorize('publish', $article);

        $publishedStatusId = ArticleStatus::query()->where('name', 'published')->value('id');

        $article->update([
            'status_id' => $publishedStatusId,
            'editor_id' => $request->user()->id,
        ]);

        $article->writer->notify(new ArticlePublishedNotification($article));

        return back()->with('success', 'Article published successfully.');
    }

    public function updateCoverImage(Request $request, Article $article): RedirectResponse
    {
        $rawCoverImageUrl = trim((string) $request->input('cover_image_url', ''));
        $normalizedCoverImageUrl = $rawCoverImageUrl === ''
            ? null
            : (preg_match('/^[a-z][a-z0-9+\-.]*:\/\//i', $rawCoverImageUrl)
                ? $rawCoverImageUrl
                : 'https://' . $rawCoverImageUrl);

        $request->merge([
            'cover_image_url' => $normalizedCoverImageUrl,
        ]);

        $validated = $request->validate([
            'cover_image_url' => ['nullable', 'url', 'max:5000'],
        ]);

        $article->update([
            'cover_image_url' => $validated['cover_image_url'] ?? null,
        ]);

        return back()->with('success', 'Article cover image updated.');
    }
}
