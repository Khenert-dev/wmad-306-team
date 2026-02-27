import AIAssistantWidget from '@/Components/AIAssistantWidget';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, router, usePage } from '@inertiajs/react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
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
import MenuIcon from '@mui/icons-material/Menu';
import { useMemo, useState } from 'react';

export default function AuthenticatedLayout({ header, children, fullWidth = false }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const roles = auth?.roles ?? [];
    const [mobileOpen, setMobileOpen] = useState(false);

    const roleNav = useMemo(() => {
        if (roles.includes('writer')) {
            return [{ label: 'Writer Dashboard', href: route('writer.dashboard'), name: 'writer.dashboard' }];
        }

        if (roles.includes('editor')) {
            return [{ label: 'Editor Dashboard', href: route('editor.dashboard'), name: 'editor.dashboard' }];
        }

        if (roles.includes('student')) {
            return [{ label: 'Student Dashboard', href: route('student.dashboard'), name: 'student.dashboard' }];
        }

        return [{ label: 'Dashboard', href: route('dashboard'), name: 'dashboard' }];
    }, [roles]);

    const navItems = [
        ...roleNav,
        { label: 'Profile', href: route('profile.edit'), name: 'profile.edit' },
    ];

    const navList = (
        <List sx={{ width: 280 }}>
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
            <ListItem disablePadding>
                <ListItemButton onClick={() => router.post(route('logout'))}>
                    <ListItemText primary="Log Out" />
                </ListItemButton>
            </ListItem>
        </List>
    );

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    borderBottom: '1px solid rgba(255,255,255,0.2)',
                    backgroundColor: 'primary.main',
                }}
            >
                <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }}>
                    <IconButton
                        sx={{ color: '#fff', display: { md: 'none' }, mr: 1 }}
                        edge="start"
                        onClick={() => setMobileOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Stack
                        component={Link}
                        href="/"
                        direction="row"
                        spacing={1.2}
                        sx={{ textDecoration: 'none', alignItems: 'center', color: '#fff', flexGrow: 1 }}
                    >
                        <ApplicationLogo style={{ width: 28, height: 28 }} />
                        <Typography variant="h6" sx={{ color: '#fff' }}>
                            Campus Press
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.name}
                                component={Link}
                                href={item.href}
                                sx={{ color: '#fff', opacity: route().current(item.name) ? 1 : 0.86 }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Stack>
                    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ ml: 2 }}>
                        <Avatar sx={{ width: 34, height: 34, bgcolor: '#fff', color: 'primary.main' }}>
                            {user?.name?.[0] ?? 'U'}
                        </Avatar>
                        <Typography variant="body2" sx={{ color: '#fff', display: { xs: 'none', sm: 'block' } }}>
                            {user?.name}
                        </Typography>
                        <Button sx={{ color: '#fff' }} onClick={() => router.post(route('logout'))}>
                            Logout
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} sx={{ display: { md: 'none' } }}>
                {navList}
            </Drawer>

            <Container maxWidth={fullWidth ? false : 'lg'} sx={{ py: { xs: 2.5, md: 4 }, px: fullWidth ? { xs: 2, md: 4 } : undefined }}>
                {header ? <Box sx={{ mb: 3 }}>{header}</Box> : null}
                {children}
            </Container>

            <AIAssistantWidget />
        </Box>
    );
}
