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
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async addNewClient({
      name: nameValue,
      description: descriptionValue,
    }: {
      name: string;
      description: string;
    }) {
      this.loading = true;

      try {
        await clientService.addClient({
          name: nameValue,
          description: descriptionValue,
          isEnabled: true,
        });
        await this.getAllClients();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteClient(client: Client) {
      this.loading = true;

      try {
        await clientService.deleteClient(client);
        await this.getAllClients();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
