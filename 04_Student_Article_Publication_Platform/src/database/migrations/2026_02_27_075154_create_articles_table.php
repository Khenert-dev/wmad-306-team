<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('content');
            
            // Foreign Keys with indexes
            $table->foreignId('status_id')->index()->constrained('article_statuses');
            $table->foreignId('category_id')->index()->constrained('categories');
            $table->foreignId('writer_id')->index()->constrained('users');
            $table->foreignId('editor_id')->nullable()->index()->constrained('users');
            
            $table->timestamps(); // Adds created_at and updated_at [cite: 27, 32]
            $table->softDeletes(); // Allows recovery of deleted articles [cite: 27, 31]
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};