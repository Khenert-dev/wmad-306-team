import React, { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Container, Box, Typography, Button, Paper, Alert,
    ThemeProvider, createTheme, Chip, Dialog, DialogTitle, 
    DialogContent, DialogActions, TextField, Divider
} from '@mui/material';

// --- APPLE-INSPIRED MUI THEME ---
const appleTheme = createTheme({
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        h4: { fontWeight: 700, letterSpacing: '-0.5px', color: '#1d1d1f' },
        h5: { fontWeight: 600, letterSpacing: '-0.3px', color: '#1d1d1f' },
        h6: { fontWeight: 600, letterSpacing: '-0.2px', color: '#1d1d1f' },
        button: { textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' },
    },
    shape: {
        borderRadius: 14,
    },
    palette: {
        primary: { main: '#007AFF' }, // Apple Blue
        success: { main: '#34c759' }, // Apple Green
        error: { main: '#ff3b30' },   // Apple Red
        secondary: { main: '#86868b' },
        background: { default: '#f5f5f7', paper: '#ffffff' },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: 20, padding: '8px 20px', disableElevation: true },
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
        MuiDialog: {
            styleOverrides: {
                paper: { borderRadius: 20, padding: '8px' }
            }
        }
    }
});

export default function EditorDashboard({ auth, pendingArticles, publishedArticles }) {
    const flash = usePage().props.flash;
    
    // State for the Revision Modal
    const [isRevisionModalOpen, setRevisionModalOpen] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState(null);

    // Inertia form handler specifically for the revision comments
    const { data, setData, post, processing, errors, reset } = useForm({
        comments: ''
    });

    // --- Action Handlers ---
    const handlePublish = (articleId) => {
        if (confirm('Are you sure you want to publish this article? It will be visible to all students.')) {
            router.post(route('articles.publish', articleId));
        }
    };

    const openRevisionModal = (articleId) => {
        setSelectedArticleId(articleId);
        setRevisionModalOpen(true);
    };

    const closeRevisionModal = () => {
        setRevisionModalOpen(false);
        setSelectedArticleId(null);
        reset();
    };

    const submitRevisionRequest = (e) => {
        e.preventDefault();
        post(route('articles.revision', selectedArticleId), {
            onSuccess: () => closeRevisionModal(),
        });
    };

    // Reusable Article Card Component to keep code DRY
    const ArticleCard = ({ article, isPending }) => (
        <Paper sx={{ 
            p: 3, 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 2,
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.01)' }
        }}>
            <Box flex={1}>
                <Typography variant="h6" mb={0.5}>{article.title}</Typography>
                <Box display="flex" gap={1} alignItems="center" mb={1.5}>
                    <Chip label={article.category.name} size="small" sx={{ bgcolor: '#f5f5f7', color: '#1d1d1f', fontWeight: 500 }} />
                    <Typography variant="body2" color="secondary">
                        By: {article.writer.name} • {new Date(article.created_at).toLocaleDateString()}
                    </Typography>
                </Box>
                {/* Content Preview (Strips HTML tags and truncates) */}
                <Typography variant="body2" color="text.secondary" sx={{ 
                    display: '-webkit-box', 
                    WebkitLineClamp: 2, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden' 
                }}>
                    {article.content.replace(/<[^>]+>/g, '')}
                </Typography>
            </Box>
            
            {isPending && (
                <Box display="flex" gap={2} mt={{ xs: 2, md: 0 }}>
                    <Button 
                        variant="outlined" 
                        color="error"
                        sx={{ borderColor: 'rgba(255,59,48,0.3)' }}
                        onClick={() => openRevisionModal(article.id)}
                    >
                        Request Revision
                    </Button>
                    <Button 
                        variant="contained" 
                        color="success"
                        onClick={() => handlePublish(article.id)}
                    >
                        Publish Article
                    </Button>
                </Box>
            )}
        </Paper>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Typography variant="h6" color="text.primary">Editor Desk</Typography>}
        >
            <Head title="Editor Dashboard" />

            <ThemeProvider theme={appleTheme}>
                <Box sx={{ bgcolor: 'background.default', minHeight: 'calc(100vh - 65px)', py: 6 }}>
                    <Container maxWidth="lg">
                        
                        {flash?.success && (
                            <Alert severity="success" sx={{ mb: 4, borderRadius: 3, alignItems: 'center' }}>
                                {flash.success}
                            </Alert>
                        )}

                        {/* --- PENDING ARTICLES (NEEDS REVIEW) --- */}
                        <Typography variant="h4" mb={3}>Pending Review</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 6 }}>
                            {pendingArticles.length === 0 ? (
                                <Typography color="secondary" sx={{ p: 2 }}>No articles pending review right now. You're all caught up!</Typography>
                            ) : (
                                pendingArticles.map(article => <ArticleCard key={article.id} article={article} isPending={true} />)
                            )}
                        </Box>

                        <Divider sx={{ mb: 6, borderColor: 'rgba(0,0,0,0.05)' }} />

                        {/* --- PUBLISHED ARTICLES ARCHIVE --- */}
                        <Typography variant="h4" mb={3}>Published Archive</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {publishedArticles.length === 0 ? (
                                <Typography color="secondary" sx={{ p: 2 }}>No articles published yet.</Typography>
                            ) : (
                                publishedArticles.map(article => <ArticleCard key={article.id} article={article} isPending={false} />)
                            )}
                        </Box>
                    </Container>

                    {/* --- APPLE-STYLE REVISION MODAL --- */}
                    <Dialog 
                        open={isRevisionModalOpen} 
                        onClose={closeRevisionModal}
                        fullWidth
                        maxWidth="sm"
                    >
                        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Request Revision</DialogTitle>
                        <form onSubmit={submitRevisionRequest}>
                            <DialogContent sx={{ pt: '10px !important' }}>
                                <Typography variant="body2" color="secondary" mb={2}>
                                    Please provide specific feedback to the writer on what needs to be changed before this can be published.
                                </Typography>
                                <TextField
                                    autoFocus
                                    multiline
                                    rows={4}
                                    fullWidth
                                    variant="outlined"
                                    placeholder="e.g., Please expand on the second paragraph..."
                                    value={data.comments}
                                    onChange={(e) => setData('comments', e.target.value)}
                                    error={!!errors.comments}
                                    helperText={errors.comments}
                                    InputProps={{ sx: { borderRadius: '12px' } }}
                                />
                            </DialogContent>
                            <DialogActions sx={{ p: 3, pt: 0 }}>
                                <Button onClick={closeRevisionModal} sx={{ color: '#86868b' }}>
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    disabled={processing}
                                    sx={{ bgcolor: '#ff3b30', '&:hover': { bgcolor: '#ff3b30', opacity: 0.9 } }}
                                >
                                    Send to Writer
                                </Button>
                            </DialogActions>
                        </form>
                    </Dialog>

                </Box>
            </ThemeProvider>
        </AuthenticatedLayout>
    );
}