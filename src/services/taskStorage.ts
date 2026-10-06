import { Task, UserProfile } from '../types';

const STORAGE_KEY = 'zentasks_data';
const PROFILE_KEY = 'zentasks_user_profile';

export const INITIAL_TASKS: Task[] = [
  {
    id: 't-1',
    title: 'Revisar propuesta de proyecto',
    completed: false,
    priority: 'none',
    dueDate: '',
    createdAt: '24 oct'
  },
  {
    id: 't-2',
    title: 'Comprar provisiones',
    completed: false,
    priority: 'none',
    dueDate: '',
    createdAt: '24 oct'
  },
  {
    id: 't-3',
    title: 'Preparar presentación del Q3',
    completed: false,
    priority: 'high',
    dueDate: '',
    createdAt: '23 oct'
  },
  {
    id: 't-4',
    title: 'Meditación matutina',
    completed: true,
    priority: 'none',
    dueDate: '',
    createdAt: '22 oct'
  },
  {
    id: 't-5',
    title: 'Llamar a mamá',
    completed: true,
    priority: 'none',
    dueDate: '',
    createdAt: '21 oct'
  }
];

export const DEFAULT_PROFILE: UserProfile = {
  firstName: 'Alex',
  lastName: 'Navarro',
  avatarUrl: ''
};

export class TaskService {
  static getTasks(): Task[] {
    if (typeof window === 'undefined') return INITIAL_TASKS;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
      return [...INITIAL_TASKS];
    }
    try {
      const parsed = JSON.parse(stored);
      return parsed.map((item: Partial<Task>, index: number) => ({
        id: item.id || `t-${index}`,
        title: item.title || '',
        completed: Boolean(item.completed),
        priority: (item.priority as Task['priority']) || 'none',
        dueDate: item.dueDate || '',
        createdAt: item.createdAt || '24 oct'
      }));
    } catch {
      return [...INITIAL_TASKS];
    }
  }

  static saveTasks(tasks: Task[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }

  static getProfile(): UserProfile {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;
    const stored = localStorage.getItem(PROFILE_KEY);
    if (!stored) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE));
      return { ...DEFAULT_PROFILE };
    }
    try {
      return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
    } catch {
      return { ...DEFAULT_PROFILE };
    }
  }

  static saveProfile(profile: UserProfile): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    }
  }

  static getFormattedCurrentDate(): string {
    const now = new Date();
    const day = now.getDate();
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${day} ${months[now.getMonth()]}`;
  }
}
