import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel, Alert } from '@mui/material';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <Typography variant="h5" sx={{ mb: 1, textAlign: 'center' }}>
                Sign In
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, textAlign: 'center' }}>
                Access your CampusPress workspace.
            </Typography>

            {status && <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>{status}</Alert>}

            <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                
                <TextField
                    id="email"
                    type="email"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    autoComplete="username"
                    autoFocus
                />

                <TextField
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    autoComplete="current-password"
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                color="primary"
                            />
                        }
                        label={<Typography variant="body2">Remember me</Typography>}
                    />

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            style={{ textDecoration: 'none', color: '#007AFF', fontSize: '0.875rem', fontWeight: 600 }}
                        >
                            Forgot password?
                        </Link>
                    )}
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={processing}
                    sx={{ mt: 1, py: 1.5 }}
                >
                    Log in
                </Button>

                <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
                    Don't have an account?{' '}
                    <Link href={route('register')} style={{ textDecoration: 'none', color: '#007AFF', fontWeight: 600 }}>
                        Sign up
                    </Link>
                </Typography>
            </Box>
        </GuestLayout>
    );
}