import CoolButton from '@/Components/CoolButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
    Button,
} from '@mui/material';
import JoditEditor from 'jodit-react';
import { useMemo, useState } from 'react';

export default function WriterDashboard({ articles, categories, flash }) {
    const createForm = useForm({
        title: '',
        content: '',
        category_id: categories[0]?.id ?? '',
    });

    const [revisionDrafts, setRevisionDrafts] = useState(() => {
        const draftMap = {};
        for (const article of articles) {
            draftMap[article.id] = {
                title: article.title,
                content: article.content,
                category_id: article.category_id,
            };
        }

        return draftMap;
    });

    const drafts = articles.filter((article) => article.status?.name === 'draft');
    const submitted = articles.filter((article) => article.status?.name === 'submitted');
    const needsRevision = articles.filter((article) => article.status?.name === 'needs_revision');

    const [statusFilter, setStatusFilter] = useState('all');

    const visibleArticles = useMemo(() => {
        if (statusFilter === 'draft') {
            return drafts;
        }
        if (statusFilter === 'submitted') {
            return submitted;
        }
        if (statusFilter === 'needs_revision') {
            return needsRevision;
        }
        return articles;
    }, [articles, drafts, submitted, needsRevision, statusFilter]);

    const joditConfig = useMemo(
        () => ({
            readonly: false,
            minHeight: 220,
            placeholder: 'Write your article content here...',
        }),
        []
    );

    const handleCreate = (event) => {
        event.preventDefault();
        createForm.post(route('articles.store'));
    };

    const updateRevisionField = (articleId, field, value) => {
        setRevisionDrafts((previous) => ({
            ...previous,
            [articleId]: {
                ...previous[articleId],
                [field]: value,
            },
        }));
    };

    return (
        <AuthenticatedLayout
            header={
                <Stack spacing={0.25}>
                    <Typography variant="h4">Writer Dashboard</Typography>
                    <Typography color="text.secondary">
                        Create drafts, submit for review, and handle revisions from editors.
                    </Typography>
                </Stack>
            }
        >
            <Head title="Writer Dashboard" />

            <Stack spacing={2.5}>
                {flash?.success && <Alert severity="success">{flash.success}</Alert>}

                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', lg: 'row' } }}>
                    <Stack
                        spacing={2}
                        sx={{
                            width: { xs: '100%', lg: 280 },
                            alignSelf: 'flex-start',
                            position: { lg: 'sticky' },
                            top: { lg: 92 },
                        }}
                    >
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                                Status summary
                            </Typography>
                            <Stack spacing={1}>
                                <Chip label={`Drafts: ${drafts.length}`} size="small" />
                                <Chip label={`Submitted: ${submitted.length}`} size="small" />
                                <Chip label={`Needs Revision: ${needsRevision.length}`} size="small" />
                            </Stack>
                        </Paper>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Workflow tips</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                                1. Save your draft first.
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                2. Submit only when your title, category, and content are finalized.
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                3. If revision is requested, update fields then submit revision.
                            </Typography>
                        </Paper>
                    </Stack>

                    <Stack spacing={2.5} sx={{ flex: 1, minWidth: 0 }}>
                        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    New article
                                </Typography>
                                <Box component="form" onSubmit={handleCreate}>
                                    <Stack spacing={2}>
                                        <TextField
                                            label="Title"
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
                                        <Box>
                                            <Typography variant="subtitle2" gutterBottom>
                                                Content
                                            </Typography>
                                            <JoditEditor
                                                value={createForm.data.content}
                                                config={joditConfig}
                                                onBlur={(value) => createForm.setData('content', value)}
                                            />
                                            {createForm.errors.content && (
                                                <Typography color="error" variant="caption">
                                                    {createForm.errors.content}
                                                </Typography>
                                            )}
                                        </Box>
                                        <CoolButton type="submit" disabled={createForm.processing} sx={{ alignSelf: 'flex-start' }}>
                                            Save draft
                                        </CoolButton>
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={1.5}
                            alignItems={{ xs: 'flex-start', sm: 'center' }}
                            justifyContent="space-between"
                        >
                            <Typography variant="h6">Article workspace</Typography>
                            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                {[
                                    { key: 'all', label: 'All' },
                                    { key: 'draft', label: 'Drafts' },
                                    { key: 'submitted', label: 'Submitted' },
                                    { key: 'needs_revision', label: 'Needs revision' },
                                ].map((option) => (
                                    <Button
                                        key={option.key}
                                        size="small"
                                        variant={statusFilter === option.key ? 'contained' : 'outlined'}
                                        onClick={() => setStatusFilter(option.key)}
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                            </Stack>
                        </Stack>

                        <Stack spacing={2}>
                            {visibleArticles.length === 0 ? (
                                <Paper sx={{ p: 2.5 }}>
                                    <Typography color="text.secondary">
                                        No articles in this view. Create a draft above or switch filters to see other articles.
                                    </Typography>
                                </Paper>
                            ) : (
                                visibleArticles.map((article) => (
                                    <Card key={article.id} elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                                        <CardContent>
                                            <Stack spacing={2}>
                                                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
                                                    <Box>
                                                        <Typography variant="h6">{article.title}</Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {article.category?.name} • Updated {new Date(article.updated_at).toLocaleString()}
                                                        </Typography>
                                                    </Box>
                                                    <Chip label={article.status?.label ?? 'Unknown'} color="primary" variant="outlined" />
                                                </Stack>

                                                {(article.status?.name === 'needs_revision' || article.status?.name === 'draft') && (
                                                    <>
                                                        <Divider />
                                                        <TextField
                                                            label="Title"
                                                            value={revisionDrafts[article.id]?.title ?? ''}
                                                            onChange={(event) => updateRevisionField(article.id, 'title', event.target.value)}
                                                            fullWidth
                                                        />
                                                        <TextField
                                                            select
                                                            label="Category"
                                                            value={revisionDrafts[article.id]?.category_id ?? ''}
                                                            onChange={(event) =>
                                                                updateRevisionField(article.id, 'category_id', event.target.value)
                                                            }
                                                            fullWidth
                                                        >
                                                            {categories.map((category) => (
                                                                <MenuItem key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                        <JoditEditor
                                                            value={revisionDrafts[article.id]?.content ?? ''}
                                                            config={joditConfig}
                                                            onBlur={(value) => updateRevisionField(article.id, 'content', value)}
                                                        />
                                                    </>
                                                )}

                                                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                                    {article.status?.name === 'draft' && (
                                                        <CoolButton onClick={() => router.post(route('articles.submit', article.id))}>
                                                            Submit
                                                        </CoolButton>
                                                    )}
                                                    {article.status?.name === 'needs_revision' && (
                                                        <CoolButton
                                                            onClick={() =>
                                                                router.put(route('articles.revise', article.id), revisionDrafts[article.id])
                                                            }
                                                        >
                                                            Submit Revision
                                                        </CoolButton>
                                                    )}
                                                </Stack>

                                                {article.revisions?.length > 0 && (
                                                    <Box sx={{ bgcolor: 'rgba(47,111,219,0.04)', borderRadius: 2, p: 1.5 }}>
                                                        <Typography variant="subtitle2" gutterBottom>
                                                            Latest Editor Feedback
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {article.revisions[article.revisions.length - 1]?.comments}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </Stack>
                    </Stack>
                </Box>

                <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Footer: Status messages / notifications</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Submission and revision notifications are delivered by the platform notification channels.
                    </Typography>
                </Paper>
            </Stack>
        </AuthenticatedLayout>
    );
}
