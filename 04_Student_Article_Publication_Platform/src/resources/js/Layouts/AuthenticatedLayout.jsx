import AIAssistantWidget from '@/Components/AIAssistantWidget';
import ApplicationLogo from '@/Components/ApplicationLogo';
import ThemeModeToggle from '@/Components/ThemeModeToggle';
import { Link, router, usePage } from '@inertiajs/react';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useMemo, useState } from 'react';

export default function AuthenticatedLayout({ header, children, fullWidth = false }) {
    const theme = useTheme();
    const { auth } = usePage().props;
    const user = auth?.user;
    const roles = auth?.roles ?? [];
    const [mobileOpen, setMobileOpen] = useState(false);

    const roleMeta = useMemo(() => {
        if (roles.includes('writer')) {
            return {
                label: 'Writer',
                tone: 'info',
                home: { label: 'Writer Dashboard', href: route('writer.dashboard'), name: 'writer.dashboard' },
            };
        }

        if (roles.includes('editor')) {
            return {
                label: 'Editor',
                tone: 'secondary',
                home: { label: 'Editor Dashboard', href: route('editor.dashboard'), name: 'editor.dashboard' },
            };
        }

        if (roles.includes('student')) {
            return {
                label: 'Student',
                tone: 'success',
                home: { label: 'Student Dashboard', href: route('student.dashboard'), name: 'student.dashboard' },
            };
        }

        return {
            label: 'Member',
            tone: 'default',
            home: { label: 'Dashboard', href: route('dashboard'), name: 'dashboard' },
        };
    }, [roles]);

    const navItems = [
        roleMeta.home,
        { label: 'Home', href: route('welcome'), name: 'welcome' },
        { label: 'Profile', href: route('profile.edit'), name: 'profile.edit' },
    ];

    const navList = (
        <Box sx={{ width: 290, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ p: 2 }}>
                <ApplicationLogo style={{ width: 28, height: 28 }} />
                <Typography variant="h6">Campus Press</Typography>
            </Stack>
            <Divider />
            <List sx={{ py: 0 }}>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton
                            component={Link}
                            href={item.href}
                            selected={route().current(item.name)}
                            onClick={() => setMobileOpen(false)}
                        >
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{ mt: 'auto', p: 2 }}>
                <Button fullWidth onClick={() => router.post(route('logout'))}>
                    Log Out
                </Button>
            </Box>
        </Box>
    );

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: `radial-gradient(1200px 420px at 15% -15%, ${alpha('#2f6fdb', theme.palette.mode === 'dark' ? 0.25 : 0.18)}, transparent), ${theme.palette.background.default}`,
            }}
        >
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(10px)',
                    color: 'text.primary',
                }}
            >
                <Toolbar sx={{ minHeight: { xs: 64, md: 74 } }}>
                    <IconButton sx={{ display: { md: 'none' }, mr: 1 }} edge="start" onClick={() => setMobileOpen(true)}>
                        <MenuIcon />
                    </IconButton>

                    <Stack
                        component={Link}
                        href={route('welcome')}
                        direction="row"
                        spacing={1.2}
                        sx={{ textDecoration: 'none', alignItems: 'center', color: 'text.primary', flexGrow: 1 }}
                    >
                        <ApplicationLogo style={{ width: 30, height: 30, color: '#2f6fdb' }} />
                        <Box>
                            <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
                                Campus Press
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Student Journal Platform
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.name}
                                component={Link}
                                href={item.href}
                                sx={{
                                    px: 1.5,
                                    opacity: route().current(item.name) ? 1 : 0.75,
                                    fontWeight: route().current(item.name) ? 800 : 600,
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Stack>

                    <Stack direction="row" spacing={1.2} alignItems="center" sx={{ ml: 2 }}>
                        <ThemeModeToggle />
                        <Chip size="small" label={roleMeta.label} color={roleMeta.tone} variant="outlined" />
                        <Avatar sx={{ width: 36, height: 36, bgcolor: '#2f6fdb' }}>
                            {user?.name?.[0] ?? 'U'}
                        </Avatar>
                        <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 700 }}>
                            {user?.name}
                        </Typography>
                        <Button sx={{ display: { xs: 'none', md: 'inline-flex' } }} onClick={() => router.post(route('logout'))}>
                            Logout
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} sx={{ display: { md: 'none' } }}>
                {navList}
            </Drawer>

            <Container
                maxWidth={fullWidth ? false : 'xl'}
                sx={{
                    py: { xs: 2.5, md: 4 },
                    px: fullWidth ? { xs: 1.5, md: 3 } : undefined,
                }}
            >
                {header ? <Box sx={{ mb: 3 }}>{header}</Box> : null}
                {children}
            </Container>

            <AIAssistantWidget />
        </Box>
    );
}
