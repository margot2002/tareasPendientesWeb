import React, { useState, useEffect } from 'react';
import { Task, UserProfile, FilterType, NavTab, PriorityLevel } from './types';
import { TaskService } from './services/taskStorage';
import { Header } from './components/Header';
import { TasksView } from './components/TasksView';
import { OverviewView } from './components/OverviewView';
import { SettingsView } from './components/SettingsView';
import { EditTaskModal } from './components/EditTaskModal';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { Footer } from './components/Footer';
import { useTheme } from './hooks/useTheme';

/**
 * Componente raíz de la aplicación ZenTasks.
 * Gestiona el estado global, la navegación entre pestañas y el tema visual.
 */
export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('tasks');
  const [tasks, setTasks] = useState<Task[]>(() => TaskService.getTasks());
  const [profile, setProfile] = useState<UserProfile>(() => TaskService.getProfile());
  const [filter, setFilter] = useState<FilterType>('all');

  // Estado del modal de edición
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Estado del modal de confirmación de eliminación
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  // Hook de gestión del tema (oscuro / claro)
  const { theme, toggleTheme } = useTheme();

  // Persistencia de tareas en localStorage cada vez que cambian
  useEffect(() => {
    TaskService.saveTasks(tasks);
  }, [tasks]);

  // Persistencia del perfil en localStorage cada vez que cambia
  useEffect(() => {
    TaskService.saveProfile(profile);
  }, [profile]);

  /**
   * Agrega una nueva tarea a la lista
   */
  const handleAddTask = (title: string, priority: PriorityLevel, dueDate: string) => {
    const newTask: Task = {
      id: 'task_' + Date.now(),
      title,
      completed: false,
      priority,
      dueDate,
      createdAt: TaskService.getFormattedCurrentDate()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  /**
   * Alterna el estado completado/pendiente de una tarea
   */
  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Abre el modal de confirmación antes de eliminar una tarea
   */
  const handleRequestDeleteTask = (task: Task) => {
    setDeletingTask(task);
  };

  /**
   * Confirma y ejecuta la eliminación de la tarea seleccionada
   */
  const handleConfirmDelete = () => {
    if (deletingTask) {
      setTasks(prev => prev.filter(task => task.id !== deletingTask.id));
      setDeletingTask(null);
    }
  };

  /**
   * Guarda los cambios editados de una tarea existente
   */
  const handleSaveEditedTask = (
    id: string,
    title: string,
    priority: PriorityLevel,
    dueDate: string
  ) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, title, priority, dueDate } : task
      )
    );
    setEditingTask(null);
  };

  /**
   * Actualiza el perfil del usuario
   */
  const handleSaveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col font-['Inter',sans-serif]"
    >
      {/* Cabecera global con navegación y toggle de tema */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        profile={profile}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Áreas de contenido principal */}
      <main className="flex-1">
        {activeTab === 'tasks' && (
          <TasksView
            tasks={tasks}
            filter={filter}
            onFilterChange={setFilter}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleRequestDeleteTask}
            onEditTask={task => setEditingTask(task)}
          />
        )}

        {activeTab === 'overview' && (
          <OverviewView
            tasks={tasks}
            onNavigateToTasks={() => setActiveTab('tasks')}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            profile={profile}
            onSaveProfile={handleSaveProfile}
          />
        )}
      </main>

      {/* Modal de edición de tarea */}
      <EditTaskModal
        isOpen={Boolean(editingTask)}
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleSaveEditedTask}
      />

      {/* Modal de confirmación de eliminación */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingTask)}
        taskTitle={deletingTask?.title || ''}
        onClose={() => setDeletingTask(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Pie de página */}
      <Footer />
    </div>
  );
}
