import { defineStore } from 'pinia';
import type { ProjectState, Project } from 'types';
import projectService from '@/services/project.service';

const defaultProject: Project = {
  id: 0,
  name: '',
  description: '',
  tasks: [],
  progress: 0,
};

export const useProjectsStore = defineStore({
  id: 'projects',
  state: () =>
    ({
      projects: [] as Project[],
      project: defaultProject,
      loading: false,
    }) as ProjectState,
  actions: {
    async getAllProjects(clientId: number) {
      this.loading = true;

      try {
        const response = await projectService.getProjects(clientId);
        this.projects = response ? response : [];
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async addNewProject(project: { name: string; description: string }, clientId: number) {
      this.loading = true;

      try {
        const newProject = { ...project, isEnabled: true, tasks: [] };
        await projectService.addProject(newProject, clientId);
        await this.getAllProjects(clientId);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteTheProject(project: Project, clientId: number) {
      this.loading = true;

      try {
        await projectService.deleteProject(project, clientId);
        await this.getAllProjects(clientId);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async editTheProject(
      project: { name: string; description: string },
      projectId: number,
      clientId: number,
    ) {
      this.loading = true;

      try {
        await projectService.editProject(project, projectId, clientId);
        await this.getAllProjects(clientId);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
