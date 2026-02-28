<?php

use App\Http\Controllers\EditorController;
use App\Models\Article;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\WriterController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Landing Page (Accessible to guests)
Route::get('/', function () {
    $recentPublications = Article::query()
        ->with(['writer', 'category', 'status'])
        ->whereHas('status', fn ($query) => $query->where('name', 'published'))
        ->latest('updated_at')
        ->take(6)
        ->get();

    return Inertia::render('Welcome', [
        'recentPublications' => $recentPublications,
    ]);
})->name('welcome');

// Public Article Preview
Route::get('/publications/{article}', function (Article $article) {
    $article->load(['writer', 'editor', 'category', 'status', 'comments.student']);

    if ($article->status?->name !== 'published') {
        abort(404);
    }

    $latestPublications = Article::query()
        ->with(['writer', 'category', 'status'])
        ->whereHas('status', fn ($query) => $query->where('name', 'published'))
        ->where('id', '!=', $article->id)
        ->latest('updated_at')
        ->take(4)
        ->get();

    return Inertia::render('Publications/Show', [
        'article' => $article,
        'latestPublications' => $latestPublications,
    ]);
})->name('publications.show');

// Main Authenticated Dashboard / Universal Home Feed
Route::get('/dashboard', function () {
    $recentPublications = Article::query()
        ->with(['writer', 'category', 'status'])
        ->whereHas('status', fn ($query) => $query->where('name', 'published'))
        ->latest('updated_at')
        ->take(6)
        ->get();

    return Inertia::render('Dashboard', [
        'recentPublications' => $recentPublications,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile Management
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Writer Workspace
Route::middleware(['auth', 'role:writer'])->group(function () {
    Route::get('/writer/dashboard', [WriterController::class, 'dashboard'])->name('writer.dashboard');
    Route::post('/articles', [WriterController::class, 'store'])->name('articles.store');
    Route::post('/articles/{article}/submit', [WriterController::class, 'submit'])->name('articles.submit');
    Route::put('/articles/{article}/revise', [WriterController::class, 'revise'])->name('articles.revise');
});

// Editor Workspace
Route::middleware(['auth', 'role:editor'])->group(function () {
    Route::get('/editor/dashboard', [EditorController::class, 'review'])->name('editor.dashboard');
    Route::post('/articles/{article}/revision', [EditorController::class, 'requestRevision'])->name('articles.revision');
    Route::post('/articles/{article}/publish', [EditorController::class, 'publish'])->name('articles.publish');
    Route::patch('/articles/{article}/cover-image', [EditorController::class, 'updateCoverImage'])->name('articles.cover-image');
});

// Student Workspace
Route::middleware(['auth', 'role:student'])->group(function () {
    Route::get('/student/dashboard', [StudentController::class, 'studentDashboard'])->name('student.dashboard');
    Route::post('/articles/{article}/comment', [StudentController::class, 'comment'])->name('articles.comment');
});

require __DIR__.'/auth.php';
require __DIR__.'/sample.php';