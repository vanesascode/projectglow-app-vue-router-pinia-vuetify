import { defineStore } from 'pinia';
import clientService from '@/services/client.service';
import type { Client, ClientState } from 'types';

const defaultClient: Client = {
  id: 0,
  name: '',
  logoUrl: '',
  isEnabled: false,
  description: '',
  projects: [],
};

export const useClientsStore = defineStore({
  id: 'clients',
  state: () =>
    ({
      clients: [] as Client[],
      client: defaultClient,
      total: 0,
      loading: false,
    }) as ClientState,
  actions: {
    async getClients() {
      this.loading = true;

      try {
        const response = await clientService.getClients();
        this.clients = response ? response : [];
        this.total = this.clients.length;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
