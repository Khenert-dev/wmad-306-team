import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Alert, Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMemo, useState } from 'react';

const fallbackImage =
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80';

const stripHtml = (value) => value?.replace(/<[^>]*>?/gm, '') ?? '';

// Jeton-style CSS Animations (matches Welcome.jsx)
const jetonAnimations = `
    @keyframes reveal-up {
        0% { transform: translateY(80px); opacity: 0; filter: blur(8px); }
        100% { transform: translateY(0); opacity: 1; filter: blur(0); }
    }
    @keyframes float-blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
    }
    .student-animate-reveal-0 { animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
    .student-animate-reveal-1 { animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
    .student-animate-reveal-2 { animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
    .student-animate-reveal-3 { animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
    .student-animate-reveal-4 { animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }
    .student-animate-reveal-5 { animation: reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both; }
    .student-animate-blob { animation: float-blob 8s infinite ease-in-out; }
    .student-animation-delay-2000 { animation-delay: 2s; }
    .student-animation-delay-4000 { animation-delay: 4s; }
    .student-bento-card:hover .student-bento-img { transform: scale(1.08); }
`;

export default function StudentDashboard({ publishedArticles, featuredArticle, latestPublications, myComments, flash, categories, filters }) {
    const { url } = usePage();
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
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
                <Stack spacing={0.25} className="student-animate-reveal-0">
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                        Student Dashboard
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                        Read published journals and leave feedback.
                    </Typography>
                </Stack>
            }
            fullWidth
        >
            <Head title="Student Dashboard" />
            <style>{jetonAnimations}</style>

            <Stack spacing={2.5} component="div">
                {flash?.success && (
                    <Alert severity="success" className="student-animate-reveal-0">
                        {flash.success}
                    </Alert>
                )}

                {/* Filters – bento-style card */}
                <Box
                    className="student-animate-reveal-1"
                    sx={{
                        p: { xs: 2, md: 2.5 },
                        borderRadius: '2rem',
                        bgcolor: isDark ? 'rgba(17, 24, 39, 0.6)' : 'rgba(244, 247, 251, 0.9)',
                        border: '1px solid',
                        borderColor: isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.8)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
                        transition: 'box-shadow 0.5s ease, transform 0.5s ease',
                        '&:hover': {
                            boxShadow: '0 20px 40px rgba(47, 111, 219, 0.15)',
                        },
                    }}
                >
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
                                sx={{
                                    '& .MuiOutlinedInput-root': { borderRadius: '1rem', fontWeight: 500 },
                                    '& .MuiInputLabel-root': { fontWeight: 600 },
                                }}
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
                                sx={{
                                    '& .MuiOutlinedInput-root': { borderRadius: '1rem', fontWeight: 500 },
                                    '& .MuiInputLabel-root': { fontWeight: 600 },
                                }}
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
                                sx={{
                                    '& .MuiOutlinedInput-root': { borderRadius: '1rem', fontWeight: 500 },
                                    '& .MuiInputLabel-root': { fontWeight: 600 },
                                }}
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
                                sx={{
                                    '& .MuiOutlinedInput-root': { borderRadius: '1rem', fontWeight: 500 },
                                    '& .MuiInputLabel-root': { fontWeight: 600 },
                                }}
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
                                sx={{
                                    '& .MuiOutlinedInput-root': { borderRadius: '1rem', fontWeight: 500 },
                                    '& .MuiInputLabel-root': { fontWeight: 600 },
                                }}
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
                                sx={{
                                    borderRadius: '1rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                }}
                            >
                                Clear
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => applyFilters(searchFilters)}
                                sx={{
                                    borderRadius: '1rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    bgcolor: '#2f6fdb',
                                    boxShadow: '0 4px 14px rgba(47, 111, 219, 0.35)',
                                    '&:hover': { bgcolor: '#2157b4', boxShadow: '0 6px 20px rgba(47, 111, 219, 0.4)' },
                                }}
                            >
                                Apply filters
                            </Button>
                        </Box>
                    </Stack>
                </Box>

                {/* Hero section with floating blobs */}
                <Box
                    className="student-animate-reveal-2"
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '2rem',
                        minHeight: { xs: 220, md: 280 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        willChange: 'transform',
                    }}
                >
                    {/* Floating blobs background */}
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            overflow: 'hidden',
                            pointerEvents: 'none',
                        }}
                    >
                        <Box
                            className="student-animate-blob"
                            sx={{
                                position: 'absolute',
                                top: 80,
                                left: -40,
                                width: 288,
                                height: 288,
                                borderRadius: '50%',
                                bgcolor: '#2f6fdb',
                                mixBlendMode: 'multiply',
                                opacity: 0.3,
                            }}
                        />
                        <Box
                            className="student-animate-blob student-animation-delay-2000"
                            sx={{
                                position: 'absolute',
                                top: 80,
                                right: -40,
                                width: 288,
                                height: 288,
                                borderRadius: '50%',
                                bgcolor: '#7ea5ea',
                                mixBlendMode: 'multiply',
                                opacity: 0.3,
                            }}
                        />
                        <Box
                            className="student-animate-blob student-animation-delay-4000"
                            sx={{
                                position: 'absolute',
                                top: 160,
                                left: 80,
                                width: 288,
                                height: 288,
                                borderRadius: '50%',
                                bgcolor: '#1e4b9b',
                                mixBlendMode: 'multiply',
                                opacity: 0.3,
                            }}
                        />
                    </Box>

                    {/* Hero content overlay */}
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 1,
                            minHeight: { xs: 220, md: 280 },
                            width: '100%',
                            backgroundImage: `linear-gradient(115deg, rgba(8, 16, 35, 0.82), rgba(47, 111, 219, 0.35)), url(${heroImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            borderRadius: '2rem',
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
                            <Typography
                                variant="overline"
                                sx={{
                                    opacity: 0.95,
                                    letterSpacing: 2,
                                    fontWeight: 800,
                                    textTransform: 'uppercase',
                                    color: 'rgba(255,255,255,0.9)',
                                }}
                            >
                                Featured journal
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    color: '#fff',
                                    fontWeight: 800,
                                    textShadow: '0 10px 30px rgba(0,0,0,0.45)',
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.15,
                                    mt: 0.5,
                                }}
                            >
                                {heroArticle?.title ?? 'Latest Published Articles'}
                            </Typography>
                            <Typography sx={{ mt: 0.75, color: 'rgba(255,255,255,0.92)', fontSize: 15, lineHeight: 1.6 }}>
                                {stripHtml(heroArticle?.content).slice(0, 170) || 'Explore the latest campus publications.'}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 1.5 }} useFlexGap flexWrap="wrap">
                                <Box
                                    component="span"
                                    sx={{
                                        px: 1.2,
                                        py: 0.5,
                                        borderRadius: '9999px',
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        color: '#fff',
                                        fontSize: 12,
                                        fontWeight: 700,
                                    }}
                                >
                                    {publishedArticles?.length ?? 0} published
                                </Box>
                                <Box
                                    component="span"
                                    sx={{
                                        px: 1.2,
                                        py: 0.5,
                                        borderRadius: '9999px',
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        color: '#fff',
                                        fontSize: 12,
                                        fontWeight: 700,
                                    }}
                                >
                                    {myComments?.length ?? 0} my comments
                                </Box>
                            </Stack>
                            {heroArticle && (
                                <Link
                                    href={route('publications.show', heroArticle.id)}
                                    className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full text-sm font-bold text-white no-underline"
                                    style={{
                                        backgroundColor: '#2f6fdb',
                                        boxShadow: '0 4px 14px rgba(47, 111, 219, 0.4)',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = '#2157b4';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(47, 111, 219, 0.45)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = '#2f6fdb';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 14px rgba(47, 111, 219, 0.4)';
                                    }}
                                >
                                    Read featured journal <span aria-hidden="true">&rarr;</span>
                                </Link>
                            )}
                        </Box>
                    </Box>
                </Box>

                {/* Latest publications – bento cards */}
                <Box
                    className="student-animate-reveal-3"
                    sx={{
                        p: { xs: 2, md: 3 },
                        borderRadius: '2rem',
                        bgcolor: isDark ? 'rgba(17, 24, 39, 0.6)' : 'rgba(244, 247, 251, 0.9)',
                        border: '1px solid',
                        borderColor: isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.8)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        transition: 'box-shadow 0.5s ease',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                        Latest publications
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.6, mb: 2, fontSize: 15 }}>
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
                            {articlePool.slice(0, 6).map((article, i) => (
                                <Box
                                    key={article.id}
                                    component="article"
                                    className={`student-bento-card student-animate-reveal-${Math.min((i % 3) + 4, 5)}`}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: '2rem',
                                        bgcolor: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255,255,255,0.9)',
                                        border: '1px solid',
                                        borderColor: isDark ? 'rgba(75, 85, 99, 0.6)' : 'rgba(226, 232, 240, 0.9)',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                                        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                        willChange: 'transform',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 20px 40px rgba(47, 111, 219, 0.15)',
                                            borderColor: 'rgba(47, 111, 219, 0.25)',
                                        },
                                        '&:hover .article-title': { color: '#2f6fdb' },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            pt: '62%',
                                            overflow: 'hidden',
                                            bgcolor: 'rgba(229, 231, 235, 0.5)',
                                        }}
                                    >
                                        <Box
                                            className="student-bento-img"
                                            component="img"
                                            src={article.cover_image_url || fallbackImage}
                                            alt={article.title}
                                            sx={{
                                                position: 'absolute',
                                                inset: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.7s ease-out',
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)',
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: 16,
                                                left: 16,
                                            }}
                                        >
                                            <Box
                                                component="span"
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    borderRadius: '9999px',
                                                    bgcolor: 'rgba(255,255,255,0.9)',
                                                    backdropFilter: 'blur(8px)',
                                                    px: 1.5,
                                                    py: 0.5,
                                                    fontSize: 11,
                                                    fontWeight: 800,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.1em',
                                                    color: '#2f6fdb',
                                                }}
                                            >
                                                {article.category?.name ?? 'Journal'}
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box sx={{ p: 2.25, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Typography
                                            variant="subtitle1"
                                            className="article-title"
                                            sx={{
                                                fontWeight: 700,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                color: 'text.primary',
                                                fontSize: '1.125rem',
                                                lineHeight: 1.3,
                                                transition: 'color 0.3s',
                                            }}
                                        >
                                            {article.title}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, fontWeight: 600 }}>
                                            By {article.writer?.name ?? 'Anonymous'}
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
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {stripHtml(article.content).slice(0, 220)}
                                        </Typography>

                                        <Link
                                            href={route('publications.show', article.id)}
                                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold no-underline"
                                            style={{
                                                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255,255,255,0.95)',
                                                color: '#2f6fdb',
                                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                                border: '1px solid',
                                                borderColor: isDark ? 'rgba(75, 85, 99, 0.6)' : 'rgba(226, 232, 240, 0.9)',
                                                transition: 'all 0.3s ease',
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.backgroundColor = '#2f6fdb';
                                                e.currentTarget.style.color = '#fff';
                                                e.currentTarget.style.borderColor = 'transparent';
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.backgroundColor = isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255,255,255,0.95)';
                                                e.currentTarget.style.color = '#2f6fdb';
                                                e.currentTarget.style.borderColor = isDark ? 'rgba(75, 85, 99, 0.6)' : 'rgba(226, 232, 240, 0.9)';
                                            }}
                                        >
                                            Read article <span aria-hidden="true">&rarr;</span>
                                        </Link>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>

                {/* My recent comments – bento style */}
                <Box
                    className="student-animate-reveal-5"
                    sx={{
                        p: { xs: 2, md: 3 },
                        borderRadius: '2rem',
                        bgcolor: isDark ? 'rgba(17, 24, 39, 0.6)' : 'rgba(244, 247, 251, 0.9)',
                        border: '1px solid',
                        borderColor: isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.8)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        transition: 'box-shadow 0.5s ease',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1 }}>
                        My recent comments
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2, fontSize: 15 }}>
                        A quick view of the feedback you have shared on published journals.
                    </Typography>
                    <Stack spacing={1.25}>
                        {(myComments?.length ?? 0) === 0 ? (
                            <Typography color="text.secondary">
                                You have not posted any comments yet. Open a published journal to share your thoughts.
                            </Typography>
                        ) : (
                            (myComments ?? []).slice(0, 10).map((comment) => (
                                <Box
                                    key={comment.id}
                                    sx={{
                                        p: 1.5,
                                        borderRadius: '1rem',
                                        border: '1px solid',
                                        borderColor: isDark ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.8)',
                                        bgcolor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255,255,255,0.7)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: 'rgba(47, 111, 219, 0.3)',
                                            boxShadow: '0 4px 12px rgba(47, 111, 219, 0.08)',
                                        },
                                    }}
                                >
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                        {comment.content}
                                    </Typography>
                                </Box>
                            ))
                        )}
                    </Stack>
                </Box>
            </Stack>
        </AuthenticatedLayout>
    );
}
