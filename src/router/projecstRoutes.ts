import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'projects',
    component: () => import('@/views/projects/ProjectsView.vue'),
  },
  {
    path: ':id',
    props: true,
    name: 'project',
    component: () => import('@/views/projects/ProjectView.vue'),
  },
];

export default routes;
