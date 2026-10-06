import React from 'react';
import { X, Check, Sparkles } from 'lucide-react';

/**
 * Props del modal de confirmación de guardado de ajustes.
 */
interface SettingsSavedModalProps {
  /** Indica si el modal está abierto */
  isOpen: boolean;
  /** Nombre completo del usuario para mostrar en el mensaje */
  fullName: string;
  /** Callback al cerrar el modal */
  onClose: () => void;
}

/**
 * Modal de confirmación de éxito al guardar los ajustes del perfil.
 * Compatible con ambos temas (claro y oscuro).
 */
export const SettingsSavedModal: React.FC<SettingsSavedModalProps> = ({
  isOpen,
  fullName,
  onClose,
}) => {
  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    // Overlay con backdrop blur
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all"
      style={{ backgroundColor: 'var(--overlay)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Contenedor del modal */}
      <div className="bg-[var(--surface)] border border-[var(--border)] w-full max-w-lg rounded-2xl p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all">

        {/* Cabecera del modal */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            {/* Icono de éxito */}
            <span className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-emerald-400 stroke-[2.5]" />
            </span>
            <h2 className="text-xl font-bold text-[var(--text)]">Ajustes Guardados</h2>
          </div>

          {/* Botón cerrar */}
          <button
            id="close-settings-saved-modal-btn"
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-btn)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del modal */}
        <div className="mb-6">
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-emerald-600 dark:text-emerald-200 text-[15px] font-semibold mb-1">
                ¡Perfil actualizado correctamente!
              </p>
              <p className="text-emerald-700/80 dark:text-emerald-300/70 text-sm leading-relaxed">
                Tus datos de perfil han sido guardados. La aplicación ahora te identifica como{' '}
                <span className="font-semibold text-emerald-600 dark:text-emerald-300">
                  {fullName || 'Usuario'}
                </span>.
              </p>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex justify-end pt-4 border-t border-[var(--border)]">
          <button
            type="button"
            id="close-settings-saved-confirm-btn"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-[#477ab1] hover:bg-[#568ec9] shadow-[0_2px_8px_rgba(71,122,177,0.3)] transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
