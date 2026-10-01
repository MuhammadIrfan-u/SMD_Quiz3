export type Priority = 'low' | 'medium' | 'high';
export type Category = 'Work' | 'Study' | 'Personal' | 'Urgent';

export interface TodoItem {
  id: string;
  title: string;
  category: Category;
  priority: Priority;
  completed: boolean;
  createdAt: number;
}

export type FilterStatus = 'all' | 'active' | 'completed';
