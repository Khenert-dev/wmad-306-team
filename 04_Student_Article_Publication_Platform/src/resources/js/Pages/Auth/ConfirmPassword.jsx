import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'));
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <Typography variant="h5" sx={{ mb: 1, textAlign: 'center' }}>
                Security Check
            </Typography>

            <Typography variant="body2" sx={{ mb: 4, textAlign: 'center' }}>
                This is a secure area of the application. Please confirm your password before continuing.
            </Typography>

            <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    value={data.password}
                    fullWidth
                    autoFocus
                    onChange={(e) => setData('password', e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
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
                    Confirm
                </Button>
            </Box>
        </GuestLayout>
    );
}