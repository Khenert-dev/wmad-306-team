import CoolButton from '@/Components/CoolButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Alert, Stack, Typography } from '@mui/material';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (event) => {
        event.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />
            <Stack spacing={2} component="form" onSubmit={submit}>
                <Typography variant="h5">Verify your email</Typography>
                <Typography color="text.secondary">
                    Before getting started, please verify your email by clicking the link we just sent.
                </Typography>

                {status === 'verification-link-sent' && (
                    <Alert severity="success">
                        A new verification link has been sent to your email address.
                    </Alert>
                )}

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                    <CoolButton type="submit" disabled={processing}>
                        Resend Verification Email
                    </CoolButton>
                    <CoolButton tone="outline" component={Link} href={route('logout')} method="post" as="button">
                        Log Out
                    </CoolButton>
                </Stack>
            </Stack>
        </GuestLayout>
    );
}
