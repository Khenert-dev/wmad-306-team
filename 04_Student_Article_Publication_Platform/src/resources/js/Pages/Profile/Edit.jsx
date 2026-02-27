import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Paper, Stack, Typography } from '@mui/material';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdateAppearancePreferencesForm from './Partials/UpdateAppearancePreferencesForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <Stack spacing={0.25}>
                    <Typography variant="h4">Profile Settings</Typography>
                    <Typography color="text.secondary">
                        Manage your account details, password security, and account lifecycle.
                    </Typography>
                </Stack>
            }
        >
            <Head title="Profile" />

            <Stack spacing={2.5}>
                <Paper sx={{ p: { xs: 2, md: 3 } }}>
                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                </Paper>

                <Paper sx={{ p: { xs: 2, md: 3 } }}>
                    <UpdatePasswordForm />
                </Paper>

                <Paper sx={{ p: { xs: 2, md: 3 } }}>
                    <UpdateAppearancePreferencesForm />
                </Paper>

                <Paper sx={{ p: { xs: 2, md: 3 } }}>
                    <DeleteUserForm />
                </Paper>
            </Stack>
        </AuthenticatedLayout>
    );
}
