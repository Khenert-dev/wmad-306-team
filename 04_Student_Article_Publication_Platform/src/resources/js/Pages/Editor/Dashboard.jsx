import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
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
        <AuthenticatedLayout header={<Typography variant="h4">Editor Dashboard</Typography>}>
            <Head title="Editor Dashboard" />

            <Stack spacing={2.5}>
                {flash?.success && <Alert severity="success">{flash.success}</Alert>}

                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                    <Paper sx={{ p: 2, width: { xs: '100%', md: 280 }, alignSelf: 'flex-start', position: { md: 'sticky' }, top: { md: 96 } }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                            Navigation
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText primary="Pending Articles" secondary={`${submittedArticles.length} awaiting review`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Published Articles" secondary={`${publishedArticles.length} published`} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Homepage Images" secondary="Manage article cover images" />
                            </ListItem>
                        </List>
                    </Paper>

                    <Stack spacing={2} sx={{ flex: 1, minWidth: 0 }}>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                            <Chip label={`Pending: ${submittedArticles.length}`} size="small" />
                            <Chip label={`Published: ${publishedArticles.length}`} size="small" />
                        </Stack>

                        <Typography variant="h6">Pending Articles</Typography>
                        <Stack spacing={2}>
                            {submittedArticles.map((article) => {
                                const comments = revisionComments[article.id] ?? '';
                                const commentsError = comments.trim().length === 0;

                                return (
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
                                                            Writer: {article.writer?.name} • Category: {article.category?.name}
                                                        </Typography>
                                                    </div>
                                                    <Chip label={article.status?.label} />
                                                </Stack>

                                                <Typography variant="body2" color="text.secondary">
                                                    {article.content.replace(/<[^>]*>?/gm, '').slice(0, 220)}...
                                                </Typography>

                                                <TextField
                                                    label="Cover image URL (for reader homepage)"
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

                                                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                                    <CoolButton
                                                        tone="outline"
                                                        disabled={commentsError}
                                                        onClick={() =>
                                                            router.post(route('articles.revision', article.id), {
                                                                comments,
                                                            })
                                                        }
                                                    >
                                                        Request Revision
                                                    </CoolButton>
                                                    <CoolButton
                                                        onClick={() => router.post(route('articles.publish', article.id))}
                                                    >
                                                        Publish
                                                    </CoolButton>
                                                </Stack>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </Stack>

                        <Divider />

                        <Typography variant="h6">Published Articles</Typography>
                        <Stack spacing={1}>
                            {publishedArticles.map((article) => (
                                <Card key={article.id}>
                                    <CardContent>
                                        <Stack spacing={1.5}>
                                            <Typography variant="subtitle1">{article.title}</Typography>
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
                            ))}
                        </Stack>
                    </Stack>
                </Box>

                <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle2">Footer: Notifications</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Editorial alerts such as new submissions and publication confirmations appear here.
                    </Typography>
                </Paper>
            </Stack>
        </AuthenticatedLayout>
    );
}
