import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'ClientsList',
    component: () => import('@/views/clients/ClientsListView.vue'),
  },

  // CLIENT PROFILE TO BE ADDED IN THE FUTURE
  {
    path: ':clientName',
    name: 'Client',
    component: () => import('@/views/clients/ClientProfileView.vue'),
  },
];

export default routes;
