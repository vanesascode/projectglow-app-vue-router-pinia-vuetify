export interface Task {
  id: number;
  name: string;
  description?: string | null;
  completedAt?: { completedAt: string | Date | null | undefined };
}

export interface TaskState {
  tasks: Task[];
  task: Task;
  total: number;
  loading: boolean;
}
