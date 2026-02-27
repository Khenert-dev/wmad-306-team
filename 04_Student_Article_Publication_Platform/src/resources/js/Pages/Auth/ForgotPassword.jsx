import CoolButton from '@/Components/CoolButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Alert, Box, Stack, TextField, Typography } from '@mui/material';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit = (event) => {
        event.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <Stack spacing={2.25} component="form" onSubmit={submit}>
                <Box>
                    <Typography variant="h4">Reset access</Typography>
                    <Typography color="text.secondary">
                        Enter your email and we will send a secure password reset link.
                    </Typography>
                </Box>
                {status && <Alert severity="success">{status}</Alert>}
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
                <CoolButton type="submit" disabled={processing}>Email Password Reset Link</CoolButton>
            </Stack>
        </GuestLayout>
    );
}
