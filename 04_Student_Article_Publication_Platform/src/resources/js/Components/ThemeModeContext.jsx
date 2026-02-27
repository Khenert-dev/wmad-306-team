import { createContext, useContext } from 'react';

export const ThemeModeContext = createContext({
    mode: 'light',
    toggleMode: () => {},
    setMode: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);
