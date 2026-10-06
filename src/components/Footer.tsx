import React from 'react';

/**
 * Pie de página de la aplicación.
 * Compatible con los temas claro y oscuro mediante CSS variables.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 px-4 text-xs sm:text-sm text-[var(--text-dim)]">
      <p>© ZenTasks. Atención plena en tu productividad.</p>
    </footer>
  );
};
