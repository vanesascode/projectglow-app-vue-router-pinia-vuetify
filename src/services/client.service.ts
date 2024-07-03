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
}

export default new ClientService();
