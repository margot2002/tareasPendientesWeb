import { useState, useEffect } from 'react';

/** Tipos de tema disponibles en la aplicación */
export type Theme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'zentasks_theme';

/**
 * Hook personalizado para gestionar el tema de la aplicación.
 * Persiste la preferencia en localStorage y aplica el atributo
 * data-theme al elemento raíz del documento.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Recupera el tema guardado o usa el oscuro por defecto
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      return stored === 'light' ? 'light' : 'dark';
    }
    return 'dark';
  });

  // Aplica el atributo data-theme al documento cuando cambia el tema
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  /**
   * Alterna entre modo oscuro y claro
   */
  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
