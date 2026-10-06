import React, { useState } from 'react';
import {
  Check,
  Clock,
  ListFilter,
  Pencil,
  Trash2,
  Plus,
  Calendar,
} from 'lucide-react';
import { Task, FilterType, PriorityLevel } from '../types';

interface TasksViewProps {
  tasks: Task[];
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onAddTask: (title: string, priority: PriorityLevel, dueDate: string) => void;
  onToggleTask: (id: string) => void;
  /** Recibe el objeto Task completo para mostrarlo en el modal de confirmación */
  onDeleteTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  filter,
  onFilterChange,
  onAddTask,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<PriorityLevel>('none');
  const [newTaskDate, setNewTaskDate] = useState('');

  const totalCount = tasks.length;
  const pendingCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  /**
   * Maneja la creación de una nueva tarea
   */
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle.trim(), newTaskPriority, newTaskDate);
    setNewTaskTitle('');
    setNewTaskPriority('none');
    setNewTaskDate('');
  };

  return (
    <div className="w-full max-w-[780px] mx-auto px-4 sm:px-6 pb-20 pt-4">
      {/* Cabecera de sección */}
      <section className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mb-2 font-['Inter']">
          Enfoque de Hoy
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] font-normal">
          Mantén la atención plena. Una tarea a la vez.
        </p>
      </section>

      {/* Barra de filtros */}
      <section className="flex justify-center mb-8">
        <div className="inline-flex items-center bg-[var(--surface)] border border-[var(--border)] p-1 rounded-full gap-1 shadow-sm">
          <button
            type="button"
            id="filter-tab-all"
            onClick={() => onFilterChange('all')}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-[#477ab1] text-white font-semibold shadow-[0_2px_12px_rgba(71,122,177,0.45)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-action)]'
            }`}
          >
            <ListFilter className="w-4 h-4" />
            <span>Todas</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                filter === 'all' ? 'bg-white/20 text-white' : 'bg-[var(--border)]/50 text-[var(--text-muted)]'
              }`}
            >
              {totalCount}
            </span>
          </button>

          <button
            type="button"
            id="filter-tab-pending"
            onClick={() => onFilterChange('pending')}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'pending'
                ? 'bg-[#477ab1] text-white font-semibold shadow-[0_2px_12px_rgba(71,122,177,0.45)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-action)]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Pendientes</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                filter === 'pending' ? 'bg-white/20 text-white' : 'bg-[var(--border)]/50 text-[var(--text-muted)]'
              }`}
            >
              {pendingCount}
            </span>
          </button>

          <button
            type="button"
            id="filter-tab-completed"
            onClick={() => onFilterChange('completed')}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === 'completed'
                ? 'bg-[#477ab1] text-white font-semibold shadow-[0_2px_12px_rgba(71,122,177,0.45)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-action)]'
            }`}
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>Completadas</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                filter === 'completed' ? 'bg-white/20 text-white' : 'bg-[var(--border)]/50 text-[var(--text-muted)]'
              }`}
            >
              {completedCount}
            </span>
          </button>
        </div>
      </section>

      {/* Tarjeta creadora de tareas */}
      <section className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-4 sm:p-5 mb-7 shadow-[0_4px_16px_rgba(0,0,0,0.15)] focus-within:border-[#477ab1] transition-all">
        <form onSubmit={handleCreateTask}>
          <div className="flex items-center mb-3">
            <input
              type="text"
              id="new-task-title-input"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Añade una nueva tarea..."
              className="w-full bg-transparent border-none text-[var(--text)] placeholder-[var(--text-dim)] text-base outline-none px-1 py-1"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border)]">
            <div className="flex flex-wrap items-center gap-2.5">
              <select
                id="new-task-priority-select"
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as PriorityLevel)}
                className="bg-[var(--surface-input)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium text-[var(--text)] outline-none focus:border-[#477ab1] cursor-pointer"
              >
                <option value="none">Prioridad: Normal</option>
                <option value="high">Prioridad: Alta</option>
                <option value="medium">Prioridad: Media</option>
                <option value="low">Prioridad: Baja</option>
              </select>

              <div className="relative flex items-center">
                <input
                  type="date"
                  id="new-task-date-input"
                  value={newTaskDate}
                  onChange={(e) => setNewTaskDate(e.target.value)}
                  className="bg-[var(--surface-input)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-xs sm:text-sm text-[var(--text)] outline-none focus:border-[#477ab1]"
                  style={{ colorScheme: 'var(--color-scheme, dark)' } as React.CSSProperties}
                />
              </div>
            </div>

            <button
              type="submit"
              id="btn-add-task"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#477ab1] hover:bg-[#568ec9] text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-[0_2px_8px_rgba(71,122,177,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>+ Añadir Tarea</span>
            </button>
          </div>
        </form>
      </section>

      {/* Lista de tareas */}
      <section>
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 px-6 bg-[var(--surface)] border border-dashed border-[var(--border)] rounded-2xl">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--surface-icon)] text-[var(--text-muted)] flex items-center justify-center">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text)] mb-1">
              No hay tareas en esta vista
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              Estás completamente al día o ningún elemento coincide con el filtro seleccionado.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filteredTasks.map((task) => {
              const isHighPriority = task.priority === 'high';
              return (
                <li
                  key={task.id}
                  id={`task-item-${task.id}`}
                  className={`group rounded-xl p-4 sm:px-5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border transition-all duration-200 ${
                    task.completed
                      ? 'bg-[var(--surface-subtle)] border-[var(--border-alt)] opacity-60'
                      : isHighPriority
                      ? 'bg-[var(--priority-high-bg)] border-[#ca963e]/40 shadow-[0_2px_10px_rgba(202,150,62,0.08)] hover:bg-[var(--priority-high-hover)]'
                      : 'bg-[var(--surface)] border-[var(--border)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-strong)] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
                  }`}
                >
                  {/* Izquierda: Checkbox + Título + Badges */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Checkbox personalizado */}
                    <button
                      type="button"
                      id={`checkbox-toggle-${task.id}`}
                      onClick={() => onToggleTask(task.id)}
                      aria-label={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all flex-shrink-0 cursor-pointer ${
                        task.completed
                          ? 'bg-[#477ab1] border-[#477ab1] text-white'
                          : 'border-[var(--border-checkbox)] bg-[var(--surface-input)] hover:border-[#477ab1]'
                      }`}
                    >
                      {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    {/* Título y etiquetas */}
                    <div className="flex items-center gap-3 flex-wrap flex-1">
                      <span
                        className={`text-[15px] sm:text-[16px] font-medium transition-all ${
                          task.completed
                            ? 'line-through text-[var(--text-muted)]'
                            : 'text-[var(--text)]'
                        }`}
                      >
                        {task.title}
                      </span>

                      {/* Badge prioridad Alta */}
                      {task.priority === 'high' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-[rgba(202,150,62,0.16)] text-[#f3be65] border border-[rgba(202,150,62,0.35)]">
                          ALTA
                        </span>
                      )}

                      {/* Badge prioridad Media */}
                      {task.priority === 'medium' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-[rgba(71,122,177,0.16)] text-[#9dcaff] border border-[rgba(71,122,177,0.35)]">
                          MEDIA
                        </span>
                      )}

                      {/* Badge prioridad Baja */}
                      {task.priority === 'low' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase bg-[rgba(103,120,144,0.16)] text-[var(--text-muted)] border border-[var(--border)]">
                          BAJA
                        </span>
                      )}

                      {/* Fecha límite */}
                      {task.dueDate && (
                        <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                          <Calendar className="w-3 h-3 text-[var(--text-dim)]" />
                          <span>{task.dueDate}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Derecha: Acciones + Fecha de creación */}
                  <div className="flex items-center justify-between sm:justify-end gap-3.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--border-subtle)]">
                    {/* Botones de acción */}
                    <div className="flex items-center gap-1 opacity-80 sm:opacity-70 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        id={`btn-edit-task-${task.id}`}
                        onClick={() => onEditTask(task)}
                        title="Editar tarea"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-action)] transition-colors cursor-pointer"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        id={`btn-delete-task-${task.id}`}
                        onClick={() => onDeleteTask(task)}
                        title="Eliminar tarea"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[#ffb4ab] hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Badge de fecha de creación */}
                    <div
                      title={`Fecha: ${task.createdAt || 'Hoy'}`}
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--text-dim)] px-2.5 py-1 bg-[var(--surface-alt)] border border-[var(--border)] rounded-md select-none whitespace-nowrap"
                    >
                      <Clock className="w-3 h-3 opacity-75" />
                      <span>{task.createdAt || 'Hoy'}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};
