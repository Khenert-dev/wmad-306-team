import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button, Box, Typography, Alert } from '@mui/material';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <Typography variant="h5" sx={{ mb: 1, textAlign: 'center' }}>
                Verify Your Email
            </Typography>

            <Typography variant="body2" sx={{ mb: 4, textAlign: 'center' }}>
                Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you?
            </Typography>

            {status === 'verification-link-sent' && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
                    A new verification link has been sent to the email address you provided during registration.
                </Alert>
            )}

            <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={processing}
                    sx={{ py: 1.5 }}
                >
                    Resend Verification Email
                </Button>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#86868b', 
                        textDecoration: 'underline', 
                        cursor: 'pointer',
                        fontSize: '0.875rem' 
                    }}
                >
                    Log Out
                </Link>
            </Box>
        </GuestLayout>
    );
}