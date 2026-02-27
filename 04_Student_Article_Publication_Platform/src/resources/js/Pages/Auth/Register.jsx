import ActionButtonGroup from '@/Components/ActionButtonGroup';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Box, Stack, TextField, Typography } from '@mui/material';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (event) => {
        event.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <Stack spacing={2.25} component="form" onSubmit={submit}>
                <Box>
                    <Typography variant="h4">Create your account</Typography>
                    <Typography color="text.secondary">Join Campus Press and start contributing to student publication workflows.</Typography>
                </Box>

                <TextField
                    label="Name"
                    value={data.name}
                    onChange={(event) => setData('name', event.target.value)}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    fullWidth
                    required
                />

                <TextField
                    label="Email"
                    type="email"
                    value={data.email}
                    onChange={(event) => setData('email', event.target.value)}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    fullWidth
                    required
                />

                <TextField
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={(event) => setData('password', event.target.value)}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    fullWidth
                    required
                />

                <TextField
                    label="Confirm password"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(event) => setData('password_confirmation', event.target.value)}
                    error={Boolean(errors.password_confirmation)}
                    helperText={errors.password_confirmation}
                    fullWidth
                    required
                />

                <ActionButtonGroup
                    variant="contained"
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                    actions={[
                        {
                            key: 'login',
                            label: 'Already registered?',
                            component: Link,
                            href: route('login'),
                        },
                        {
                            key: 'register',
                            label: 'Register',
                            type: 'submit',
                            disabled: processing,
                        },
                    ]}
                />
            </Stack>
        </GuestLayout>
    );
}
