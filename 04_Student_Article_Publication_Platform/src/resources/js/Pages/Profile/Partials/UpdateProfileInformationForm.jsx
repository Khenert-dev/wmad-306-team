import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { TextField, Button, Box, Alert, Typography, Stack } from '@mui/material';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Update your account's profile information and email address.
            </Typography>

            <Box component="form" onSubmit={submit} sx={{ mt: 2 }}>
                <Stack spacing={3}>
                    <TextField
                        label="Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name}
                    />

                    <TextField
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                </Stack>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.primary">
                            Your email address is unverified.
                            <Button
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                sx={{ ml: 1, textTransform: 'none', p: 0 }}
                            >
                                Click here to re-send the verification email.
                            </Button>
                        </Typography>

                        {status === 'verification-link-sent' && (
                            <Alert severity="success" sx={{ mt: 1 }}>
                                A new verification link has been sent to your email address.
                            </Alert>
                        )}
                    </Box>
                )}

                <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button type="submit" variant="contained" disabled={processing} size="large">
                        Save
                    </Button>

                    {recentlySuccessful && (
                        <Typography variant="body2" color="success.main">
                            Saved.
                        </Typography>
                    )}
                </Box>
            </Box>
        </section>
    );
}