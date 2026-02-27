import React, { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { TextField, Button, Box, Typography, Stack } from '@mui/material';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Ensure your account is using a long, random password to stay secure.
            </Typography>

            <Box component="form" onSubmit={updatePassword} sx={{ mt: 2 }}>
                <Stack spacing={3}>
                    <TextField
                        label="Current Password"
                        type="password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        inputRef={currentPasswordInput}
                        required
                        fullWidth
                        variant="outlined"
                        error={!!errors.current_password}
                        helperText={errors.current_password}
                    />

                    <TextField
                        label="New Password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        inputRef={passwordInput}
                        required
                        fullWidth
                        variant="outlined"
                        error={!!errors.password}
                        helperText={errors.password}
                    />

                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                        error={!!errors.password_confirmation}
                        helperText={errors.password_confirmation}
                    />
                </Stack>

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