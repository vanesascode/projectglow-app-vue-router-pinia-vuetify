import { defineStore } from 'pinia';
import type { Task, TaskState } from 'types';
import taskService from '@/services/task.service';

const defaultTask: Task = {
  id: 0,
  name: '',
  description: '',
  completedAt: { completedAt: '' },
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

    async addNewTask(
      task: { name: string; description: string },
      clientId: number,
      projectId: number,
    ) {
      this.loading = true;

      try {
        await taskService.addTask(task, clientId, projectId);
        await this.getAllTasks(clientId, projectId);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteTheTask(task: Task, clientId: number, projectId: number) {
      this.loading = true;

      try {
        await taskService.deleteTask(task, clientId, projectId);
        await this.getAllTasks(clientId, projectId);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async editTheTask(task: any, taskId: number, projectId: number, clientId: number) {
      this.loading = true;

      try {
        await taskService.editTask(task, taskId, projectId, clientId);
        await this.getAllTasks(clientId, projectId);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
