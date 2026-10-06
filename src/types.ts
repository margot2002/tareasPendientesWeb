export type PriorityLevel = 'none' | 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: PriorityLevel;
  dueDate: string;
  createdAt: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export type FilterType = 'all' | 'pending' | 'completed';

export type NavTab = 'overview' | 'tasks' | 'settings';
