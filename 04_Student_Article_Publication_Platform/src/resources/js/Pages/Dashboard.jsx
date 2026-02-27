import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Alert, Stack, Typography } from '@mui/material';

export default function Dashboard() {
    return (
        <AuthenticatedLayout header={<Typography variant="h5">Dashboard</Typography>}>
            <Head title="Dashboard" />
            <Stack spacing={2}>
                <Alert severity="info">
                    Your account is authenticated. If you expected a role dashboard, run `php artisan migrate:fresh --seed`
                    and sign in with a seeded account.
                </Alert>
            </Stack>
        </AuthenticatedLayout>
    );
}
