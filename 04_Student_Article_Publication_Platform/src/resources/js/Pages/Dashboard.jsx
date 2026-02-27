import React from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Container, Box, Typography, Paper, Button, Grid } from '@mui/material';

// Icons for the quick action cards
import EditNoteIcon from '@mui/icons-material/EditNote';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Typography variant="h6" color="text.primary">Welcome to CampusPress</Typography>}
        >
            <Head title="Dashboard" />

            <Box sx={{ py: 6 }}>
                <Container maxWidth="lg">
                    
                    {/* Welcome Banner */}
                    <Paper 
                        sx={{ 
                            p: { xs: 4, md: 6 }, 
                            mb: 6, 
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, #007AFF 0%, #0056b3 100%)',
                            color: '#ffffff',
                            boxShadow: '0 10px 30px rgba(0, 122, 255, 0.3)',
                            border: 'none'
                        }}
                    >
                        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-1px', color: '#fff' }}>
                            Hello, {auth.user.name}!
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, maxWidth: 600 }}>
                            You are successfully logged into the Student Article Publication Platform. Select your workspace below to get started.
                        </Typography>
                    </Paper>

                    <Typography variant="h4" mb={4} sx={{ fontWeight: 700 }}>Your Workspaces</Typography>

                    {/* Quick Action Cards */}
                    <Grid container spacing={4}>
                        
                        {/* Writer Card */}
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.06)' } }}>
                                <Box sx={{ p: 1.5, bgcolor: 'rgba(0,122,255,0.1)', borderRadius: 3, mb: 3 }}>
                                    <EditNoteIcon sx={{ fontSize: 40, color: '#007AFF' }} />
                                </Box>
                                <Typography variant="h5" mb={1}>Writer Space</Typography>
                                <Typography variant="body2" color="text.secondary" mb={4} sx={{ flexGrow: 1 }}>
                                    Draft new articles, submit them for review, and update articles that need revision.
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    onClick={() => router.get(route('writer.dashboard'))}
                                >
                                    Go to Writer Space
                                </Button>
                            </Paper>
                        </Grid>

                        {/* Editor Card */}
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.06)' } }}>
                                <Box sx={{ p: 1.5, bgcolor: 'rgba(52, 199, 89, 0.1)', borderRadius: 3, mb: 3 }}>
                                    <RateReviewIcon sx={{ fontSize: 40, color: '#34c759' }} />
                                </Box>
                                <Typography variant="h5" mb={1}>Editor Desk</Typography>
                                <Typography variant="body2" color="text.secondary" mb={4} sx={{ flexGrow: 1 }}>
                                    Review pending submissions, request revisions from writers, and publish content.
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    sx={{ bgcolor: '#34c759', '&:hover': { bgcolor: '#2eb350' } }}
                                    onClick={() => router.get(route('editor.dashboard'))}
                                >
                                    Go to Editor Desk
                                </Button>
                            </Paper>
                        </Grid>

                        {/* Student Card */}
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 24px rgba(0,0,0,0.06)' } }}>
                                <Box sx={{ p: 1.5, bgcolor: 'rgba(255, 149, 0, 0.1)', borderRadius: 3, mb: 3 }}>
                                    <DynamicFeedIcon sx={{ fontSize: 40, color: '#ff9500' }} />
                                </Box>
                                <Typography variant="h5" mb={1}>Student Feed</Typography>
                                <Typography variant="body2" color="text.secondary" mb={4} sx={{ flexGrow: 1 }}>
                                    Read the latest published campus news, articles, and engage in the comments.
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    sx={{ bgcolor: '#ff9500', '&:hover': { bgcolor: '#e68600' } }}
                                    onClick={() => router.get(route('student.dashboard'))}
                                >
                                    Go to Student Feed
                                </Button>
                            </Paper>
                        </Grid>

                    </Grid>
                </Container>
            </Box>
        </AuthenticatedLayout>
    );
}