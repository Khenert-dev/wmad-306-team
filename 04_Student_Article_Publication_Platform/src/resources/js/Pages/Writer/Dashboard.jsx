import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import CoolButton from '@/Components/CoolButton';
import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
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

    const joditConfig = useMemo(
        () => ({
            readonly: false,
            minHeight: 220,
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
            header={<Typography variant="h4">Writer Dashboard</Typography>}
        >
            <Head title="Writer Dashboard" />

            <Stack spacing={2.5}>
                {flash?.success && <Alert severity="success">{flash.success}</Alert>}

                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                    <Paper sx={{ p: 2, width: { xs: '100%', md: 280 }, alignSelf: 'flex-start', position: { md: 'sticky' }, top: { md: 96 } }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                            Navigation
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="Create Article" secondary="New draft form" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="My Drafts" secondary={`${drafts.length} draft(s)`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Submitted Articles" secondary={`${submitted.length} submitted`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Needs Revision" secondary={`${needsRevision.length} article(s)`} />
                            </ListItem>
                        </List>
                    </Paper>

                    <Stack spacing={2} sx={{ flex: 1, minWidth: 0 }}>
                        <Card>
                            <CardContent>
                                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2 }}>
                                    <Chip label={`Drafts: ${drafts.length}`} size="small" />
                                    <Chip label={`Submitted: ${submitted.length}`} size="small" />
                                    <Chip label={`Needs Revision: ${needsRevision.length}`} size="small" />
                                </Stack>

                                <Typography variant="h6" gutterBottom>
                                    New Article Form
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
                                        <div>
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
                                        </div>
                                        <CoolButton type="submit" disabled={createForm.processing} sx={{ alignSelf: 'flex-start' }}>
                                            Save Draft
                                        </CoolButton>
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>

                        <Typography variant="h6">Article Workspace</Typography>
                        <Stack spacing={2}>
                            {articles.map((article) => (
                                <Card key={article.id}>
                                    <CardContent>
                                        <Stack spacing={2}>
                                            <Stack
                                                direction={{ xs: 'column', sm: 'row' }}
                                                justifyContent="space-between"
                                                spacing={1}
                                            >
                                                <div>
                                                    <Typography variant="h6">{article.title}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {article.category?.name} • Updated {new Date(article.updated_at).toLocaleString()}
                                                    </Typography>
                                                </div>
                                                <Chip label={article.status?.label ?? 'Unknown'} color="primary" variant="outlined" />
                                            </Stack>

                                            {(article.status?.name === 'needs_revision' || article.status?.name === 'draft') && (
                                                <>
                                                    <Divider />
                                                    <TextField
                                                        label="Title"
                                                        value={revisionDrafts[article.id]?.title ?? ''}
                                                        onChange={(event) =>
                                                            updateRevisionField(article.id, 'title', event.target.value)
                                                        }
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
                                                    <CoolButton
                                                        onClick={() => router.post(route('articles.submit', article.id))}
                                                    >
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
                                                <Box>
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
                            ))}
                        </Stack>
                    </Stack>
                </Box>

                <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Footer: Status messages / notifications</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Track draft progress, revision requests, and latest submission updates here.
                    </Typography>
                </Paper>
            </Stack>
        </AuthenticatedLayout>
    );
}
