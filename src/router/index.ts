import MainLayout from '@/views/MainLayout.vue';
import MainAuthView from '@/views/MainAuthView.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import authRoutes from './authRoutes';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // AUTH VIEWS

    {
      path: '/',
      name: 'auth',
      redirect: '/login',
      component: MainAuthView,
      children: [...authRoutes],
    },

    // CLIENTS VIEWS

    {
      path: '/clients',
      name: 'ClientsList',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'ClientsList',
          component: () => import('@/views/clients/ClientsListView.vue'),
        },
      ],
    },

    // PROJECTS & TASKS

    {
      path: '/clients/:clientId/:clientName/projects',
      name: 'ClientProjects',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'projects',
          props: true,
          component: () => import('@/views/projects/ProjectsListView.vue'),
        },
        {
          path: ':projectId/:projectName',
          props: true,
          name: 'Tasks',
          component: () => import('@/views/tasks/TasksListView.vue'),
        },
      ],
    },

    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: { name: '/' },
    },
  ],
});

export default router;
