export interface Client {
  id: number;
  name: string;
  logoUrl?: string | null;
  isEnabled: boolean;
  description?: string | null;
  projects?: Project[];
}

export interface ClientState {
  clients: Client[];
  client: Client;
  total: number;
  loading: boolean;
}
