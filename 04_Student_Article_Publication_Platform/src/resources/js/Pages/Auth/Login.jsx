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

const authAnimations = `
    @keyframes auth-container-enter {
        0% { opacity: 0; transform: scale(0.94) translateY(24px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes auth-reveal-up {
        0% { transform: translateY(80px); opacity: 0; filter: blur(8px); }
        100% { transform: translateY(0); opacity: 1; filter: blur(0); }
    }
    @keyframes auth-float-blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
    }
    .auth-animate-reveal-0 { animation: auth-reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
    .auth-animate-reveal-1 { animation: auth-reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
    .auth-animate-reveal-2 { animation: auth-reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }
    .auth-animate-reveal-3 { animation: auth-reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
    .auth-animate-reveal-4 { animation: auth-reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both; }
    .auth-animate-reveal-5 { animation: auth-reveal-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both; }
    .auth-animate-blob { animation: auth-float-blob 8s infinite ease-in-out; }
    .auth-animation-delay-2000 { animation-delay: 2s; }
    .auth-animation-delay-4000 { animation-delay: 4s; }
    .auth-container-enter { animation: auth-container-enter 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
`;

const textFieldSx = {
    '& .MuiOutlinedInput-root': { borderRadius: '1rem', fontWeight: 500 },
    '& .MuiInputLabel-root': { fontWeight: 600 },
};

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
            <style>{authAnimations}</style>
            <Box className="auth-container-enter" sx={{ minHeight: { xs: 420, md: 520 }, display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden' }}>
                {/* Floating blobs */}
                <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                    <Box
                        className="auth-animate-blob"
                        sx={{
                            position: 'absolute', top: 60, left: '-10%',
                            width: 200, height: 200, borderRadius: '50%',
                            bgcolor: '#2f6fdb', opacity: 0.15, mixBlendMode: 'multiply',
                        }}
                    />
                    <Box
                        className="auth-animate-blob auth-animation-delay-2000"
                        sx={{
                            position: 'absolute', top: 120, right: '-5%',
                            width: 180, height: 180, borderRadius: '50%',
                            bgcolor: '#7ea5ea', opacity: 0.12, mixBlendMode: 'multiply',
                        }}
                    />
                    <Box
                        className="auth-animate-blob auth-animation-delay-4000"
                        sx={{
                            position: 'absolute', bottom: 80, left: '20%',
                            width: 160, height: 160, borderRadius: '50%',
                            bgcolor: '#1e4b9b', opacity: 0.1, mixBlendMode: 'multiply',
                        }}
                    />
                </Box>

                <Box
                    className="auth-animate-reveal-0"
                    sx={{
                        position: 'relative',
                        zIndex: 1,
                        width: '100%',
                        maxWidth: 520,
                        p: { xs: 2.25, md: 3.25 },
                        borderRadius: '2rem',
                        border: '1px solid rgba(47,111,219,0.2)',
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.35), rgba(255,255,255,0.1))',
                        backdropFilter: 'blur(16px)',
                        boxShadow: '0 20px 45px rgba(47, 111, 219, 0.12), 0 4px 6px -1px rgba(0,0,0,0.05)',
                        transition: 'box-shadow 0.5s ease',
                        '&:hover': { boxShadow: '0 24px 50px rgba(47, 111, 219, 0.16)' },
                    }}
                >
                    <Stack spacing={2.25} component="form" onSubmit={submit}>
                        <Box className="auth-animate-reveal-1">
                            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                                Sign in
                            </Typography>
                            <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                                Access your writer, editor, or student workspace.
                            </Typography>
                        </Box>

                        {status && <Alert severity="success" className="auth-animate-reveal-1">{status}</Alert>}

                        <TextField
                            className="auth-animate-reveal-2"
                            label="Email"
                            type="email"
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            fullWidth
                            required
                            sx={textFieldSx}
                        />

                        <TextField
                            className="auth-animate-reveal-2"
                            label="Password"
                            type="password"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            fullWidth
                            required
                            sx={textFieldSx}
                        />

                        <FormControlLabel
                            className="auth-animate-reveal-3"
                            control={
                                <Checkbox
                                    checked={data.remember}
                                    onChange={(event) => setData('remember', event.target.checked)}
                                    sx={{ '&.Mui-checked': { color: '#2f6fdb' } }}
                                />
                            }
                            label="Remember me"
                        />

                        <Stack className="auth-animate-reveal-4" direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
                            {canResetPassword && (
                                <Button
                                    component={Link}
                                    href={route('password.request')}
                                    variant="outlined"
                                    sx={{ borderRadius: '0.9rem', fontWeight: 700, textTransform: 'none' }}
                                >
                                    Forgot password?
                                </Button>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={processing}
                                sx={{ borderRadius: '0.9rem', px: 2.5, fontWeight: 700, textTransform: 'none', bgcolor: '#2f6fdb', '&:hover': { bgcolor: '#2157b4' } }}
                            >
                                Log in
                            </Button>
                        </Stack>

                        <Box
                            className="auth-animate-reveal-4"
                            sx={{
                                border: '1px solid rgba(47,111,219,0.22)',
                                borderRadius: '1rem',
                                p: 1.5,
                                bgcolor: 'rgba(47,111,219,0.06)',
                                transition: 'all 0.3s ease',
                                '&:hover': { borderColor: 'rgba(47,111,219,0.35)' },
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#2f6fdb' }}>
                                Seeded role accounts
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Use the seeded writer/editor/student emails from your seeder. Password is your seeded default (often `password`).
                            </Typography>
                        </Box>

                        <Button
                            variant="outlined"
                            component={Link}
                            href={route('register')}
                            className="auth-animate-reveal-5"
                            sx={{ borderRadius: '0.9rem', py: 1.15, fontWeight: 700, textTransform: 'none' }}
                        >
                            Create account
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </GuestLayout>
    );
}
