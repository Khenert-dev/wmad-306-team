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
    public function create(): Response
    {
        return Inertia::render('Writer/Create', [
            'categories' => Category::query()->orderBy('name')->get(),
        ]);
    }

    public function dashboard(Request $request): Response
    {
        $articles = Article::query()
            ->with(['status', 'category', 'editor', 'revisions'])
            ->where('writer_id', $request->user()->id)
            ->latest('updated_at')
            ->get();

        return Inertia::render('Writer/Dashboard', [
            'articles' => $articles,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $this->authorize('create', Article::class);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'category_id' => ['required', 'exists:categories,id'],
            'action' => ['nullable', 'in:draft,submit'],
        ]);

        $requestedAction = $validated['action'] ?? 'draft';
        $articlePayload = collect($validated)->except('action')->all();
        $draftStatusId = ArticleStatus::query()->where('name', 'draft')->value('id');
        $submittedStatusId = ArticleStatus::query()->where('name', 'submitted')->value('id');

        $article = Article::query()->create([
            ...$articlePayload,
            'writer_id' => $request->user()->id,
            'status_id' => $requestedAction === 'submit' ? $submittedStatusId : $draftStatusId,
        ]);

        if ($requestedAction === 'submit') {
            $editors = User::role('editor')->get();
            foreach ($editors as $editor) {
                $editor->notify(new ArticleSubmittedNotification($article));
            }

            return redirect()->route('writer.dashboard')
                ->with('success', 'Article submitted for review.');
        }

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
