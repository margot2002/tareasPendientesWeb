import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Save, Image as ImageIcon } from 'lucide-react';
import { SettingsSavedModal } from './SettingsSavedModal';

/**
 * Props de la vista de ajustes
 */
interface SettingsViewProps {
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

/** Avatares de muestra rápida para selección del usuario */
const SAMPLE_AVATARS = [
  { label: 'Minimalista', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { label: 'Zen Calm', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { label: 'Creative', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
  { label: 'Nature', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
];

/**
 * Vista de ajustes del perfil de usuario.
 * Compatible con los temas claro y oscuro mediante CSS custom properties.
 */
export const SettingsView: React.FC<SettingsViewProps> = ({ profile, onSaveProfile }) => {
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);

  // Estado del modal de confirmación de guardado
  const [showSavedModal, setShowSavedModal] = useState(false);

  // Nombre guardado para mostrar en el modal de confirmación
  const [savedFullName, setSavedFullName] = useState('');

  const previewInitials = ((firstName ? firstName[0] : '') +
                           (lastName ? lastName[0] : '')).toUpperCase() || 'AN';

  const previewFullName = `${firstName} ${lastName}`.trim() || 'Alex Navarro';

  /**
   * Guarda el perfil y abre el modal de confirmación
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfile = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      avatarUrl: avatarUrl.trim()
    };
    onSaveProfile(updatedProfile);
    setSavedFullName(`${updatedProfile.firstName} ${updatedProfile.lastName}`.trim());
    setShowSavedModal(true);
  };

  return (
    <div className="w-full max-w-[780px] mx-auto px-4 sm:px-6 pb-20 pt-4">
      {/* Cabecera de sección */}
      <section className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mb-2 font-['Inter']">
          Ajustes
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)]">
          Personaliza tu perfil y preferencias visuales de ZenTasks.
        </p>
      </section>

      <section className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-9 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
        <div className="mb-6 pb-4 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold text-[var(--text)] mb-1">
            Perfil de Usuario
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            Gestiona tu nombre, información de cuenta y avatar visual.
          </p>
        </div>

        {/* Vista previa del avatar en tiempo real */}
        <div className="flex items-center gap-5 p-4 sm:p-5 bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl mb-7">
          <div className="w-16 h-16 rounded-xl bg-[#ca963e] text-[#111417] flex items-center justify-center font-bold text-2xl border-2 border-white/15 shadow-[0_4px_16px_rgba(0,0,0,0.2)] overflow-hidden flex-shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={previewFullName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback a iniciales si la imagen no carga
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <span>{previewInitials}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-semibold text-[var(--text)] truncate">
              {previewFullName}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-0.5">
              Vista previa inmediata de cómo te ven en ZenTasks
            </div>
          </div>
        </div>

        {/* Formulario de perfil */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[var(--text-muted)] mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="input-first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ej. Alex"
                required
                className="w-full px-4 py-2.5 bg-[var(--surface-input)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:border-[#477ab1] focus:bg-[var(--surface-input-focus)] outline-none text-base transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--text-muted)] mb-2">
                Apellidos
              </label>
              <input
                type="text"
                id="input-last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ej. Navarro"
                required
                className="w-full px-4 py-2.5 bg-[var(--surface-input)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:border-[#477ab1] focus:bg-[var(--surface-input-focus)] outline-none text-base transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-muted)] mb-2">
              URL de Imagen de Avatar (Vincular imagen)
            </label>
            <div className="relative">
              <input
                type="url"
                id="input-avatar-url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-2.5 bg-[var(--surface-input)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:border-[#477ab1] focus:bg-[var(--surface-input-focus)] outline-none text-sm sm:text-base transition-colors"
              />
            </div>
            <span className="block text-xs text-[var(--text-dim)] mt-1.5">
              Pega el enlace web de cualquier imagen PNG/JPG. Si se deja en blanco, se usarán tus iniciales ({previewInitials}).
            </span>

            {/* Avatares de muestra rápida */}
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[var(--text-muted)] flex items-center gap-1 mr-1">
                <ImageIcon className="w-3.5 h-3.5" />
                Ejemplos rápidos:
              </span>
              {SAMPLE_AVATARS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAvatarUrl(sample.url)}
                  className="text-xs px-2.5 py-1 rounded-md bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[#477ab1] transition-colors cursor-pointer"
                >
                  {sample.label}
                </button>
              ))}
              {avatarUrl && (
                <button
                  type="button"
                  onClick={() => setAvatarUrl('')}
                  className="text-xs px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                >
                  Restablecer a iniciales
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              id="btn-save-settings"
              className="inline-flex items-center gap-2 bg-[#477ab1] hover:bg-[#568ec9] text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-[0_2px_8px_rgba(71,122,177,0.3)] transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </section>

      {/* Modal de confirmación al guardar ajustes */}
      <SettingsSavedModal
        isOpen={showSavedModal}
        fullName={savedFullName}
        onClose={() => setShowSavedModal(false)}
      />
    </div>
  );
};
