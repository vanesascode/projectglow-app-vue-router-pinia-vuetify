import { defineStore } from 'pinia';
import type { ProjectState, Project } from 'types';
import projectService from '@/services/project.service';

const defaultProject: Project = {
  id: 0,
  name: '',
  isEnabled: false,
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
  },
});
