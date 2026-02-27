import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Alert, Box, Button, Card, CardContent, Chip, Paper, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';

const fallbackImage =
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80';

const stripHtml = (value) => value?.replace(/<[^>]*>?/gm, '') ?? '';

export default function StudentDashboard({ publishedArticles, featuredArticle, latestPublications, myComments, flash }) {
    const articlePool = useMemo(() => {
        if (latestPublications?.length > 0) {
            return latestPublications;
        }

        return publishedArticles ?? [];
    }, [latestPublications, publishedArticles]);

    const heroArticle = featuredArticle ?? articlePool[0] ?? null;
    const heroImage = heroArticle?.cover_image_url || fallbackImage;

    return (
        <AuthenticatedLayout
            header={
                <Stack spacing={0.25}>
                    <Typography variant="h4">Student Dashboard</Typography>
                    <Typography color="text.secondary">
                        Read published journals and leave feedback.
                    </Typography>
                </Stack>
            }
            fullWidth
        >
            <Head title="Student Dashboard" />

            <Stack spacing={2.5}>
                {flash?.success && <Alert severity="success">{flash.success}</Alert>}

                <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box
                        sx={{
                            minHeight: { xs: 220, md: 280 },
                            backgroundImage: `linear-gradient(115deg, rgba(8, 16, 35, 0.76), rgba(25, 63, 138, 0.35)), url(${heroImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'flex-end',
                        }}
                    >
                        <Box sx={{ p: { xs: 2.25, md: 3 }, color: '#fff' }}>
                            <Typography variant="overline" sx={{ opacity: 0.9 }}>Featured Journal</Typography>
                            <Typography variant="h4" sx={{ color: '#fff', maxWidth: 760 }}>
                                {heroArticle?.title ?? 'Latest Published Articles'}
                            </Typography>
                            <Typography sx={{ mt: 0.75, maxWidth: 760, color: 'rgba(255,255,255,0.9)' }}>
                                {stripHtml(heroArticle?.content).slice(0, 170) || 'Explore the latest campus publications.'}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                                <Chip label={`${publishedArticles.length} Published`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: '#fff' }} />
                                <Chip label={`${myComments.length} My Comments`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: '#fff' }} />
                            </Stack>
                        </Box>
                    </Box>
                </Paper>

                <Paper sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6">Latest Publications</Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.6, mb: 2 }}>
                        Clean feed of the latest published journals.
                    </Typography>

                    <Stack spacing={1.5}>
                        {articlePool.slice(0, 6).map((article) => (
                            <Card key={article.id}>
                                <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                                    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: '220px 1fr' }, alignItems: 'start' }}>
                                        <Box
                                            sx={{
                                                minHeight: 120,
                                                borderRadius: 2,
                                                backgroundImage: `url(${article.cover_image_url || fallbackImage})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        />
                                        <Box>
                                            <Typography variant="h6">{article.title}</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                                {article.category?.name} • {article.writer?.name}
                                            </Typography>
                                            <Typography color="text.secondary" sx={{ mt: 0.8 }}>
                                                {stripHtml(article.content).slice(0, 170)}...
                                            </Typography>

                                            <Button sx={{ mt: 1.1, px: 0 }} component={Link} href={route('publications.show', article.id)}>
                                                Read Article
                                            </Button>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                </Paper>

                <Paper sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>My Recent Comments</Typography>
                    <Stack spacing={1}>
                        {myComments.length === 0 ? (
                            <Typography color="text.secondary">No comments yet.</Typography>
                        ) : (
                            myComments.slice(0, 10).map((comment) => (
                                <Paper key={comment.id} variant="outlined" sx={{ p: 1.25 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {comment.content}
                                    </Typography>
                                </Paper>
                            ))
                        )}
                    </Stack>
                </Paper>
            </Stack>
        </AuthenticatedLayout>
    );
}
