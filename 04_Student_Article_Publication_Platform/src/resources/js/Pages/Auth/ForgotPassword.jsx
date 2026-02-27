import CoolButton from '@/Components/CoolButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Alert, Stack, TextField, Typography } from '@mui/material';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <Stack spacing={2} component="form" onSubmit={submit}>
                <Typography variant="h5">Forgot your password?</Typography>
                <Typography color="text.secondary">
                    Enter your email address and we will send you a link to reset your password.
                </Typography>
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
                <CoolButton type="submit" disabled={processing}>
                    Email Password Reset Link
                </CoolButton>
            </Stack>
        </GuestLayout>
    );
}
