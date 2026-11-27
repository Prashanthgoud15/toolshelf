import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext({ dark: false, toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('toolshelf-theme', dark ? 'dark' : 'light'); } catch { /* storage blocked */ }
  }, [dark]);

  const toggle = useCallback(() => setDark((d) => !d), []);
  return <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>;
}
