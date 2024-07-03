import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'ClientsList',
    component: () => import('@/views/clients/ClientsListView.vue'),
  },
  {
    path: ':clientName',
    name: 'Client',
    component: () => import('@/views/clients/ClientProfileView.vue'),
  },
  {
    path: ':clientName/edit',
    name: 'EditClient',
    component: () => import('@/views/clients/ClientEditView.vue'),
  },
];

export default routes;
