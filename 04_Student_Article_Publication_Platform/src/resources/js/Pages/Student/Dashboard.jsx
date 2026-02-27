import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import CoolButton from '@/Components/CoolButton';
import { Alert, Box, Chip, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const fallbackImage =
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80';

const stripHtml = (value) => value?.replace(/<[^>]*>?/gm, '') ?? '';

export default function StudentDashboard({ publishedArticles, featuredArticle, latestPublications, myComments, flash }) {
    const [commentDrafts, setCommentDrafts] = useState({});

    const heroImage = featuredArticle?.cover_image_url || fallbackImage;
    const getPub = (index) => latestPublications[index] ?? latestPublications[0];

    const postComment = (articleId) => {
        router.post(route('articles.comment', articleId), {
            content: commentDrafts[articleId] ?? '',
        });
    };

    return (
        <AuthenticatedLayout header={<Typography variant="h4">Student Reading Dashboard</Typography>} fullWidth>
            <Head title="Student Dashboard" />

            <Stack spacing={3}>
                {flash?.success && <Alert severity="success">{flash.success}</Alert>}

                <Box
                    sx={{
                        minHeight: { xs: 280, md: 360 },
                        borderRadius: 2,
                        overflow: 'hidden',
                        position: 'relative',
                        backgroundImage: `linear-gradient(120deg, rgba(17,24,39,0.62), rgba(17,24,39,0.28)), url(${heroImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: { md: 'fixed' },
                        display: 'flex',
                        alignItems: 'flex-end',
                    }}
                >
                    <Box sx={{ p: { xs: 2.5, md: 4 }, color: '#fff', width: '100%' }}>
                        <Typography variant="overline" sx={{ letterSpacing: '0.08em', opacity: 0.9 }}>
                            Featured Publication
                        </Typography>
                        <Typography variant="h4" sx={{ color: '#fff', maxWidth: 760 }}>
                            {featuredArticle?.title ?? 'Published Articles'}
                        </Typography>
                        <Typography sx={{ mt: 1, maxWidth: 760, color: 'rgba(255,255,255,0.92)' }}>
                            {stripHtml(featuredArticle?.content).slice(0, 220) || 'Explore the latest published student articles below.'}
                        </Typography>
                    </Box>
                </Box>

                <Paper sx={{ p: { xs: 2, md: 3 } }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
                        <Box>
                            <Typography variant="h5">Latest Publications</Typography>
                            <Typography color="text.secondary">
                                Styled in a premium bento layout and ordered by latest published entries.
                            </Typography>
                        </Box>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                            <Chip label={`Published: ${publishedArticles.length}`} size="small" />
                            <Chip label={`My Comments: ${myComments.length}`} size="small" />
                        </Stack>
                    </Stack>
                </Paper>

                <section className="bg-gray-900 rounded-3xl py-10 sm:py-14 px-4 sm:px-8">
                    <div className="mx-auto max-w-7xl">
                        <h2 className="text-center text-base font-semibold text-indigo-400">Latest Publications</h2>
                        <p className="mx-auto mt-2 max-w-lg text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            Discover what the campus is publishing now
                        </p>

                        <div className="mt-8 grid gap-4 sm:mt-12 lg:grid-cols-3 lg:grid-rows-2">
                            {[0, 1, 2, 3].map((idx) => {
                                const article = getPub(idx);
                                if (!article) {
                                    return null;
                                }

                                const baseCard =
                                    'relative overflow-hidden rounded-2xl border border-white/10 bg-gray-800/90 text-white';

                                if (idx === 0) {
                                    return (
                                        <div key={article.id + '-hero'} className="relative lg:row-span-2">
                                            <div className={baseCard + ' h-full'}>
                                                <div
                                                    className="h-56 sm:h-72 lg:h-full bg-cover bg-center"
                                                    style={{
                                                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.72)), url(${article.cover_image_url || fallbackImage})`,
                                                    }}
                                                >
                                                    <div className="h-full flex flex-col justify-end p-6 sm:p-8">
                                                        <p className="text-sm text-indigo-300">{article.category?.name}</p>
                                                        <p className="mt-2 text-xl sm:text-2xl font-semibold">{article.title}</p>
                                                        <p className="mt-2 text-sm text-gray-300">
                                                            {stripHtml(article.content).slice(0, 180)}...
                                                        </p>
                                                        <div className="mt-4 max-w-md">
                                                            <TextField
                                                                label="Comment"
                                                                size="small"
                                                                value={commentDrafts[article.id] ?? ''}
                                                                onChange={(event) =>
                                                                    setCommentDrafts((previous) => ({
                                                                        ...previous,
                                                                        [article.id]: event.target.value,
                                                                    }))
                                                                }
                                                                fullWidth
                                                                sx={{ '& .MuiInputBase-root': { bgcolor: '#fff' } }}
                                                            />
                                                            <CoolButton sx={{ mt: 1.25 }} onClick={() => postComment(article.id)}>
                                                                Post Comment
                                                            </CoolButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                if (idx === 3) {
                                    return (
                                        <div key={article.id + '-code'} className="relative lg:row-span-2">
                                            <div className={baseCard + ' h-full'}>
                                                <div className="px-6 pt-6 pb-3">
                                                    <p className="text-lg font-medium">Powerful Publication Flow</p>
                                                    <p className="mt-2 text-sm text-gray-300">
                                                        {stripHtml(article.content).slice(0, 130)}...
                                                    </p>
                                                </div>
                                                <div className="relative min-h-72 w-full grow">
                                                    <div className="absolute top-4 right-0 bottom-0 left-6 overflow-hidden rounded-tl-xl bg-gray-900/80 outline outline-white/10">
                                                        <div className="flex bg-gray-900 outline outline-white/5">
                                                            <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white text-sm">
                                                                {article.title.slice(0, 24)}.md
                                                            </div>
                                                            <div className="border-r border-gray-600/10 px-4 py-2 text-sm text-gray-300">
                                                                Comments
                                                            </div>
                                                        </div>
                                                        <div className="px-5 pt-4 pb-6">
                                                            <p className="text-xs text-gray-300">By {article.writer?.name}</p>
                                                            <p className="mt-2 text-sm text-gray-200">
                                                                {stripHtml(article.content).slice(0, 210)}...
                                                            </p>
                                                            <CoolButton tone="outline" sx={{ mt: 2 }} onClick={() => postComment(article.id)}>
                                                                Engage
                                                            </CoolButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={article.id} className="relative">
                                        <div className={baseCard + ' h-full'}>
                                            <div className="px-6 pt-6">
                                                <p className="text-lg font-medium">{article.title}</p>
                                                <p className="mt-2 text-sm text-gray-300">{stripHtml(article.content).slice(0, 120)}...</p>
                                            </div>
                                            <div className="flex flex-1 items-end px-6 pb-6 pt-4">
                                                <img
                                                    src={article.cover_image_url || fallbackImage}
                                                    alt={article.title}
                                                    className="w-full max-h-44 object-cover rounded-xl"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <Paper sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        My Recent Comments
                    </Typography>
                    <Stack spacing={1}>
                        {myComments.length === 0 ? (
                            <Typography color="text.secondary">No comments yet.</Typography>
                        ) : (
                            myComments.slice(0, 10).map((comment) => (
                                <Paper key={comment.id} variant="outlined" sx={{ p: 1.5 }}>
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
