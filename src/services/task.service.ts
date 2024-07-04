import { Task } from 'types';
import { httpClient } from './httpClient';

const baseUrl = '/clients';

class TaskService {
  getTasks = async (clientId: number, projectId: number): Promise<Task[]> => {
    const response = await httpClient.get(`${baseUrl}/${clientId}/projects/${projectId}`);
    return response.data;
  };
}

export default new TaskService();
