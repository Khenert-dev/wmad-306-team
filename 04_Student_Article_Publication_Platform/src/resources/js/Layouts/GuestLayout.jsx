import AIAssistantWidget from '@/Components/AIAssistantWidget';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <Box sx={{ minHeight: '100vh', py: { xs: 4, md: 7 }, backgroundColor: 'background.default' }}>
            <Container maxWidth="sm">
                <Stack spacing={2.5}>
                    <Stack
                        component={Link}
                        href="/"
                        direction="row"
                        spacing={1.25}
                        sx={{ textDecoration: 'none', alignItems: 'center', color: 'primary.main' }}
                    >
                        <ApplicationLogo style={{ width: 32, height: 32 }} />
                        <Typography variant="h4" sx={{ color: 'primary.main' }}>
                            Campus Press
                        </Typography>
                    </Stack>
                    <Paper elevation={3} sx={{ p: { xs: 2.5, sm: 4 } }}>
                        {children}
                    </Paper>
                </Stack>
            </Container>

            <AIAssistantWidget />
        </Box>
    );
}
