import React, { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button, Box, Typography, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        reset();
    };

    return (
        <section className={className}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
            </Typography>

            <Button variant="contained" color="error" onClick={confirmUserDeletion} size="large">
                Delete Account
            </Button>

            {/* --- CONFIRMATION DIALOG (MODAL) --- */}
            <Dialog open={confirmingUserDeletion} onClose={closeModal} PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
                <DialogTitle sx={{ fontWeight: 700 }}>
                    Are you sure you want to delete your account?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        type="password"
                        label="Password"
                        fullWidth
                        variant="outlined"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button onClick={closeModal} variant="text" color="secondary">Cancel</Button>
                    <Button onClick={deleteUser} variant="contained" color="error" disabled={processing}>
                        Delete Account
                    </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
}