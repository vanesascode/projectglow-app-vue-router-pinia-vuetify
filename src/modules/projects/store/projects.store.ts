import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '@/modules/projects/interfaces/project.interface';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

const initialLoad = () => {
  return [
    {
      id: uuidv4(),
      name: 'Project 1',
      tasks: [
        {
          id: uuidv4(),
          name: 'Task 1',
          completedAt: undefined,
        },
        {
          id: uuidv4(),
          name: 'Task 2',
          completedAt: new Date(),
        },
      ],
    },
    {
      id: uuidv4(),
      name: 'Project 2',
      tasks: [],
    },
  ];
};

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(
    useLocalStorage<Project[]>(
      'projects',
      initialLoad(), //or []
    ),
  );

  const addProject = (projectName: string) => {
    if (projectName.length === 0) return;

    projects.value.push({
      id: uuidv4(),
      name: projectName,
      tasks: [],
    });
  };

  const addTask = (projectId: string | undefined, taskName: string) => {
    if (taskName.length === 0) return;

    const project = projects.value.find((project) => project.id === projectId);

    if (!project) return;

    project.tasks.push({
      id: uuidv4(),
      name: taskName,
      completedAt: undefined,
    });
  };

  const toggleTask = (projectId: string | undefined, taskId: string) => {
    const project = projects.value.find((project) => project.id === projectId);
    if (!project) return;

    const task = project.tasks.find((task) => task.id === taskId);
    if (!task) return;

    task.completedAt = task.completedAt ? undefined : new Date();
  };

  return {
    // projects, (NO)
    // We don't return projects directly for protection, we use a 'getter' using computed:
    projectList: computed(() => [...projects.value]),
    noProjects: computed(() => projects.value.length === 0),
    projectsWithCompletition: computed(() => {
      return projects.value.map((project) => {
        const completedTasks = project.tasks.filter((task) => task.completedAt).length;
        const progress = Math.floor((completedTasks * 100) / project.tasks.length);

        return {
          id: project.id,
          name: project.name,
          tasks: project.tasks,
          progress: progress,
        };
      });
    }),

    addProject,
    addTask,
    toggleTask,
  };
});
