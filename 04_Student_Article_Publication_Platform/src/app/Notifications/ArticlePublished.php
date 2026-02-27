<?php

namespace App\Notifications;

use App\Models\Article;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ArticlePublished extends Notification
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
            ->subject('Your Article is Live!')
            ->greeting('Congratulations!')
            ->line('Your article "' . $this->article->title . '" has been approved and published.')
            ->line('It is now visible to all students on the campus feed.')
            ->action('View My Article', url('/student/dashboard'))
            ->line('Thank you for contributing to CampusPress!');
    }
}