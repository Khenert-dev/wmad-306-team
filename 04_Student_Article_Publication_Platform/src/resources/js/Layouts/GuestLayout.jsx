import React from 'react';
import { Link } from '@inertiajs/react';
import { Box, Paper, Typography, ThemeProvider, createTheme, Avatar } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

// --- APPLE-INSPIRED MUI THEME ---
const appleTheme = createTheme({
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        h5: { fontWeight: 700, letterSpacing: '-0.5px', color: '#1d1d1f' },
        button: { textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' },
        body2: { color: '#86868b' }
    },
    shape: { borderRadius: 16 },
    palette: {
        primary: { main: '#007AFF' },
        secondary: { main: '#86868b' },
        background: { default: '#f5f5f7', paper: '#ffffff' },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: 24, padding: '10px 20px', disableElevation: true },
                contained: { boxShadow: 'none', '&:hover': { boxShadow: 'none' } }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: { borderRadius: 12 }
            }
        }
    }
});

export default function Guest({ children }) {
    return (
        <ThemeProvider theme={appleTheme}>
            <Box 
                sx={{ 
                    minHeight: '100vh', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    bgcolor: 'background.default',
                    p: 2
                }}
            >
                {/* Logo and Brand */}
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
                    <Avatar sx={{ bgcolor: '#007AFF', width: 56, height: 56, mb: 1.5 }}>
                        <ArticleIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h5">
                        CampusPress
                    </Typography>
                </Link>

                {/* Floating Apple-style Card */}
                <Paper 
                    sx={{ 
                        width: '100%', 
                        maxWidth: 420, 
                        p: { xs: 4, sm: 5 }, 
                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}
                >
                    {children}
                </Paper>
            </Box>
        </ThemeProvider>
    );
}