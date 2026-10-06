import React from 'react';
import { X, Trash2, AlertTriangle } from 'lucide-react';

/**
 * Props del modal de confirmación de eliminación de tarea.
 */
interface ConfirmDeleteModalProps {
  /** Indica si el modal está abierto */
  isOpen: boolean;
  /** Título de la tarea que se va a eliminar */
  taskTitle: string;
  /** Callback al cerrar el modal sin confirmar */
  onClose: () => void;
  /** Callback al confirmar la eliminación */
  onConfirm: () => void;
}

/**
 * Modal de confirmación para eliminar una tarea.
 * Mantiene el mismo estilo visual que el modal de edición y es compatible con ambos temas.
 */
export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  taskTitle,
  onClose,
  onConfirm,
}) => {
  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  /**
   * Confirma la eliminación y cierra el modal
   */
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    // Overlay con backdrop blur — igual al EditTaskModal
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
            {/* Icono de advertencia */}
            <span className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </span>
            <h2 className="text-xl font-bold text-[var(--text)]">Eliminar Tarea</h2>
          </div>

          {/* Botón cerrar */}
          <button
            id="close-delete-modal-btn"
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-btn)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del modal */}
        <div className="mb-6">
          <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-3">
            ¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.
          </p>

          {/* Tarjeta con el título de la tarea */}
          <div className="p-3.5 bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl">
            <p className="text-[var(--text)] text-[15px] font-medium leading-snug line-clamp-2">
              {taskTitle}
            </p>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
          <button
            type="button"
            id="cancel-delete-btn"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm text-[var(--text-muted)] bg-[var(--surface-btn)] border border-[var(--border)] hover:bg-[var(--surface-btn-hover)] hover:text-[var(--text)] transition-colors cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            id="confirm-delete-btn"
            onClick={handleConfirm}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-red-600 hover:bg-red-500 shadow-[0_2px_8px_rgba(239,68,68,0.3)] transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
