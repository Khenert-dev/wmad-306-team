import CoolButton from '@/Components/CoolButton';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';

export default function UpdateProfileInformationForm({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => { e.preventDefault(); patch(route('profile.update')); };

    return (
        <Box className="bg-white dark:bg-gray-800/80 rounded-[2rem] p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700/50">
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>👤 Profile Information</Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Update your account identity used for submissions and comments.
            </Typography>

            <Stack component="form" onSubmit={submit} spacing={3}>
                <TextField label="Name" value={data.name} onChange={(e) => setData('name', e.target.value)}
                    error={Boolean(errors.name)} helperText={errors.name} required fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />

                <TextField label="Email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)}
                    error={Boolean(errors.email)} helperText={errors.email} required fullWidth
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />

                {mustVerifyEmail && user.email_verified_at === null && (
                    <Alert severity="warning" sx={{ borderRadius: 3 }}>
                        Your email is unverified. <Button component={Link} href={route('verification.send')} method="post">Resend</Button>
                    </Alert>
                )}

                <Stack direction="row" spacing={2} alignItems="center">
                    <CoolButton type="submit" disabled={processing}>Save Changes</CoolButton>
                    {recentlySuccessful && <Typography color="success.main" sx={{ fontWeight: 600 }}>✨ Saved</Typography>}
                </Stack>
            </Stack>
        </Box>
    );
}