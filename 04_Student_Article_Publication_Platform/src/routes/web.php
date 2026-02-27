<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WriterController;
use App\Http\Controllers\EditorController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Redirect root to login
Route::get('/', function () {
    return redirect()->route('login');
});

// All platform routes require the user to be logged in
Route::middleware(['auth', 'verified'])->group(function () {

    // ---------------------------------------------------------
    // WRITER ROUTES [cite: 69]
    // ---------------------------------------------------------
    Route::middleware(['role:writer'])->group(function () {
        Route::get('/writer/dashboard', [WriterController::class, 'index'])->name('writer.dashboard');
        
        // Article Draft & Edit workflows
        Route::post('/articles', [WriterController::class, 'store'])->name('articles.store');
        Route::put('/articles/{article}', [WriterController::class, 'revise'])->name('articles.revise');
        
        // Submission workflow
        Route::post('/articles/{article}/submit', [WriterController::class, 'submit'])->name('articles.submit');
    });

    // ---------------------------------------------------------
    // EDITOR ROUTES [cite: 70-71]
    // ---------------------------------------------------------
    Route::middleware(['role:editor'])->group(function () {
        Route::get('/editor/dashboard', [EditorController::class, 'index'])->name('editor.dashboard');
        
        // Review workflows
        Route::post('/articles/{article}/revision', [EditorController::class, 'requestRevision'])->name('articles.revision');
        Route::post('/articles/{article}/publish', [EditorController::class, 'publish'])->name('articles.publish');
    });

    // ---------------------------------------------------------
    // STUDENT ROUTES [cite: 72]
    // ---------------------------------------------------------
    Route::middleware(['role:student'])->group(function () {
        Route::get('/student/dashboard', [StudentController::class, 'studentDashboard'])->name('student.dashboard');
        
        // Commenting workflow
        Route::post('/articles/{article}/comment', [StudentController::class, 'comment'])->name('articles.comment');
    });

    // ---------------------------------------------------------
    // STANDARD BREEZE PROFILE ROUTES
    // ---------------------------------------------------------
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Load the Auth routes (Login / Register) provided by Laravel Breeze 
require __DIR__.'/auth.php';