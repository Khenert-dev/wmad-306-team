import React from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import JoditEditor from 'jodit-react';
import { 
    Container, Box, Typography, TextField, Button, 
    FormControl, InputLabel, Select, MenuItem, Paper, Alert,
    ThemeProvider, createTheme, Chip
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
        borderRadius: 14, // Apple-like rounded corners
    },
    palette: {
        primary: { main: '#007AFF' }, // Classic Apple Blue
        secondary: { main: '#86868b' }, // Apple secondary gray
        background: { default: '#f5f5f7', paper: '#ffffff' }, // Mac/iOS background colors
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
                    boxShadow: '0 4px 24px rgba(0,0,0,0.04)', // Very soft, diffuse shadow
                    border: '1px solid rgba(0,0,0,0.05)'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: { borderRadius: 12 } // Softer input corners
            }
        }
    }
});

export default function WriterDashboard({ auth, articles, categories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        category_id: ''
    });

    const handleSaveDraft = (e) => {
        e.preventDefault();
        post(route('articles.store'), {
            onSuccess: () => reset()
        });
    };

    const handleSubmitForReview = (articleId) => {
        router.post(route('articles.submit', articleId));
    };

    const flash = usePage().props.flash;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Typography variant="h6" color="text.primary">Writer Space</Typography>}
        >
            <Head title="Writer Dashboard" />

            {/* Apply the custom Apple Theme strictly to this content area */}
            <ThemeProvider theme={appleTheme}>
                <Box sx={{ bgcolor: 'background.default', minHeight: 'calc(100vh - 65px)', py: 6 }}>
                    <Container maxWidth="lg">
                        
                        {flash?.success && (
                            <Alert severity="success" sx={{ mb: 4, borderRadius: 3, alignItems: 'center' }}>
                                {flash.success}
                            </Alert>
                        )}

                        <Box display="flex" justifyContent="space-between" alignItems="flex-end" mb={3}>
                            <Typography variant="h4">New Draft</Typography>
                        </Box>

                        {/* --- CREATE NEW ARTICLE FORM --- */}
                        <Paper sx={{ p: { xs: 3, md: 5 }, mb: 6 }}>
                            <Box component="form" onSubmit={handleSaveDraft} sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                                
                                <TextField
                                    label="Article Title"
                                    variant="outlined"
                                    fullWidth
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    error={!!errors.title}
                                    helperText={errors.title}
                                    InputLabelProps={{ sx: { color: '#86868b' } }}
                                />

                                <FormControl fullWidth error={!!errors.category_id}>
                                    <InputLabel sx={{ color: '#86868b' }}>Category</InputLabel>
                                    <Select
                                        value={data.category_id}
                                        label="Category"
                                        onChange={(e) => setData('category_id', e.target.value)}
                                    >
                                        {categories.map((cat) => (
                                            <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Wrapped Jodit Editor to match Apple borders */}
                                <Box sx={{ 
                                    border: errors.content ? '1px solid #d32f2f' : '1px solid #e0e0e0',
                                    borderRadius: '12px',
                                    overflow: 'hidden' // Keeps Jodit inside the rounded corners
                                }}>
                                    <JoditEditor
                                        value={data.content}
                                        onBlur={(newContent) => setData('content', newContent)}
                                        config={{ 
                                            placeholder: 'Start writing your story...',
                                            height: 400,
                                            toolbarAdaptive: false,
                                            style: { fontFamily: '-apple-system, sans-serif' }
                                        }}
                                    />
                                </Box>
                                {errors.content && (
                                    <Typography variant="caption" color="error" sx={{ mt: -2, ml: 2 }}>{errors.content}</Typography>
                                )}

                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary" 
                                    disabled={processing}
                                    sx={{ alignSelf: 'flex-start', px: 4, py: 1.5 }}
                                >
                                    Save as Draft
                                </Button>
                            </Box>
                        </Paper>

                        {/* --- MY ARTICLES LIST --- */}
                        <Typography variant="h4" mb={3}>My Articles</Typography>
                        
                        {articles.length === 0 ? (
                            <Typography color="secondary">No articles found. Start writing!</Typography>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {articles.map((article) => (
                                    <Paper key={article.id} sx={{ 
                                        p: 3, 
                                        display: 'flex', 
                                        flexDirection: { xs: 'column', sm: 'row' }, 
                                        justifyContent: 'space-between', 
                                        alignItems: { xs: 'flex-start', sm: 'center' },
                                        gap: 2,
                                        transition: 'transform 0.2s',
                                        '&:hover': { transform: 'scale(1.01)' }
                                    }}>
                                        <Box>
                                            <Typography variant="h6" mb={0.5}>{article.title}</Typography>
                                            <Box display="flex" gap={1} alignItems="center">
                                                <Chip 
                                                    label={article.status.label} 
                                                    size="small" 
                                                    sx={{ 
                                                        bgcolor: article.status.name === 'draft' ? '#f5f5f7' : '#e5f0ff',
                                                        color: article.status.name === 'draft' ? '#86868b' : '#007AFF',
                                                        fontWeight: 600,
                                                        borderRadius: '8px'
                                                    }} 
                                                />
                                                <Typography variant="body2" color="secondary">
                                                    • {article.category.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                        <Box>
                                            {['draft', 'needs_revision'].includes(article.status.name) && (
                                                <Button 
                                                    variant="contained" 
                                                    sx={{ 
                                                        bgcolor: '#f5f5f7', 
                                                        color: '#007AFF',
                                                        '&:hover': { bgcolor: '#e5e5ea' }
                                                    }}
                                                    onClick={() => handleSubmitForReview(article.id)}
                                                >
                                                    Submit for Review
                                                </Button>
                                            )}
                                        </Box>
                                    </Paper>
                                ))}
                            </Box>
                        )}
                    </Container>
                </Box>
            </ThemeProvider>
        </AuthenticatedLayout>
    );
}