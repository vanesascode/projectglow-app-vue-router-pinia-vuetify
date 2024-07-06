import MainClientsView from '@/views/MainClientsView.vue';
import MainAuthView from '@/views/MainAuthView.vue';
import MainProjectsView from '@/views/MainProjectsView.vue';
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

    // WECOME VIEW
    {
      path: '/welcome',
      name: 'home',
      component: () => import('@/views/auth/WelcomeView.vue'),
    },

    // CLIENTS VIEW

    {
      path: '/clients',
      name: 'ClientsList',
      component: MainClientsView,
      children: [...clientRoutes],
    },

    // PROJECTS VIEW

    {
      path: '/clients/:clientId/:clientName/projects',
      name: 'ClientProjects',
      component: MainProjectsView,
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
