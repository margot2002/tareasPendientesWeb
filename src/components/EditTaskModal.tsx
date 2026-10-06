import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Task, PriorityLevel } from '../types';

interface EditTaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (id: string, title: string, priority: PriorityLevel, dueDate: string) => void;
}

/**
 * Modal para editar una tarea existente.
 * Usa CSS custom properties para adaptarse al tema activo.
 */
export const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  task,
  onClose,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('none');
  const [dueDate, setDueDate] = useState('');

  // Precarga los datos de la tarea al abrir el modal
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setPriority(task.priority);
      setDueDate(task.dueDate || '');
    }
  }, [task]);

  if (!isOpen || !task) return null;

  /**
   * Guarda los cambios y cierra el modal
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(task.id, title.trim(), priority, dueDate);
    onClose();
  };

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
        {/* Cabecera */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[var(--text)]">Editar Tarea</h2>
          <button
            id="close-edit-modal-btn"
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-btn)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--text-muted)] mb-2">
              Título de la Tarea
            </label>
            <input
              type="text"
              id="edit-modal-task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-[var(--surface-input)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:border-[#477ab1] focus:bg-[var(--surface-input-focus)] outline-none text-base transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-muted)] mb-2">
              Prioridad
            </label>
            <select
              id="edit-modal-task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as PriorityLevel)}
              className="w-full px-4 py-2.5 bg-[var(--surface-input)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:border-[#477ab1] outline-none text-base cursor-pointer"
            >
              <option value="none">Normal</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--text-muted)] mb-2">
              Fecha Límite
            </label>
            <input
              type="date"
              id="edit-modal-task-duedate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 bg-[var(--surface-input)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:border-[#477ab1] outline-none text-base"
            />
          </div>

          {/* Acciones */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm text-[var(--text-muted)] bg-[var(--surface-btn)] border border-[var(--border)] hover:bg-[var(--surface-btn-hover)] hover:text-[var(--text)] transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-[#477ab1] hover:bg-[#568ec9] shadow-[0_2px_8px_rgba(71,122,177,0.3)] transition-colors cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
