import MainLayout from '@/views/MainLayout.vue';
import MainAuthView from '@/views/MainAuthView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import clientRoutes from './clientRoutes';
import authRoutes from './authRoutes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // AUTH VIEW

    {
      path: '/',
      name: 'auth',
      redirect: '/login',
      component: MainAuthView,
      children: [...authRoutes],
    },

    // CLIENTS VIEW

    {
      path: '/clients',
      name: 'ClientsList',
      component: MainLayout,
      children: [...clientRoutes],
    },

    // PROJECTS VIEW

    {
      path: '/clients/:clientId/:clientName/projects',
      name: 'ClientProjects',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'projects',
          props: true,
          component: () => import('@/views/projects/ProjectsView.vue'),
        },
      ],
    },

    // TASKS VIEW

    {
      path: '/clients/:clientId/:clientName/projects/:projectId/:projectName',
      props: true,
      name: 'Tasks',
      component: () => import('@/views/projects/ProjectView.vue'),
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
