<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'writer_tier',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the dynamically calculated writer tier based on published articles.
     */
    public function getWriterTierAttribute(): string
    {
        $publishedCount = $this->writtenArticles()->whereHas('status', function ($query) {
            $query->where('name', 'published');
        })->count();

        if ($publishedCount >= 20) return 'Expert Strategist';
        if ($publishedCount >= 10) return 'Senior Columnist';
        if ($publishedCount >= 5) return 'Seasoned Author';
        if ($publishedCount >= 1) return 'Junior Contributor';
        
        return 'Entry-Level Writer';
    }

    public function writtenArticles(): HasMany
    {
        return $this->hasMany(Article::class, 'writer_id');
    }

    public function editedArticles(): HasMany
    {
        return $this->hasMany(Article::class, 'editor_id');
    }

    public function revisions(): HasMany
    {
        return $this->hasMany(Revision::class, 'editor_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'student_id');
    }
}