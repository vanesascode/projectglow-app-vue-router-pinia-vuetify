import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'projects',
    props: true,
    component: () => import('@/views/projects/ProjectsView.vue'),
  },
  {
    path: ':projectId',
    props: true,
    name: 'Project',
    component: () => import('@/views/projects/ProjectView.vue'),
  },
];

export default routes;
