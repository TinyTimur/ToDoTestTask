export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  hidden?: boolean;
}

export type TodoFilter = 'all' | 'active' | 'completed';
