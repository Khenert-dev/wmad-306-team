import { useForm } from '@inertiajs/react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

export default function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const deleteUser = (event) => {
        event.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <Box component="section">
            <Typography variant="h6" color="error.main">
                Delete Account
            </Typography>
            <Typography color="text.secondary" sx={{ my: 2 }}>
                Once your account is deleted, all associated resources and data will be permanently removed.
            </Typography>

            <Button color="error" variant="contained" onClick={() => setConfirmingUserDeletion(true)}>
                Delete Account
            </Button>

            <Dialog open={confirmingUserDeletion} onClose={closeModal} fullWidth maxWidth="sm">
                <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                <DialogContent>
                    <Stack component="form" onSubmit={deleteUser} spacing={2} sx={{ mt: 1 }}>
                        <Typography color="text.secondary">
                            Please enter your password to confirm permanent account deletion.
                        </Typography>

                        <TextField
                            type="password"
                            label="Password"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            fullWidth
                            required
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={deleteUser} disabled={processing}>
                        Delete Account
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
