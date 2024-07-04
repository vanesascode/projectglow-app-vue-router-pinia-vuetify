import { defineStore } from 'pinia';
import type { Task, TaskState } from 'types';
import taskService from '@/services/task.service';

const defaultTask: Task = {
  id: 0,
  name: '',
  description: '',
  completedAt: null,
};

export const useTasksStore = defineStore({
  id: 'tasks',
  state: () =>
    ({
      tasks: [] as Task[],
      task: defaultTask,
      loading: false,
    }) as TaskState,
  actions: {
    async getAllTasks(clientId: number, projectId: number) {
      this.loading = true;

      try {
        const response = await taskService.getTasks(clientId, projectId);
        this.tasks = response ? response : [];
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
