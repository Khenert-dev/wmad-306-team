import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Container, Box, Typography, Paper, Grid, Avatar, Divider } from '@mui/material';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout
            user={user}
            header={<Typography variant="h5" sx={{ fontWeight: 700, color: '#1d1d1f' }}>Profile Settings</Typography>}
        >
            <Head title="Profile" />

            <Box sx={{ py: 6 }}>
                <Container maxWidth="lg">
                    {/* --- HEADER SECTION WITH AVATAR --- */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 6 }}>
                        <Avatar 
                            sx={{ 
                                width: 80, 
                                height: 80, 
                                fontSize: '2rem', 
                                bgcolor: '#1d1d1f',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                            }}
                        >
                            {user.name.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-1px' }}>
                                {user.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {user.email}
                            </Typography>
                        </Box>
                    </Box>

                    {/* --- FORMS SECTION --- */}
                    <Grid container spacing={4}>
                        
                        {/* Profile Info Form */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 4, borderRadius: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                    <PersonIcon color="primary" />
                                    <Typography variant="h6">Profile Information</Typography>
                                </Box>
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                />
                            </Paper>
                        </Grid>

                        {/* Password Form */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 4, borderRadius: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                    <LockIcon color="primary" />
                                    <Typography variant="h6">Update Password</Typography>
                                </Box>
                                <UpdatePasswordForm />
                            </Paper>
                        </Grid>

                        {/* Delete Account Form */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 4, borderRadius: 4, borderColor: '#ffcccc', bgcolor: '#fff9f9' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                    <DeleteForeverIcon sx={{ color: '#d32f2f' }} />
                                    <Typography variant="h6" sx={{ color: '#d32f2f' }}>Delete Account</Typography>
                                </Box>
                                <DeleteUserForm />
                            </Paper>
                        </Grid>

                    </Grid>
                </Container>
            </Box>
        </AuthenticatedLayout>
    );
}