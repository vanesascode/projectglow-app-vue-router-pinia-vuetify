import MainClientsView from '@/views/MainClientsView.vue';
import MainAuthView from '@/views/MainAuthView.vue';
import MainProjectsView from '@/views/MainProjectsView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import clientRoutes from './clientRoutes';
import projectsRoutes from './projecstRoutes';
import authRoutes from './authRoutes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      redirect: '/login',
      component: MainAuthView,
      children: [...authRoutes],
    },
    {
      path: '/welcome',
      name: 'home',
      component: () => import('@/views/auth/WelcomeView.vue'),
    },

    {
      path: '/clients',
      name: 'ClientsList',
      component: MainClientsView,
      children: [...clientRoutes],
    },
    {
      path: '/clients/:clientId/projects',
      name: 'ClientProjects',
      component: MainProjectsView,
      children: [...projectsRoutes],
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: { name: '/' },
    },
  ],
});

export default router;
