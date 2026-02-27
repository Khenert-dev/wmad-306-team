import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <Typography variant="h5" sx={{ mb: 1, textAlign: 'center' }}>
                Reset Password
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 4, textAlign: 'center' }}>
                Forgot your password? No problem. Just let us know your email address and we will email you a password reset link.
            </Typography>

            {status && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
                    {status}
                </Alert>
            )}

            <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                    id="email"
                    type="email"
                    name="email"
                    label="Email Address"
                    value={data.email}
                    fullWidth
                    autoFocus
                    onChange={(e) => setData('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
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
                    Email Password Reset Link
                </Button>
            </Box>
        </GuestLayout>
    );
}