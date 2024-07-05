import { Task } from './task';

export interface Project {
  id: number;
  name: string;
  description?: string | null;
  isEnabled: boolean;
  tasks?: Task[];
  progress?: number;
}

export interface ProjectState {
  projects: Project[];
  project: Project;
  total: number;
  loading: boolean;
}
