import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Alert, Paper, Stack, Typography } from '@mui/material';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <Stack spacing={0.25}>
                    <Typography variant="h4">Dashboard</Typography>
                    <Typography color="text.secondary">Role-aware workspace entry point.</Typography>
                </Stack>
            }
        >
            <Head title="Dashboard" />
            <Stack spacing={2}>
                <Alert severity="info">
                    Your account is authenticated. If you expected a role dashboard, run `php artisan migrate:fresh --seed`
                    and sign in with a seeded role account.
                </Alert>
                <Paper sx={{ p: 2.5 }}>
                    <Typography variant="h6">Quick Links</Typography>
                    <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                        Open <Link href={route('profile.edit')}>profile settings</Link> to verify account details,
                        or return to <Link href={route('welcome')}>homepage</Link>.
                    </Typography>
                </Paper>
            </Stack>
        </AuthenticatedLayout>
    );
}
