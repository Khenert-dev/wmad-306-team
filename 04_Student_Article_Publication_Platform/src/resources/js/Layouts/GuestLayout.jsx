import AIAssistantWidget from '@/Components/AIAssistantWidget';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeModeToggle from '@/Components/ThemeModeToggle';
import { Link } from '@inertiajs/react';
import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

export default function GuestLayout({ children }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box
            sx={{
                minHeight: '100vh',
                py: { xs: 3.5, md: 7 },
                background: `linear-gradient(145deg, ${alpha('#2f6fdb', isDark ? 0.24 : 0.1)}, ${alpha(theme.palette.background.default, 0.86)} 35%, ${theme.palette.background.default} 80%)`,
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        border: '1px solid rgba(47,111,219,0.14)',
                    }}
                >
                    <Stack direction={{ xs: 'column', md: 'row' }}>
                        <Box
                            sx={{
                                p: { xs: 3, md: 4 },
                                width: { md: '42%' },
                                background:
                                    'linear-gradient(155deg, rgba(47,111,219,0.95), rgba(47,111,219,0.8), rgba(18,64,148,0.92))',
                                color: '#fff',
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <ThemeModeToggle size="small" />
                            </Box>
                            <Stack component={Link} href={route('welcome')} direction="row" spacing={1.2} sx={{ textDecoration: 'none', color: '#fff', alignItems: 'center' }}>
                                <ApplicationLogo style={{ width: 32, height: 32 }} />
                                <Typography variant="h5" sx={{ color: '#fff' }}>
                                    Campus Press
                                </Typography>
                            </Stack>
                            <Typography sx={{ mt: 2, opacity: 0.92 }}>
                                Premium student publication workspace for writers, editors, and readers.
                            </Typography>
                            <Divider sx={{ my: 2.5, borderColor: 'rgba(255,255,255,0.22)' }} />
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                Use your seeded account to access role dashboards and publication workflows.
                            </Typography>
                        </Box>

                        <Box sx={{ p: { xs: 2.5, sm: 3.5, md: 4 }, flex: 1 }}>{children}</Box>
                    </Stack>
                </Paper>
            </Container>

            <AIAssistantWidget />
        </Box>
    );
}
