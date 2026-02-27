import ActionButtonGroup from '@/Components/ActionButtonGroup';
import CoolButton from '@/Components/CoolButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';

export default function EditorDashboard({ submittedArticles, publishedArticles, flash }) {
    const [revisionComments, setRevisionComments] = useState({});
    const [coverImageDrafts, setCoverImageDrafts] = useState(() => {
        const map = {};
        for (const article of [...submittedArticles, ...publishedArticles]) {
            map[article.id] = article.cover_image_url ?? '';
        }

        return map;
    });

    const saveCoverImage = (articleId) => {
        router.patch(route('articles.cover-image', articleId), {
            cover_image_url: coverImageDrafts[articleId] ?? '',
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <Stack spacing={0.25}>
                    <Typography variant="h4">Editor Dashboard</Typography>
                    <Typography color="text.secondary">
                        Review submissions, request revisions, publish articles, and curate homepage visuals.
                    </Typography>
                </Stack>
            }
        >
            <Head title="Editor Dashboard" />

            <Stack spacing={2.5}>
                {flash?.success && <Alert severity="success">{flash.success}</Alert>}

                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', lg: 'row' } }}>
                    <Stack spacing={2} sx={{ width: { xs: '100%', lg: 300 }, alignSelf: 'flex-start', position: { lg: 'sticky' }, top: { lg: 92 } }}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                                Editorial Queue
                            </Typography>
                            <Stack spacing={1}>
                                <Chip label={`Pending review: ${submittedArticles.length}`} size="small" />
                                <Chip label={`Published: ${publishedArticles.length}`} size="small" />
                            </Stack>
                        </Paper>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                                Image Curation
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                                Set cover image URLs so student-facing pages show strong visuals for latest publications.
                            </Typography>
                        </Paper>
                    </Stack>

                    <Stack spacing={2} sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h6">Pending Articles</Typography>
                        <Stack spacing={2}>
                            {submittedArticles.length === 0 ? (
                                <Paper sx={{ p: 2.5 }}>
                                    <Typography color="text.secondary">No pending submissions right now.</Typography>
                                </Paper>
                            ) : (
                                submittedArticles.map((article) => {
                                    const comments = revisionComments[article.id] ?? '';
                                    const commentsError = comments.trim().length === 0;

                                    return (
                                        <Card key={article.id}>
                                            <CardContent>
                                                <Stack spacing={2}>
                                                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
                                                        <Box>
                                                            <Typography variant="h6">{article.title}</Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                Writer: {article.writer?.name} • Category: {article.category?.name}
                                                            </Typography>
                                                        </Box>
                                                        <Chip label={article.status?.label} />
                                                    </Stack>

                                                    <Typography variant="body2" color="text.secondary">
                                                        {article.content.replace(/<[^>]*>?/gm, '').slice(0, 250)}...
                                                    </Typography>

                                                    <TextField
                                                        label="Cover image URL (reader homepage)"
                                                        value={coverImageDrafts[article.id] ?? ''}
                                                        onChange={(event) =>
                                                            setCoverImageDrafts((previous) => ({
                                                                ...previous,
                                                                [article.id]: event.target.value,
                                                            }))
                                                        }
                                                        fullWidth
                                                    />
                                                    <CoolButton tone="outline" sx={{ alignSelf: 'flex-start' }} onClick={() => saveCoverImage(article.id)}>
                                                        Save Image
                                                    </CoolButton>

                                                    <TextField
                                                        multiline
                                                        minRows={3}
                                                        label="Revision Feedback"
                                                        value={comments}
                                                        onChange={(event) =>
                                                            setRevisionComments((previous) => ({
                                                                ...previous,
                                                                [article.id]: event.target.value,
                                                            }))
                                                        }
                                                        helperText="Required when requesting revision"
                                                        fullWidth
                                                    />

                                                    <ActionButtonGroup
                                                        actions={[
                                                            {
                                                                key: 'request-revision',
                                                                label: 'Request Revision',
                                                                disabled: commentsError,
                                                                onClick: () =>
                                                                    router.post(route('articles.revision', article.id), {
                                                                        comments,
                                                                    }),
                                                            },
                                                            {
                                                                key: 'publish',
                                                                label: 'Publish',
                                                                onClick: () => router.post(route('articles.publish', article.id)),
                                                            },
                                                        ]}
                                                    />
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    );
                                })
                            )}
                        </Stack>

                        <Divider />

                        <Typography variant="h6">Published Articles</Typography>
                        <Stack spacing={1.25}>
                            {publishedArticles.length === 0 ? (
                                <Paper sx={{ p: 2.5 }}>
                                    <Typography color="text.secondary">No published articles yet.</Typography>
                                </Paper>
                            ) : (
                                publishedArticles.map((article) => (
                                    <Card key={article.id}>
                                        <CardContent>
                                            <Stack spacing={1.5}>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{article.title}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Writer: {article.writer?.name} • Category: {article.category?.name}
                                                </Typography>
                                                <TextField
                                                    label="Cover image URL"
                                                    value={coverImageDrafts[article.id] ?? ''}
                                                    onChange={(event) =>
                                                        setCoverImageDrafts((previous) => ({
                                                            ...previous,
                                                            [article.id]: event.target.value,
                                                        }))
                                                    }
                                                    fullWidth
                                                />
                                                <CoolButton tone="outline" sx={{ alignSelf: 'flex-start' }} onClick={() => saveCoverImage(article.id)}>
                                                    Update Image
                                                </CoolButton>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </Stack>
                    </Stack>
                </Box>

                <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Footer: Notifications</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Editorial events trigger submission, revision, and publication notifications to relevant users.
                    </Typography>
                </Paper>
            </Stack>
        </AuthenticatedLayout>
    );
}
