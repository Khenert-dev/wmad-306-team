import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, alpha, createTheme } from '@mui/material';

const appName = import.meta.env.VITE_APP_NAME || 'Campus Press';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2f6fdb',
            dark: '#2157b4',
            light: '#eaf1ff',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#2f6fdb',
        },
        background: {
            default: '#f4f7fb',
            paper: '#ffffff',
        },
        text: {
            primary: '#1f2a44',
            secondary: '#5f6f89',
        },
        divider: 'rgba(47, 111, 219, 0.16)',
    },
    typography: {
        fontFamily: '"Nunito Sans", "Segoe UI", sans-serif',
        h3: { fontFamily: '"Merriweather", serif', fontWeight: 700 },
        h4: { fontFamily: '"Merriweather", serif', fontWeight: 700 },
        h5: { fontFamily: '"Merriweather", serif', fontWeight: 700 },
        h6: { fontFamily: '"Merriweather", serif', fontWeight: 700 },
        body1: { lineHeight: 1.68 },
        body2: { lineHeight: 1.62 },
        button: { textTransform: 'none', fontWeight: 700 },
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiContainer: {
            defaultProps: { maxWidth: 'lg' },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    border: '1px solid rgba(47, 111, 219, 0.12)',
                    boxShadow: '0 8px 24px rgba(24, 46, 92, 0.06)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '1px solid rgba(47, 111, 219, 0.12)',
                    boxShadow: '0 8px 24px rgba(24, 46, 92, 0.06)',
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                size: 'large',
            },
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    paddingInline: 20,
                },
                containedPrimary: {
                    backgroundColor: '#2f6fdb',
                    '&:hover': { backgroundColor: '#2157b4' },
                },
                outlinedPrimary: {
                    borderColor: 'rgba(47, 111, 219, 0.45)',
                    backgroundColor: alpha('#2f6fdb', 0.03),
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 700,
                },
            },
        },
    },
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App {...props} />
            </ThemeProvider>
        );
    },
    progress: {
        color: '#2f6fdb',
    },
});
