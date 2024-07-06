// HERE I MAKE INTERACTIONS WITH THE CUSTOM AXIOS INSTANCE (httpClient)

// import { ClientBase } from 'types';
import { Client } from 'types';
import { httpClient } from './httpClient'; // CUSTOM AXIOS INSTANCE

const baseUrl = '/clients';

class ClientService {
  getClients = async (): Promise<Client[]> => {
    const response = await httpClient.get(`${baseUrl}`);
    return response.data;
  };

  addClient = async (params: any): Promise<Client> => {
    const response = await httpClient.post(`${baseUrl}`, params);
    return response.data;
  };

  deleteClient = async (client: Client): Promise<Client> => {
    const response = await httpClient.delete(`${baseUrl}/${client.id}`);
    return response.data;
  };

  editClient = async (
    client: { name: string; description: string; isEnabled: boolean },
    clientId: number,
  ): Promise<Client> => {
    const response = await httpClient.put(`${baseUrl}/${clientId}`, client);
    return response.data;
  };
}

export default new ClientService();
