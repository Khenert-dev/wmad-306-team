<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use HasFactory, SoftDeletes; // Enables soft deletes

    protected $fillable = [
        'title', 'content', 'status_id', 'writer_id', 'editor_id', 'category_id'
    ];

    // Relationships
    public function writer()
    {
        return $this->belongsTo(User::class, 'writer_id');
    }

    public function editor()
    {
        return $this->belongsTo(User::class, 'editor_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function status()
    {
        return $this->belongsTo(ArticleStatus::class, 'status_id');
    }

    public function revisions()
    {
        return $this->hasMany(Revision::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Helper method for readability 
    public function isPublished(): bool
    {
        return $this->status->name === 'published'; 
    }
}