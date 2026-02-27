<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleStatus;
use App\Models\Category;
use App\Models\User; // Added for finding editors
use App\Notifications\ArticleSubmitted; // Added
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class WriterController extends Controller
{
    public function index(Request $request)
    {
        $articles = $request->user()->articles()->with(['status', 'category'])->latest()->get();
        $categories = Category::all();

        return Inertia::render('Writer/Dashboard', [
            'articles' => $articles,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        Gate::authorize('create', Article::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $draftStatus = ArticleStatus::where('name', 'draft')->first();

        $request->user()->articles()->create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'category_id' => $validated['category_id'],
            'status_id' => $draftStatus->id,
        ]);

        return redirect()->back()->with('success', 'Draft saved successfully!');
    }

    public function submit(Article $article)
    {
        Gate::authorize('submit', $article);

        $submittedStatus = ArticleStatus::where('name', 'submitted')->first();
        
        $article->update(['status_id' => $submittedStatus->id]);

        // --- TRIGGER NOTIFICATION ---
        // Find all users who have the 'editor' role
        $editors = User::role('editor')->get();
        
        // Notify each editor
        foreach ($editors as $editor) {
            $editor->notify(new ArticleSubmitted($article));
        }

        return redirect()->back()->with('success', 'Article submitted for review!');
    }

    public function revise(Request $request, Article $article)
    {
        Gate::authorize('update', $article);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $article->update($validated);

        return redirect()->back()->with('success', 'Article updated successfully!');
    }
}