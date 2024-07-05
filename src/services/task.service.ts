import { Task } from 'types';
import { httpClient } from './httpClient';

const baseUrl = '/clients';

class TaskService {
  getTasks = async (clientId: number, projectId: number): Promise<Task[]> => {
    const response = await httpClient.get(`${baseUrl}/${clientId}/projects/${projectId}/tasks`);
    return response.data;
  };

  addTask = async (
    task: { name: string; description: string },
    clientId: number,
    projectId: number,
  ): Promise<Task> => {
    const response = await httpClient.post(
      `${baseUrl}/${clientId}/projects/${projectId}/tasks`,
      task,
    );
    return response.data;
  };

  deleteTask = async (task: Task, clientId: number, projectId: number): Promise<Task> => {
    const response = await httpClient.delete(
      `${baseUrl}/${clientId}/projects/${projectId}/tasks/${task.id}`,
    );
    return response.data;
  };
}

export default new TaskService();
