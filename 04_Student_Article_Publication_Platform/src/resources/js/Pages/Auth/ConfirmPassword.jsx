import CoolButton from '@/Components/CoolButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { Box, Stack, TextField, Typography } from '@mui/material';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({ password: '' });

    const submit = (event) => {
        event.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />
            <Stack spacing={2.25} component="form" onSubmit={submit}>
                <Box>
                    <Typography variant="h4">Confirm identity</Typography>
                    <Typography color="text.secondary">
                        This is a protected area. Confirm your password before continuing.
                    </Typography>
                </Box>
                <TextField
                    label="Password"
                    type="password"
                    value={data.password}
                    onChange={(event) => setData('password', event.target.value)}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    required
                    fullWidth
                />
                <CoolButton type="submit" disabled={processing}>Confirm</CoolButton>
            </Stack>
        </GuestLayout>
    );
}
