import ActionButtonGroup from '@/Components/ActionButtonGroup';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Alert, Box, Stack, Typography } from '@mui/material';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (event) => {
        event.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />
            <Stack spacing={2.25} component="form" onSubmit={submit}>
                <Box>
                    <Typography variant="h4">Verify your email</Typography>
                    <Typography color="text.secondary">
                        Check your inbox and click the verification link before you continue.
                    </Typography>
                </Box>

                {status === 'verification-link-sent' && (
                    <Alert severity="success">A new verification link has been sent to your email address.</Alert>
                )}

                <ActionButtonGroup
                    actions={[
                        {
                            key: 'resend',
                            label: 'Resend Verification Email',
                            type: 'submit',
                            disabled: processing,
                        },
                        {
                            key: 'logout',
                            label: 'Log Out',
                            component: Link,
                            href: route('logout'),
                            method: 'post',
                            as: 'button',
                        },
                    ]}
                />
            </Stack>
        </GuestLayout>
    );
}
