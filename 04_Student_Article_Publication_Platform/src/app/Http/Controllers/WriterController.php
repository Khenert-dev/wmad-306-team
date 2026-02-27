<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleStatus;
use App\Models\Category;
use App\Models\User;
use App\Notifications\ArticleSubmittedNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WriterController extends Controller
{
    public function dashboard(Request $request): Response
    {
        $articles = Article::query()
            ->with(['status', 'category', 'editor', 'revisions'])
            ->where('writer_id', $request->user()->id)
            ->latest('updated_at')
            ->get();

        return Inertia::render('Writer/Dashboard', [
            'articles' => $articles,
            'categories' => Category::query()->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('create', Article::class);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'category_id' => ['required', 'exists:categories,id'],
        ]);

        $draftStatusId = ArticleStatus::query()->where('name', 'draft')->value('id');

        Article::query()->create([
            ...$validated,
            'writer_id' => $request->user()->id,
            'status_id' => $draftStatusId,
        ]);

        return back()->with('success', 'Draft saved successfully.');
    }

    public function submit(Request $request, Article $article): RedirectResponse
    {
        $article->load('status');
        $this->authorize('submit', $article);

        $submittedStatusId = ArticleStatus::query()->where('name', 'submitted')->value('id');

        $article->update([
            'status_id' => $submittedStatusId,
        ]);

        $editors = User::role('editor')->get();
        foreach ($editors as $editor) {
            $editor->notify(new ArticleSubmittedNotification($article));
        }

        return back()->with('success', 'Article submitted for review.');
    }

    public function revise(Request $request, Article $article): RedirectResponse
    {
        $article->load('status');
        $this->authorize('revise', $article);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'category_id' => ['required', 'exists:categories,id'],
        ]);

        $submittedStatusId = ArticleStatus::query()->where('name', 'submitted')->value('id');

        $article->update([
            ...$validated,
            'status_id' => $submittedStatusId,
        ]);

        $editors = User::role('editor')->get();
        foreach ($editors as $editor) {
            $editor->notify(new ArticleSubmittedNotification($article));
        }

        return back()->with('success', 'Revision submitted successfully.');
    }
}
