import CoolButton from '@/Components/CoolButton';
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

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    const deleteUser = (event) => {
        event.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    return (
        <Box component="section">
            <Typography variant="h6" color="error.main">Delete Account</Typography>
            <Typography color="text.secondary" sx={{ my: 2 }}>
                This action permanently removes your account and related personal data. It cannot be undone.
            </Typography>

            <CoolButton tone="outline" color="error" onClick={() => setConfirmingUserDeletion(true)}>
                Delete Account
            </CoolButton>

            <Dialog open={confirmingUserDeletion} onClose={closeModal} fullWidth maxWidth="sm">
                <DialogTitle>Confirm account deletion</DialogTitle>
                <DialogContent>
                    <Stack component="form" onSubmit={deleteUser} spacing={2} sx={{ mt: 1 }}>
                        <Typography color="text.secondary">
                            Enter your password to confirm permanent deletion.
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
