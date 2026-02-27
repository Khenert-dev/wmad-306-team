import CoolButton from '@/Components/CoolButton';
import { useThemeMode } from '@/Components/ThemeModeContext';
import {
    Box,
    FormControlLabel,
    MenuItem,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'campus_press_ui_preferences';

export default function UpdateAppearancePreferencesForm() {
    const { mode, setMode } = useThemeMode();
    const [preferences, setPreferences] = useState(() => {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return {
                compactCards: false,
                largerText: false,
                dashboardDensity: 'comfortable',
            };
        }

        try {
            return JSON.parse(raw);
        } catch {
            return {
                compactCards: false,
                largerText: false,
                dashboardDensity: 'comfortable',
            };
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
        document.body.dataset.dashboardDensity = preferences.dashboardDensity;
        document.body.dataset.largerText = preferences.largerText ? '1' : '0';
        document.body.dataset.compactCards = preferences.compactCards ? '1' : '0';
    }, [preferences]);

    return (
        <Box component="section">
            <Typography variant="h6">Appearance & Reading</Typography>
            <Typography color="text.secondary" sx={{ mb: 2.25 }}>
                Personalize your reading and dashboard experience.
            </Typography>

            <Stack spacing={2}>
                <TextField
                    select
                    label="Theme mode"
                    value={mode}
                    onChange={(event) => {
                        const nextMode = event.target.value;
                        setMode(nextMode);
                        localStorage.setItem('campus_press_theme_mode', nextMode);
                    }}
                    fullWidth
                >
                    <MenuItem value="light">Light mode</MenuItem>
                    <MenuItem value="dark">Dark mode</MenuItem>
                </TextField>

                <TextField
                    select
                    label="Dashboard density"
                    value={preferences.dashboardDensity}
                    onChange={(event) =>
                        setPreferences((previous) => ({
                            ...previous,
                            dashboardDensity: event.target.value,
                        }))
                    }
                    fullWidth
                >
                    <MenuItem value="comfortable">Comfortable</MenuItem>
                    <MenuItem value="compact">Compact</MenuItem>
                </TextField>

                <FormControlLabel
                    control={
                        <Switch
                            checked={preferences.compactCards}
                            onChange={(event) =>
                                setPreferences((previous) => ({
                                    ...previous,
                                    compactCards: event.target.checked,
                                }))
                            }
                        />
                    }
                    label="Compact cards"
                />

                <FormControlLabel
                    control={
                        <Switch
                            checked={preferences.largerText}
                            onChange={(event) =>
                                setPreferences((previous) => ({
                                    ...previous,
                                    largerText: event.target.checked,
                                }))
                            }
                        />
                    }
                    label="Larger text for readability"
                />

                <CoolButton tone="outline" onClick={() => {
                    const defaults = {
                        compactCards: false,
                        largerText: false,
                        dashboardDensity: 'comfortable',
                    };
                    setPreferences(defaults);
                    setMode('light');
                    localStorage.setItem('campus_press_theme_mode', 'light');
                }}>
                    Reset display preferences
                </CoolButton>
            </Stack>
        </Box>
    );
}
