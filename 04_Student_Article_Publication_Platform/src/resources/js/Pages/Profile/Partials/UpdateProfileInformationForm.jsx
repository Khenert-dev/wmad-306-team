import { Link, useForm, usePage } from '@inertiajs/react';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';

export default function UpdateProfileInformationForm({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (event) => {
        event.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <Box component="section">
            <Typography variant="h6">Profile Information</Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
                Update your name and email address.
            </Typography>

            <Stack component="form" onSubmit={submit} spacing={2}>
                <TextField
                    label="Name"
                    value={data.name}
                    onChange={(event) => setData('name', event.target.value)}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    required
                    fullWidth
                />

                <TextField
                    label="Email"
                    type="email"
                    value={data.email}
                    onChange={(event) => setData('email', event.target.value)}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    required
                    fullWidth
                />

                {mustVerifyEmail && user.email_verified_at === null && (
                    <Alert severity="warning">
                        Your email address is unverified.{' '}
                        <Button component={Link} href={route('verification.send')} method="post" as="button">
                            Click here to re-send the verification email.
                        </Button>
                        {status === 'verification-link-sent' ? ' A new verification link has been sent.' : ''}
                    </Alert>
                )}

                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Button type="submit" variant="contained" disabled={processing}>
                        Save
                    </Button>
                    {recentlySuccessful && <Typography color="success.main">Saved.</Typography>}
                </Stack>
            </Stack>
        </Box>
    );
}
