import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Container, Box, Typography, Button, Paper, Alert,
    ThemeProvider, createTheme, Chip, TextField, Avatar, Divider, Collapse
} from '@mui/material';

// --- APPLE-INSPIRED MUI THEME ---
const appleTheme = createTheme({
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        h4: { fontWeight: 700, letterSpacing: '-0.5px', color: '#1d1d1f' },
        h5: { fontWeight: 600, letterSpacing: '-0.3px', color: '#1d1d1f' },
        h6: { fontWeight: 600, letterSpacing: '-0.2px', color: '#1d1d1f' },
        button: { textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' },
        body1: { color: '#1d1d1f', lineHeight: 1.6 },
        body2: { color: '#86868b' }
    },
    shape: {
        borderRadius: 14,
    },
    palette: {
        primary: { main: '#007AFF' },
        secondary: { main: '#86868b' },
        background: { default: '#f5f5f7', paper: '#ffffff' },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: 20, padding: '6px 16px', disableElevation: true },
                contained: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: { 
                    backgroundImage: 'none', 
                    boxShadow: '0 4px 24px rgba(0,0,0,0.04)', 
                    border: '1px solid rgba(0,0,0,0.05)'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: { 
                    '& .MuiOutlinedInput-root': { borderRadius: 12 }
                }
            }
        }
    }
});

// --- INDIVIDUAL ARTICLE CARD COMPONENT ---
// We extract this so each article has its own localized form state for comments
const ArticleCard = ({ article }) => {
    const [expanded, setExpanded] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        content: ''
    });

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        post(route('articles.comment', article.id), {
            preserveScroll: true,
            onSuccess: () => reset('content'),
        });
    };

    return (
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4, transition: 'all 0.3s ease' }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                <Box>
                    <Typography variant="h5" mb={1}>{article.title}</Typography>
                    <Box display="flex" gap={1} alignItems="center">
                        <Chip label={article.category.name} size="small" sx={{ bgcolor: '#f5f5f7', color: '#1d1d1f', fontWeight: 500 }} />
                        <Typography variant="body2">
                            By {article.writer.name} • {new Date(article.created_at).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Content Display: Excerpt vs Full */}
            <Box sx={{ mb: 2 }}>
                <Collapse in={expanded} collapsedSize={80}>
                    {/* Since writers used Jodit Editor, we render the HTML safely */}
                    <Box 
                        sx={{ typography: 'body1', '& p': { mt: 0, mb: 2 } }}
                        dangerouslySetInnerHTML={{ __html: article.content }} 
                    />
                </Collapse>
            </Box>

            <Button 
                variant="text" 
                disableRipple
                onClick={() => setExpanded(!expanded)}
                sx={{ p: 0, color: '#007AFF', '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
            >
                {expanded ? 'Show Less' : 'Read More...'}
            </Button>

            <Divider sx={{ my: 3, borderColor: 'rgba(0,0,0,0.05)' }} />

            {/* --- COMMENTS SECTION --- */}
            <Typography variant="h6" mb={2} sx={{ fontSize: '1.1rem' }}>
                Comments ({article.comments?.length || 0})
            </Typography>

            {/* Comment List */}
            <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {article.comments && article.comments.length > 0 ? (
                    article.comments.map((comment) => (
                        <Box key={comment.id} sx={{ display: 'flex', gap: 2, bgcolor: '#f5f5f7', p: 2, borderRadius: 3 }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: '#007AFF', fontSize: '0.9rem' }}>
                                {comment.student.name.charAt(0)}
                            </Avatar>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1d1d1f', mb: 0.5 }}>
                                    {comment.student.name}
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '0.95rem' }}>
                                    {comment.content}
                                </Typography>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                        No comments yet. Be the first to share your thoughts!
                    </Typography>
                )}
            </Box>

            {/* Post Comment Form */}
            <Box component="form" onSubmit={handleCommentSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Write a comment..."
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    error={!!errors.content}
                    helperText={errors.content}
                    multiline
                    maxRows={3}
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                    disabled={processing || !data.content.trim()}
                    sx={{ flexShrink: 0, height: '40px' }}
                >
                    Post
                </Button>
            </Box>
        </Paper>
    );
};

export default function StudentDashboard({ auth, articles }) {
    const flash = usePage().props.flash;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Typography variant="h6" color="text.primary">Student Campus Feed</Typography>}
        >
            <Head title="Student Dashboard" />

            <ThemeProvider theme={appleTheme}>
                <Box sx={{ bgcolor: 'background.default', minHeight: 'calc(100vh - 65px)', py: 6 }}>
                    <Container maxWidth="md"> {/* Narrower container for better reading experience */}
                        
                        {flash?.success && (
                            <Alert severity="success" sx={{ mb: 4, borderRadius: 3, alignItems: 'center' }}>
                                {flash.success}
                            </Alert>
                        )}

                        <Typography variant="h4" mb={4}>Latest Publications</Typography>

                        {articles.length === 0 ? (
                            <Typography color="secondary" sx={{ textAlign: 'center', py: 8 }}>
                                No articles have been published yet. Check back soon!
                            </Typography>
                        ) : (
                            articles.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))
                        )}

                    </Container>
                </Box>
            </ThemeProvider>
        </AuthenticatedLayout>
    );
}