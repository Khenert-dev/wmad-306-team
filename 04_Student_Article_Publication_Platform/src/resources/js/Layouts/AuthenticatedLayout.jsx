import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react'; // Added usePage to check current route
import { 
    Box, Drawer, AppBar, Toolbar, List, Typography, Divider, 
    IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, 
    Avatar, ThemeProvider, createTheme, Menu, MenuItem
} from '@mui/material';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import EditNoteIcon from '@mui/icons-material/EditNote';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

const drawerWidth = 260;

// --- APPLE-INSPIRED THEME (Keep existing) ---
const appleTheme = createTheme({
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        h6: { fontWeight: 700, letterSpacing: '-0.2px', color: '#1d1d1f' },
        button: { textTransform: 'none', fontWeight: 600 },
        body1: { color: '#1d1d1f' },
        body2: { color: '#86868b' }
    },
    shape: { borderRadius: 14 },
    palette: {
        primary: { main: '#007AFF' },
        background: { default: '#f5f5f7', paper: '#ffffff' },
    },
});

export default function AuthenticatedLayout({ user, header, children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { url } = usePage(); // Get current URL to highlight active link

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const navTo = (routeName) => {
        router.get(route(routeName));
        setMobileOpen(false);
    };

    // --- ROLE-BASED NAVIGATION LOGIC ---
    // Check if user has specific roles (passed from Spatie/Inertia share)
    const roles = user.roles ? user.roles.map(r => r.name) : [];
    const isWriter = roles.includes('writer');
    const isEditor = roles.includes('editor');
    const isStudent = roles.includes('student');

    const drawer = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Toolbar sx={{ px: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ bgcolor: '#007AFF', width: 32, height: 32 }}>
                    <ArticleIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>CampusPress</Typography>
            </Toolbar>
            <Divider sx={{ borderColor: 'rgba(0,0,0,0.04)' }} />
            
            <List sx={{ px: 2, pt: 2, flexGrow: 1 }}>
                {/* General Dashboard */}
                <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemButton 
                        onClick={() => navTo('dashboard')} 
                        selected={url === '/dashboard'}
                        sx={{ borderRadius: 2 }}
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}><DashboardIcon fontSize="small" /></ListItemIcon>
                        <ListItemText primary="Main Hub" primaryTypographyProps={{ fontWeight: 600 }} />
                    </ListItemButton>
                </ListItem>

                <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase' }}>
                    Workspaces
                </Typography>

                {/* WRITER LINK */}
                {isWriter && (
                    <ListItem disablePadding sx={{ mb: 1 }}>
                        <ListItemButton 
                            onClick={() => navTo('writer.dashboard')}
                            selected={url.startsWith('/writer')}
                            sx={{ borderRadius: 2 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}><EditNoteIcon fontSize="small" /></ListItemIcon>
                            <ListItemText primary="Writer Space" primaryTypographyProps={{ fontWeight: 600 }} />
                        </ListItemButton>
                    </ListItem>
                )}

                {/* EDITOR LINK */}
                {isEditor && (
                    <ListItem disablePadding sx={{ mb: 1 }}>
                        <ListItemButton 
                            onClick={() => navTo('editor.dashboard')}
                            selected={url.startsWith('/editor')}
                            sx={{ borderRadius: 2 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}><RateReviewIcon fontSize="small" /></ListItemIcon>
                            <ListItemText primary="Editor Desk" primaryTypographyProps={{ fontWeight: 600 }} />
                        </ListItemButton>
                    </ListItem>
                )}

                {/* STUDENT LINK */}
                {isStudent && (
                    <ListItem disablePadding sx={{ mb: 1 }}>
                        <ListItemButton 
                            onClick={() => navTo('student.dashboard')}
                            selected={url.startsWith('/student')}
                            sx={{ borderRadius: 2 }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}><DynamicFeedIcon fontSize="small" /></ListItemIcon>
                            <ListItemText primary="Campus Feed" primaryTypographyProps={{ fontWeight: 600 }} />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>

            <Box sx={{ p: 2 }}>
                <Box 
                    onClick={handleMenuOpen}
                    sx={{ 
                        display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, 
                        borderRadius: 3, cursor: 'pointer',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                    }}
                >
                    <Avatar sx={{ width: 36, height: 36, bgcolor: '#1d1d1f' }}>
                        {user.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ overflow: 'hidden' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, noWrap: true }}>{user.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#86868b', display: 'block', noWrap: true }}>{user.email}</Typography>
                    </Box>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                    transformOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                    PaperProps={{ sx: { borderRadius: 3, minWidth: 200 } }}
                >
                    <MenuItem onClick={handleProfile} sx={{ gap: 1.5 }}>
                        <PersonIcon fontSize="small" /> Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => router.post(route('logout'))} sx={{ gap: 1.5, color: '#ff3b30' }}>
                        <LogoutIcon fontSize="small" /> Log Out
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );

    return (
        <ThemeProvider theme={appleTheme}>
            <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        bgcolor: 'rgba(245, 245, 247, 0.8)',
                        backdropFilter: 'blur(20px)',
                        color: '#1d1d1f',
                        borderBottom: '1px solid rgba(0,0,0,0.05)'
                    }}
                >
                    <Toolbar>
                        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }}>{header}</Box>
                    </Toolbar>
                </AppBar>

                <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth } }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, borderRight: '1px solid rgba(0,0,0,0.05)' } }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>

                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
}