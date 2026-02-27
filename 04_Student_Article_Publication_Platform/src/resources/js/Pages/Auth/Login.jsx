import ActionButtonGroup from '@/Components/ActionButtonGroup';
import CoolButton from '@/Components/CoolButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Alert,
    Box,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (event) => {
        event.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <Box sx={{ minHeight: { xs: 420, md: 520 }, display: 'grid', placeItems: 'center' }}>
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 520,
                        p: { xs: 2.25, md: 3 },
                        borderRadius: 3,
                        border: '1px solid rgba(255,255,255,0.25)',
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.28), rgba(255,255,255,0.08))',
                        backdropFilter: 'blur(14px)',
                        boxShadow: '0 20px 45px rgba(20, 42, 82, 0.16)',
                    }}
                >
                    <Stack spacing={2.25} component="form" onSubmit={submit}>
                        <Box>
                            <Typography variant="h4">Sign in</Typography>
                            <Typography color="text.secondary">Access your writer, editor, or student workspace.</Typography>
                        </Box>

                        {status && <Alert severity="success">{status}</Alert>}

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

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={data.remember}
                                    onChange={(event) => setData('remember', event.target.checked)}
                                />
                            }
                            label="Remember me"
                        />

                        <ActionButtonGroup
                            variant="contained"
                            sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                            actions={[
                                ...(canResetPassword
                                    ? [{
                                        key: 'forgot',
                                        label: 'Forgot password?',
                                        component: Link,
                                        href: route('password.request'),
                                    }]
                                    : []),
                                {
                                    key: 'login',
                                    label: 'Log in',
                                    type: 'submit',
                                    disabled: processing,
                                },
                            ]}
                        />

                        <Box sx={{ border: '1px solid rgba(47,111,219,0.16)', borderRadius: 2, p: 1.5, bgcolor: 'rgba(47,111,219,0.06)' }}>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                Seeded role accounts
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Use the seeded writer/editor/student emails from your seeder. Password is your seeded default (often `password`).
                            </Typography>
                        </Box>

                        <CoolButton tone="outline" component={Link} href={route('register')}>
                            Create account
                        </CoolButton>
                    </Stack>
                </Box>
            </Box>
        </GuestLayout>
    );
}
