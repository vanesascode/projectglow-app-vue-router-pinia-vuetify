import { Project } from 'types';
import { httpClient } from './httpClient';

const baseUrl = '/clients';

class ProjectService {
  getProjects = async (clientId: number): Promise<Project[]> => {
    const response = await httpClient.get(`${baseUrl}/${clientId}/projects`);
    return response.data;
  };
  addProject = async (
    newProject: { name: string; description: string; isEnabled: boolean },
    clientId: number,
  ): Promise<Project> => {
    const response = await httpClient.post(`${baseUrl}/${clientId}/projects`, newProject);
    return response.data;
  };
}

export default new ProjectService();
