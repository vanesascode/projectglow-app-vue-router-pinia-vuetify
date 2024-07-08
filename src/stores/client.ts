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
      loading: false,
    }) as ClientState,
  actions: {
    async getAllClients() {
      this.loading = true;

      try {
        const response = await clientService.getClients();
        this.clients = response ? response : [];
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },

    async addNewClient(client: { name: string; description: string }) {
      this.loading = true;

      try {
        const newClient = { ...client, isEnabled: true, projects: [] };
        await clientService.addClient(newClient);
        await this.getAllClients();
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },

    async deleteTheClient(client: Client) {
      this.loading = true;

      try {
        await clientService.deleteClient(client);
        await this.getAllClients();
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },

    async editTheClient(
      client: { name: string; description: string; isEnabled: boolean },
      clientId: number,
    ) {
      this.loading = true;

      try {
        await clientService.editClient(client, clientId);
        await this.getAllClients();
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
