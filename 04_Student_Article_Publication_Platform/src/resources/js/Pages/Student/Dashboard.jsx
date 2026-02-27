import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Alert, Box, Button, Card, CardContent, Chip, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

const fallbackImage =
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80';

const stripHtml = (value) => value?.replace(/<[^>]*>?/gm, '') ?? '';

export default function StudentDashboard({ publishedArticles, featuredArticle, latestPublications, myComments, flash, categories, filters }) {
    const { url } = usePage();
    const [searchFilters, setSearchFilters] = useState(() => ({
        search: filters?.search ?? '',
        category_id: filters?.category_id ?? '',
        date_from: filters?.date_from ?? '',
        date_to: filters?.date_to ?? '',
        sort: filters?.sort ?? 'newest',
    }));

    const applyFilters = (nextFilters) => {
        router.get(
            url,
            nextFilters,
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleFilterChange = (field, value) => {
        setSearchFilters((previous) => {
            const updated = { ...previous, [field]: value };
            return updated;
        });
    };
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

                <Paper sx={{ p: { xs: 2, md: 2.5 } }}>
                    <Stack
                        spacing={2}
                        direction={{ xs: 'column', md: 'row' }}
                        alignItems={{ xs: 'stretch', md: 'flex-end' }}
                        useFlexGap
                        flexWrap="wrap"
                    >
                        <Box sx={{ flex: 2, minWidth: 220 }}>
                            <TextField
                                label="Search journals"
                                placeholder="Search by title or content"
                                value={searchFilters.search}
                                onChange={(event) => handleFilterChange('search', event.target.value)}
                                fullWidth
                                size="small"
                            />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 180 }}>
                            <TextField
                                select
                                label="Subject / category"
                                value={searchFilters.category_id}
                                onChange={(event) => handleFilterChange('category_id', event.target.value)}
                                fullWidth
                                size="small"
                            >
                                <MenuItem value="">All subjects</MenuItem>
                                {categories?.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 160 }}>
                            <TextField
                                label="From date"
                                type="date"
                                value={searchFilters.date_from}
                                onChange={(event) => handleFilterChange('date_from', event.target.value)}
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 160 }}>
                            <TextField
                                label="To date"
                                type="date"
                                value={searchFilters.date_to}
                                onChange={(event) => handleFilterChange('date_to', event.target.value)}
                                fullWidth
                                size="small"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 180 }}>
                            <TextField
                                select
                                label="Sort by"
                                value={searchFilters.sort}
                                onChange={(event) => handleFilterChange('sort', event.target.value)}
                                fullWidth
                                size="small"
                            >
                                <MenuItem value="newest">Newest first</MenuItem>
                                <MenuItem value="oldest">Oldest first</MenuItem>
                                <MenuItem value="title_asc">Title A–Z</MenuItem>
                                <MenuItem value="title_desc">Title Z–A</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => {
                                    const reset = {
                                        search: '',
                                        category_id: '',
                                        date_from: '',
                                        date_to: '',
                                        sort: 'newest',
                                    };
                                    setSearchFilters(reset);
                                    applyFilters(reset);
                                }}
                            >
                                Clear
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => applyFilters(searchFilters)}
                            >
                                Apply filters
                            </Button>
                        </Box>
                    </Stack>
                </Paper>

                <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Box
                        sx={{
                            minHeight: { xs: 220, md: 280 },
                            backgroundImage: `linear-gradient(115deg, rgba(8, 16, 35, 0.8), rgba(25, 63, 138, 0.45)), url(${heroImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <Box
                            sx={{
                                p: { xs: 2.25, md: 3.25 },
                                color: '#fff',
                                maxWidth: 720,
                                backdropFilter: 'blur(4px)',
                            }}
                        >
                            <Typography variant="overline" sx={{ opacity: 0.9, letterSpacing: 1 }}>
                                Featured journal
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#fff',
                                    fontWeight: 800,
                                    textShadow: '0 10px 30px rgba(0,0,0,0.45)',
                                }}
                            >
                                {heroArticle?.title ?? 'Latest Published Articles'}
                            </Typography>
                            <Typography sx={{ mt: 0.75, color: 'rgba(255,255,255,0.9)' }}>
                                {stripHtml(heroArticle?.content).slice(0, 170) || 'Explore the latest campus publications.'}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 1.5 }} useFlexGap flexWrap="wrap">
                                <Chip
                                    label={`${publishedArticles.length} published`}
                                    size="small"
                                    sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: '#fff' }}
                                />
                                <Chip
                                    label={`${myComments.length} my comments`}
                                    size="small"
                                    sx={{ bgcolor: 'rgba(255,255,255,0.18)', color: '#fff' }}
                                />
                            </Stack>
                            {heroArticle && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    component={Link}
                                    href={route('publications.show', heroArticle.id)}
                                    sx={{ mt: 1.8, backgroundColor: 'rgba(15,118,255,0.95)' }}
                                >
                                    Read featured journal
                                </Button>
                            )}
                        </Box>
                    </Box>
                </Paper>

                <Paper sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Latest publications
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.6, mb: 2 }}>
                        Browse the most recent journals published on the platform.
                    </Typography>

                    {articlePool.length === 0 ? (
                        <Box sx={{ py: 4 }}>
                            <Typography color="text.secondary">
                                No publications are available yet. Check back soon for new journals from writers.
                            </Typography>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: 'grid',
                                gap: 2,
                                gridTemplateColumns: {
                                    xs: '1fr',
                                    sm: 'repeat(2, minmax(0, 1fr))',
                                    xl: 'repeat(3, minmax(0, 1fr))',
                                },
                            }}
                        >
                            {articlePool.slice(0, 6).map((article) => (
                                <Card
                                    key={article.id}
                                    elevation={0}
                                    sx={{
                                        borderRadius: 3,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            pt: '62%',
                                            backgroundImage: `url(${article.cover_image_url || fallbackImage})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                    <CardContent sx={{ p: 2.25, flexGrow: 1 }}>
                                        <Typography variant="overline" color="text.secondary">
                                            {article.category?.name ?? 'Journal'}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ fontWeight: 700, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                                        >
                                            {article.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                            {article.writer?.name}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            sx={{
                                                mt: 0.8,
                                                fontSize: 13,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {stripHtml(article.content).slice(0, 220)}
                                        </Typography>

                                        <Button
                                            sx={{ mt: 1.4, px: 0 }}
                                            size="small"
                                            component={Link}
                                            href={route('publications.show', article.id)}
                                        >
                                            Read article
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    )}
                </Paper>

                <Paper sx={{ p: { xs: 2, md: 3 } }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        My recent comments
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 1 }}>
                        A quick view of the feedback you have shared on published journals.
                    </Typography>
                    <Stack spacing={1.25}>
                        {myComments.length === 0 ? (
                            <Typography color="text.secondary">
                                You have not posted any comments yet. Open a published journal to share your thoughts.
                            </Typography>
                        ) : (
                            myComments.slice(0, 10).map((comment) => (
                                <Paper key={comment.id} variant="outlined" sx={{ p: 1.25, borderRadius: 2 }}>
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
