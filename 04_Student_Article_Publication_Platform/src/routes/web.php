<?php

use App\Http\Controllers\EditorController;
use App\Models\Article;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\WriterController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
});

Route::get('/dashboard', function () {
    $user = auth()->user();

    if ($user?->hasRole('writer')) {
        return to_route('writer.dashboard');
    }

    if ($user?->hasRole('editor')) {
        return to_route('editor.dashboard');
    }

    if ($user?->hasRole('student')) {
        return to_route('student.dashboard');
    }

    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'role:writer'])->group(function () {
    Route::get('/writer/dashboard', [WriterController::class, 'dashboard'])->name('writer.dashboard');
    Route::post('/articles', [WriterController::class, 'store'])->name('articles.store');
    Route::post('/articles/{article}/submit', [WriterController::class, 'submit'])->name('articles.submit');
    Route::put('/articles/{article}/revise', [WriterController::class, 'revise'])->name('articles.revise');
});

Route::middleware(['auth', 'role:editor'])->group(function () {
    Route::get('/editor/dashboard', [EditorController::class, 'review'])->name('editor.dashboard');
    Route::post('/articles/{article}/revision', [EditorController::class, 'requestRevision'])->name('articles.revision');
    Route::post('/articles/{article}/publish', [EditorController::class, 'publish'])->name('articles.publish');
    Route::patch('/articles/{article}/cover-image', [EditorController::class, 'updateCoverImage'])->name('articles.cover-image');
});

Route::middleware(['auth', 'role:student'])->group(function () {
    Route::get('/student/dashboard', [StudentController::class, 'studentDashboard'])->name('student.dashboard');
    Route::post('/articles/{article}/comment', [StudentController::class, 'comment'])->name('articles.comment');
});

require __DIR__.'/auth.php';
require __DIR__.'/sample.php';
