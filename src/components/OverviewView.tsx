import React from 'react';
import { Task } from '../types';
import { CheckCircle2, Clock, ListChecks, Sparkles, ArrowRight } from 'lucide-react';

interface OverviewViewProps {
  tasks: Task[];
  onNavigateToTasks: () => void;
}

/**
 * Vista de resumen con métricas y estadísticas de tareas.
 * Compatible con los temas claro y oscuro.
 */
export const OverviewView: React.FC<OverviewViewProps> = ({ tasks, onNavigateToTasks }) => {
  const total = tasks.length;
  const pending = tasks.filter(t => !t.completed).length;
  const completed = tasks.filter(t => t.completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full max-w-[780px] mx-auto px-4 sm:px-6 pb-20 pt-4">
      {/* Cabecera de sección */}
      <section className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)] mb-2 font-['Inter']">
          Resumen de Actividad
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)]">
          Métricas y balance consciente de tu jornada diaria.
        </p>
      </section>

      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.15)] text-center">
        {/* Grid de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Total */}
          <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-5 flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-[#477ab1]/15 text-[#477ab1] flex items-center justify-center mb-2">
              <ListChecks className="w-5 h-5" />
            </div>
            <span className="text-4xl font-extrabold text-[#477ab1] mb-1">
              {total}
            </span>
            <span className="text-xs sm:text-sm font-medium text-[var(--text-muted)]">
              Tareas Totales
            </span>
          </div>

          {/* Pendientes */}
          <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-5 flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-[#ca963e]/15 text-[#ca963e] flex items-center justify-center mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-4xl font-extrabold text-[#ca963e] mb-1">
              {pending}
            </span>
            <span className="text-xs sm:text-sm font-medium text-[var(--text-muted)]">
              En Curso
            </span>
          </div>

          {/* Completadas */}
          <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-5 flex flex-col items-center">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-4xl font-extrabold text-emerald-400 mb-1">
              {completed}
            </span>
            <span className="text-xs sm:text-sm font-medium text-[var(--text-muted)]">
              Completadas
            </span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl p-6 mb-8 text-left">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-[var(--text)]">Tasa de Cumplimiento</span>
            <span className="text-sm font-bold text-[#477ab1]">{percent}%</span>
          </div>
          {/* Track de la barra */}
          <div className="w-full h-2.5 bg-[var(--surface-btn)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#477ab1] transition-all duration-500 rounded-full shadow-[0_0_10px_#477ab1]"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Cita inspiracional */}
        <div className="p-4 bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl mb-6 inline-flex items-center gap-3 text-left">
          <Sparkles className="w-5 h-5 text-[#ca963e] flex-shrink-0" />
          <p className="text-sm text-[var(--text-muted)] italic">
            &ldquo;El secreto para avanzar es simplemente comenzar con calma. Mantén el enfoque en lo que importa.&rdquo;
          </p>
        </div>

        {/* CTA */}
        <div>
          <button
            type="button"
            id="overview-back-to-tasks-btn"
            onClick={onNavigateToTasks}
            className="inline-flex items-center gap-2 bg-[#477ab1] hover:bg-[#568ec9] text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-[0_2px_8px_rgba(71,122,177,0.3)] transition-all cursor-pointer"
          >
            <span>Ir a mis tareas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
