<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleStatus;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class WriterController extends Controller
{
    /**
     * Display the Writer Dashboard
     */
    public function index(Request $request)
    {
        $articles = $request->user()->articles()->with(['status', 'category'])->latest()->get();
        $categories = Category::all();

        return Inertia::render('Writer/Dashboard', [
            'articles' => $articles,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a new Draft
     */
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

    /**
     * Submit an article for review
     */
    public function submit(Article $article)
    {
        Gate::authorize('submit', $article);

        $submittedStatus = ArticleStatus::where('name', 'submitted')->first();
        
        $article->update(['status_id' => $submittedStatus->id]);

        // (Phase 5: You would trigger the ArticleSubmittedNotification here)

        return redirect()->back()->with('success', 'Article submitted for review!');
    }

    /**
     * Update/Revise an article
     */
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