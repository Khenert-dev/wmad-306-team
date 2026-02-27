import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeModeToggle from '@/Components/ThemeModeToggle';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Alert, Box, Button, Card, CardContent, Container, Divider, Paper, Stack, TextField, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

const stripHtml = (value) => value?.replace(/<[^>]*>?/gm, '') ?? '';

export default function PublicPublicationShow({ article, latestPublications = [] }) {
    const theme = useTheme();
    const { auth, flash } = usePage().props;
    const isGuest = !auth?.user;
    const isStudent = auth?.roles?.includes('student');
    const plainContent = stripHtml(article?.content);
    const previewText = plainContent.slice(0, 1400);
    const commentForm = useForm({ content: '' });

    const submitComment = (event) => {
        event.preventDefault();

        commentForm.post(route('articles.comment', article.id), {
            onSuccess: () => commentForm.reset('content'),
        });
    };

    return (
        <>
            <Head title={article?.title ?? 'Publication'} />

            <Box
                sx={{
                    minHeight: '100vh',
                    background: `radial-gradient(1000px 360px at 12% -10%, ${alpha(theme.palette.primary.main, 0.16)}, transparent), ${theme.palette.background.default}`,
                }}
            >
                <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                        <Stack component={Link} href={route('welcome')} direction="row" spacing={1} sx={{ textDecoration: 'none', color: 'text.primary', alignItems: 'center' }}>
                            <ApplicationLogo style={{ width: 28, height: 28, color: theme.palette.primary.main }} />
                            <Typography variant="h6">Campus Press</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <ThemeModeToggle size="small" />
                            {auth?.user ? (
                                <Button variant="contained" component={Link} href={route('dashboard')}>
                                    Dashboard
                                </Button>
                            ) : (
                                <Button variant="contained" component={Link} href={route('login')}>
                                    Log in
                                </Button>
                            )}
                        </Stack>
                    </Stack>

                    <Paper sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 3 }}>
                        <Typography variant="overline" color="text.secondary">
                            Published Journal
                        </Typography>
                        <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.6rem' }, mt: 0.5 }}>
                            {article?.title}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                            By {article?.writer?.name} • {article?.category?.name} • Updated {new Date(article?.updated_at).toLocaleString()}
                        </Typography>

                        <Divider sx={{ my: 2.5 }} />

                        {isGuest ? (
                            <Box>
                                <Typography sx={{ whiteSpace: 'pre-line' }}>{previewText}{plainContent.length > previewText.length ? '...' : ''}</Typography>
                                <Paper sx={{ mt: 2, p: 2, bgcolor: alpha(theme.palette.primary.main, 0.08) }}>
                                    <Typography variant="subtitle2">Guest Preview Access</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                                        You are viewing a limited journal preview. Sign in as a student to access complete content and comments.
                                    </Typography>
                                    <Button sx={{ mt: 1.25 }} variant="contained" component={Link} href={route('login')}>
                                        Log in for full access
                                    </Button>
                                </Paper>
                            </Box>
                        ) : (
                            <Box>
                                <Typography sx={{ whiteSpace: 'pre-line' }}>{plainContent}</Typography>
                            </Box>
                        )}

                        {!isGuest && (
                            <Box sx={{ mt: 2.5, borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
                                <Typography variant="h6">Comments</Typography>

                                {flash?.success && (
                                    <Alert severity="success" sx={{ mt: 1.25 }}>
                                        {flash.success}
                                    </Alert>
                                )}

                                {isStudent ? (
                                    <Stack component="form" onSubmit={submitComment} spacing={1.25} sx={{ mt: 1.25 }}>
                                        <TextField
                                            label="Write a comment"
                                            multiline
                                            minRows={3}
                                            value={commentForm.data.content}
                                            onChange={(event) => commentForm.setData('content', event.target.value)}
                                            error={Boolean(commentForm.errors.content)}
                                            helperText={commentForm.errors.content}
                                            fullWidth
                                        />
                                        <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }} disabled={commentForm.processing}>
                                            Post Comment
                                        </Button>
                                    </Stack>
                                ) : (
                                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                                        Only student accounts can comment on published journals.
                                    </Typography>
                                )}

                                <Stack spacing={1} sx={{ mt: 2 }}>
                                    {(article.comments ?? []).slice(0, 10).map((comment) => (
                                        <Paper key={comment.id} variant="outlined" sx={{ p: 1.25 }}>
                                            <Typography variant="body2">
                                                {comment.content}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {comment.student?.name ?? 'Student'}
                                            </Typography>
                                        </Paper>
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </Paper>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="h5" sx={{ mb: 1.5 }}>
                            More Published Journals
                        </Typography>
                        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' } }}>
                            {latestPublications.map((item) => (
                                <Card key={item.id}>
                                    <CardContent>
                                        <Typography variant="h6">{item.title}</Typography>
                                        <Typography color="text.secondary" sx={{ mt: 0.75 }}>
                                            {stripHtml(item.content).slice(0, 140)}...
                                        </Typography>
                                        <Button sx={{ mt: 1.25 }} component={Link} href={route('publications.show', item.id)}>
                                            Open Preview
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
}
