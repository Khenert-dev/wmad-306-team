import { useForm } from '@inertiajs/react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

export default function UpdatePasswordForm() {
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (event) => {
        event.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <Box component="section">
            <Typography variant="h6">Update Password</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
                Ensure your account uses a strong, unique password.
            </Typography>

            <Stack component="form" onSubmit={updatePassword} spacing={2}>
                <TextField
                    label="Current Password"
                    type="password"
                    value={data.current_password}
                    onChange={(event) => setData('current_password', event.target.value)}
                    error={Boolean(errors.current_password)}
                    helperText={errors.current_password}
                    fullWidth
                />

                <TextField
                    label="New Password"
                    type="password"
                    value={data.password}
                    onChange={(event) => setData('password', event.target.value)}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    fullWidth
                />

                <TextField
                    label="Confirm Password"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(event) => setData('password_confirmation', event.target.value)}
                    error={Boolean(errors.password_confirmation)}
                    helperText={errors.password_confirmation}
                    fullWidth
                />

                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Button type="submit" variant="contained" disabled={processing}>
                        Save Password
                    </Button>
                    {recentlySuccessful && <Typography color="success.main">Saved.</Typography>}
                </Stack>
            </Stack>
        </Box>
    );
}
