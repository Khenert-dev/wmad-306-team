import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
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
        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <Typography variant="h5" sx={{ mb: 1, textAlign: 'center' }}>
                New Password
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, textAlign: 'center' }}>
                Please enter your new password below to regain access.
            </Typography>

            <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                    id="email"
                    type="email"
                    label="Email Address"
                    value={data.email}
                    fullWidth
                    autoComplete="username"
                    onChange={(e) => setData('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />

                <TextField
                    id="password"
                    type="password"
                    label="New Password"
                    value={data.password}
                    fullWidth
                    autoFocus
                    autoComplete="new-password"
                    onChange={(e) => setData('password', e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                />

                <TextField
                    id="password_confirmation"
                    type="password"
                    label="Confirm New Password"
                    value={data.password_confirmation}
                    fullWidth
                    autoComplete="new-password"
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={!!errors.password_confirmation}
                    helperText={errors.password_confirmation}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={processing}
                    sx={{ py: 1.5 }}
                >
                    Reset Password
                </Button>
            </Box>
        </GuestLayout>
    );
}