import { Project, Task } from 'types';
import { httpClient } from './httpClient';

const baseUrl = '/clients';

class ProjectService {
  getProjects = async (clientId: number): Promise<Project[]> => {
    const response = await httpClient.get(`${baseUrl}/${clientId}/projects`);
    return response.data;
  };
  addProject = async (
    newProject: { name: string; description: string; isEnabled: boolean; tasks: Task[] },
    clientId: number,
  ): Promise<Project> => {
    const response = await httpClient.post(`${baseUrl}/${clientId}/projects`, newProject);
    return response.data;
  };

  deleteProject = async (project: Project, clientId: number): Promise<Project> => {
    const response = await httpClient.delete(`${baseUrl}/${clientId}/projects/${project.id}`);
    return response.data;
  };

  editProject = async (
    project: { name: string; description: string },
    projectId: number,
    clientId: number,
  ): Promise<Project> => {
    const response = await httpClient.put(`${baseUrl}/${clientId}/projects/${projectId}`, project);
    return response.data;
  };
}

export default new ProjectService();
