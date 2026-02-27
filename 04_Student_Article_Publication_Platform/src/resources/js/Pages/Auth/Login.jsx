import CoolButton from '@/Components/CoolButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Alert,
    Box,
    Button,
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
            <Stack spacing={2} component="form" onSubmit={submit}>
                <Typography variant="h5">Sign In</Typography>
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

                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    {canResetPassword ? (
                        <Button component={Link} href={route('password.request')}>
                            Forgot password?
                        </Button>
                    ) : (
                        <span />
                    )}
                    <CoolButton type="submit" disabled={processing}>
                        Log in
                    </CoolButton>
                </Box>

                <CoolButton tone="outline" component={Link} href={route('register')}>
                    Create account
                </CoolButton>
            </Stack>
        </GuestLayout>
    );
}
