export interface Task {
  id: number;
  name: string;
  description?: string | null;
  completedAt?: Date | null;
}

export interface TaskState {
  // tasksWithCompletition: any[];
  tasks: Task[];
  task: Task;
  total: number;
  loading: boolean;
}
