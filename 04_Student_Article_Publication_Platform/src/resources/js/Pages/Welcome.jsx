import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Box, Container, Typography, Button, Grid, Paper, 
    ThemeProvider, createTheme, AppBar, Toolbar 
} from '@mui/material';

// Icons for the features
import CreateIcon from '@mui/icons-material/Create';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ForumIcon from '@mui/icons-material/Forum';

// --- APPLE-INSPIRED MUI THEME ---
const appleTheme = createTheme({
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        h1: { fontWeight: 800, letterSpacing: '-1.5px', color: '#1d1d1f' },
        h3: { fontWeight: 700, letterSpacing: '-0.8px', color: '#1d1d1f' },
        h5: { fontWeight: 600, letterSpacing: '-0.3px', color: '#1d1d1f' },
        h6: { fontWeight: 600, letterSpacing: '-0.2px', color: '#1d1d1f' },
        button: { textTransform: 'none', fontWeight: 600, fontSize: '1rem' },
        body1: { color: '#86868b', fontSize: '1.125rem', lineHeight: 1.5 },
        body2: { color: '#86868b', lineHeight: 1.6 }
    },
    shape: { borderRadius: 16 },
    palette: {
        primary: { main: '#007AFF' },
        secondary: { main: '#86868b' },
        background: { default: '#fbfbfd', paper: '#ffffff' },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: 24, padding: '10px 24px', disableElevation: true },
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
        }
    }
});

export default function Welcome({ auth }) {
    return (
        <ThemeProvider theme={appleTheme}>
            <Head title="Welcome to CampusPress" />
            
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
                
                {/* --- NAVIGATION BAR --- */}
                <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', pt: 2 }}>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ color: '#1d1d1f', ml: { xs: 1, md: 4 } }}>
                            CampusPress.
                        </Typography>
                        <Box sx={{ mr: { xs: 1, md: 4 } }}>
                            {auth.user ? (
                                <Link href={route('dashboard')} style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary">Go to Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} style={{ textDecoration: 'none', marginRight: '12px' }}>
                                        <Button variant="text" sx={{ color: '#1d1d1f' }}>Log in</Button>
                                    </Link>
                                    <Link href={route('register')} style={{ textDecoration: 'none' }}>
                                        <Button variant="contained" color="primary">Sign up</Button>
                                    </Link>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* --- HERO SECTION --- */}
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', pt: { xs: 8, md: 12 }, pb: { xs: 8, md: 12 } }}>
                    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                        <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, mb: 3 }}>
                            The voice of our campus.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 5, maxWidth: '600px', mx: 'auto', fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
                            The premier Student Article Publication Platform. Write stories, review submissions, and engage with the latest campus news.
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            {!auth.user && (
                                <Link href={route('register')} style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" size="large" sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}>
                                        Get Started
                                    </Button>
                                </Link>
                            )}
                            <Box 
                                component="a" 
                                href="#features" 
                                sx={{ textDecoration: 'none' }}
                            >
                                <Button variant="text" size="large" sx={{ py: 1.5, px: 4, fontSize: '1.1rem', color: '#007AFF' }}>
                                    Learn More
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>

                {/* --- FEATURES/ROLES SECTION --- */}
                <Box id="features" sx={{ bgcolor: '#ffffff', py: { xs: 8, md: 12 }, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <Container maxWidth="lg">
                        <Typography variant="h3" sx={{ textAlign: 'center', mb: 8 }}>
                            One platform. Three roles.
                        </Typography>

                        <Grid container spacing={4}>
                            {/* Writer Feature */}
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 5, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Box sx={{ bgcolor: 'rgba(0,122,255,0.1)', p: 2, borderRadius: '50%', mb: 3 }}>
                                        <CreateIcon sx={{ fontSize: 40, color: '#007AFF' }} />
                                    </Box>
                                    <Typography variant="h5" sx={{ mb: 2 }}>Writers</Typography>
                                    <Typography variant="body2">
                                        Draft insightful articles, format them beautifully with our rich text editor, and submit them directly to the editorial team for review.
                                    </Typography>
                                </Paper>
                            </Grid>

                            {/* Editor Feature */}
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 5, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Box sx={{ bgcolor: 'rgba(52, 199, 89, 0.1)', p: 2, borderRadius: '50%', mb: 3 }}>
                                        <FactCheckIcon sx={{ fontSize: 40, color: '#34c759' }} />
                                    </Box>
                                    <Typography variant="h5" sx={{ mb: 2 }}>Editors</Typography>
                                    <Typography variant="body2">
                                        Maintain the quality of campus news. Review incoming drafts, request specific revisions transparently, and publish the best stories.
                                    </Typography>
                                </Paper>
                            </Grid>

                            {/* Student Feature */}
                            <Grid item xs={12} md={4}>
                                <Paper sx={{ p: 5, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <Box sx={{ bgcolor: 'rgba(255, 149, 0, 0.1)', p: 2, borderRadius: '50%', mb: 3 }}>
                                        <ForumIcon sx={{ fontSize: 40, color: '#ff9500' }} />
                                    </Box>
                                    <Typography variant="h5" sx={{ mb: 2 }}>Students</Typography>
                                    <Typography variant="body2">
                                        Stay informed on campus events. Read published articles in a clean, distraction-free feed and engage by leaving comments.
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* --- FOOTER --- */}
                <Box component="footer" sx={{ py: 4, textAlign: 'center', bgcolor: '#fbfbfd', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                        © {new Date().getFullYear()} CampusPress. Built with Laravel & React.
                    </Typography>
                </Box>

            </Box>
        </ThemeProvider>
    );
}