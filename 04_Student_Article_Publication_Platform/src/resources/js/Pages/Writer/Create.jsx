import CoolButton from '@/Components/CoolButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Alert, Box, MenuItem, Stack, TextField, Typography } from '@mui/material';
import JoditEditor from 'jodit-react';
import { useMemo } from 'react';

export default function WriterCreate({ categories = [], flash }) {
    const createForm = useForm({
        title: '',
        content: '',
        category_id: categories[0]?.id ?? '',
        action: 'draft',
    });

    const joditConfig = useMemo(() => ({
        readonly: false,
        minHeight: 380,
        placeholder: 'Start writing your campus story here...',
        style: { background: 'transparent' },
    }), []);

    const handleCreate = (event) => {
        event.preventDefault();

        const requestedAction = event?.nativeEvent?.submitter?.value === 'submit'
            ? 'submit'
            : 'draft';

        createForm.transform((data) => ({
            ...data,
            action: requestedAction,
        }));

        createForm.post(route('articles.store'), {
            onSuccess: () => createForm.reset('title', 'content'),
            onFinish: () => createForm.transform((data) => data),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <Stack spacing={0.25}>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                        New Article
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: '1rem', fontWeight: 500 }}>
                        Write once, then either save as draft or submit for review.
                    </Typography>
                </Stack>
            }
            fullWidth
        >
            <Head title="New Article" />

            <Box sx={{ maxWidth: 1080, mx: 'auto' }}>
                {flash?.success && (
                    <Alert severity="success" sx={{ borderRadius: 2.5, mb: 2 }}>
                        {flash.success}
                    </Alert>
                )}
                {flash?.error && (
                    <Alert severity="error" sx={{ borderRadius: 2.5, mb: 2 }}>
                        {flash.error}
                    </Alert>
                )}

                <Box
                    component="form"
                    onSubmit={handleCreate}
                    sx={{
                        borderRadius: '1.5rem',
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        p: { xs: 2.5, md: 3.5 },
                    }}
                >
                    <Stack spacing={3}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <TextField
                                label="Catchy Title"
                                value={createForm.data.title}
                                onChange={(event) => createForm.setData('title', event.target.value)}
                                error={Boolean(createForm.errors.title)}
                                helperText={createForm.errors.title}
                                fullWidth
                            />
                            <TextField
                                select
                                label="Category"
                                value={createForm.data.category_id}
                                onChange={(event) => createForm.setData('category_id', event.target.value)}
                                error={Boolean(createForm.errors.category_id)}
                                helperText={createForm.errors.category_id}
                                fullWidth
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Stack>

                        <Box sx={{ borderRadius: 2, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                            <JoditEditor
                                value={createForm.data.content}
                                config={joditConfig}
                                onBlur={(value) => createForm.setData('content', value)}
                            />
                        </Box>

                        <Stack direction="row" spacing={1.5}>
                            <CoolButton type="submit" value="draft" disabled={createForm.processing}>
                                Save Draft
                            </CoolButton>
                            <CoolButton type="submit" value="submit" disabled={createForm.processing}>
                                Submit for Review
                            </CoolButton>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </AuthenticatedLayout>
    );
}
