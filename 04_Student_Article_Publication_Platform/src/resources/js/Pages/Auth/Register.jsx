import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <Typography variant="h5" sx={{ mb: 1, textAlign: 'center' }}>
                Create Account
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, textAlign: 'center' }}>
                Join the CampusPress community.
            </Typography>

            <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                
                <TextField
                    id="name"
                    name="name"
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                    autoFocus
                    autoComplete="name"
                />

                <TextField
                    id="email"
                    type="email"
                    name="email"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    autoComplete="username"
                />

                <TextField
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    required
                    autoComplete="new-password"
                />

                <TextField
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={!!errors.password_confirmation}
                    helperText={errors.password_confirmation}
                    required
                    autoComplete="new-password"
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={processing}
                    sx={{ mt: 1, py: 1.5 }}
                >
                    Sign Up
                </Button>

                <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                    Already have an account?{' '}
                    <Link href={route('login')} style={{ textDecoration: 'none', color: '#007AFF', fontWeight: 600 }}>
                        Log in
                    </Link>
                </Typography>
            </Box>
        </GuestLayout>
    );
}