import CoolButton from '@/Components/CoolButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Box, Stack, TextField, Typography } from '@mui/material';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit = (event) => {
        event.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />
            <Stack spacing={2.25} component="form" onSubmit={submit}>
                <Box>
                    <Typography variant="h4">Set a new password</Typography>
                    <Typography color="text.secondary">Use a strong password you do not reuse elsewhere.</Typography>
                </Box>
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
                <TextField
                    label="New Password"
                    type="password"
                    value={data.password}
                    onChange={(event) => setData('password', event.target.value)}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    required
                    fullWidth
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(event) => setData('password_confirmation', event.target.value)}
                    error={Boolean(errors.password_confirmation)}
                    helperText={errors.password_confirmation}
                    required
                    fullWidth
                />
                <CoolButton type="submit" disabled={processing}>Reset Password</CoolButton>
            </Stack>
        </GuestLayout>
    );
}
