<?php

namespace App\Notifications;

use App\Models\Article;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ArticleSubmitted extends Notification
{
    use Queueable;

    protected $article;

    public function __construct(Article $article)
    {
        $this->article = $article;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('New Submission: ' . $this->article->title)
            ->greeting('Hello Editor,')
            ->line('A new article has been submitted for your review.')
            ->line('**Title:** ' . $this->article->title)
            ->line('**Writer:** ' . $this->article->writer->name)
            ->action('Review Submission', url('/editor/dashboard'))
            ->line('Please check the editor dashboard to publish or request revisions.');
    }
}