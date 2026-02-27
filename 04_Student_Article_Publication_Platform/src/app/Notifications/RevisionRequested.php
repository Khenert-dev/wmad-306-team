<?php

namespace App\Notifications;

use App\Models\Article;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RevisionRequested extends Notification
{
    use Queueable;

    protected $article;
    protected $comments;

    public function __construct(Article $article, $comments)
    {
        $this->article = $article;
        $this->comments = $comments;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Revision Required: ' . $this->article->title)
            ->greeting('Hello ' . $this->article->writer->name . ',')
            ->line('An editor has reviewed your article and requested some changes.')
            ->line('**Editor Feedback:**')
            ->line('"' . $this->comments . '"')
            ->action('Edit Article', url('/writer/dashboard'))
            ->line('Once you have made the changes, you can resubmit it for review.');
    }
}