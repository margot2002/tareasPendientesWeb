import React from 'react';
import { Check, Moon, Sun } from 'lucide-react';
import { NavTab, UserProfile } from '../types';
import { Theme } from '../hooks/useTheme';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  profile: UserProfile;
  /** Tema activo: 'dark' | 'light' */
  theme: Theme;
  /** Callback para alternar el tema */
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  profile,
  theme,
  onToggleTheme,
}) => {
  const isDark = theme === 'dark';

  const initials = ((profile.firstName ? profile.firstName[0] : '') +
                    (profile.lastName ? profile.lastName[0] : '')).toUpperCase() || 'AN';

  const fullName = `${profile.firstName} ${profile.lastName}`.trim() || 'Alex Navarro';

  return (
    <header className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-5 flex items-center justify-between gap-4">
      {/* Logo de la marca */}
      <button
        id="brand-logo-btn"
        onClick={() => onSelectTab('tasks')}
        className="flex items-center gap-3 font-extrabold text-[21px] text-[var(--text)] select-none hover:opacity-90 transition-opacity flex-shrink-0"
      >
        <span className="w-8 h-8 rounded-lg bg-[#477ab1] text-white flex items-center justify-center shadow-[0_2px_10px_rgba(71,122,177,0.4)]">
          <Check className="w-5 h-5 stroke-[2.5]" />
        </span>
        <span className="tracking-tight">ZenTasks</span>
      </button>

      {/* Menú de navegación */}
      <nav className="flex items-center gap-5 sm:gap-8">
        <button
          id="nav-tab-overview"
          onClick={() => onSelectTab('overview')}
          className={`text-[15px] font-medium transition-all relative py-1 cursor-pointer ${
            activeTab === 'overview'
              ? 'text-[var(--text)] font-semibold'
              : 'text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Resumen
          {activeTab === 'overview' && (
            <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#477ab1] rounded-full shadow-[0_0_8px_#477ab1]" />
          )}
        </button>

        <button
          id="nav-tab-tasks"
          onClick={() => onSelectTab('tasks')}
          className={`text-[15px] font-medium transition-all relative py-1 cursor-pointer ${
            activeTab === 'tasks'
              ? 'text-[var(--text)] font-semibold'
              : 'text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Tareas
          {activeTab === 'tasks' && (
            <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#477ab1] rounded-full shadow-[0_0_8px_#477ab1]" />
          )}
        </button>

        <button
          id="nav-tab-settings"
          onClick={() => onSelectTab('settings')}
          className={`text-[15px] font-medium transition-all relative py-1 cursor-pointer ${
            activeTab === 'settings'
              ? 'text-[var(--text)] font-semibold'
              : 'text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          Ajustes
          {activeTab === 'settings' && (
            <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#477ab1] rounded-full shadow-[0_0_8px_#477ab1]" />
          )}
        </button>
      </nav>

      {/* Controles derechos: toggle de tema + avatar */}
      <div className="flex items-center gap-3 flex-shrink-0">

        {/* ─── Toggle de tema deslizante ─── */}
        <button
          id="btn-toggle-theme"
          type="button"
          onClick={onToggleTheme}
          aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          className="relative flex items-center cursor-pointer"
        >
          {/*
            Pista (track) del toggle:
            - Oscuro activo → fondo azul
            - Claro activo  → fondo gris claro
          */}
          <span
            className={`
              relative inline-flex items-center
              w-[52px] h-[28px] rounded-full
              border transition-colors duration-300
              ${isDark
                ? 'bg-[#477ab1] border-[#477ab1] shadow-[0_0_10px_rgba(71,122,177,0.45)]'
                : 'bg-[var(--surface-btn)] border-[var(--border)]'
              }
            `}
          >
            {/* Icono Sol — visible en lado izquierdo cuando estamos en CLARO */}
            <Sun
              className={`
                absolute left-[5px] w-[13px] h-[13px] transition-all duration-300
                ${isDark ? 'opacity-0 scale-75' : 'opacity-80 scale-100 text-[#ca963e]'}
              `}
            />

            {/* Icono Luna — visible en lado derecho cuando estamos en OSCURO */}
            <Moon
              className={`
                absolute right-[5px] w-[12px] h-[12px] transition-all duration-300
                ${isDark ? 'opacity-90 scale-100 text-white' : 'opacity-0 scale-75'}
              `}
            />

            {/* Círculo deslizante */}
            <span
              className={`
                absolute top-[3px]
                w-[22px] h-[22px] rounded-full
                bg-white shadow-[0_1px_4px_rgba(0,0,0,0.35)]
                transition-transform duration-300 ease-in-out
                ${isDark ? 'translate-x-[26px]' : 'translate-x-[3px]'}
              `}
            />
          </span>
        </button>

        {/* Avatar del usuario */}
        <button
          id="header-user-avatar"
          onClick={() => onSelectTab('settings')}
          title={`${fullName} — Perfil y Ajustes`}
          className="w-10 h-10 rounded-lg bg-[#ca963e] text-[#111417] flex items-center justify-center font-bold text-[14px] shadow-[0_2px_12px_rgba(202,150,62,0.3)] hover:scale-105 transition-all border border-white/15 overflow-hidden cursor-pointer flex-shrink-0"
        >
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={fullName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback a iniciales si la imagen no carga
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <span>{initials}</span>
          )}
        </button>
      </div>
    </header>
  );
};
