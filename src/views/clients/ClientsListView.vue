<script setup lang="ts">
import { useClientsStore } from '@/stores';
import { computed, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Client } from 'types';
import InputModal from '@/components/main/InputModal.vue';

const router = useRouter();
const clientsStore = useClientsStore();

const listAllClients = async (): Promise<void> => {
  await clientsStore.getAllClients();
};

onBeforeMount(() => {
  listAllClients();
});

const goToClient = (client: Client): void => {
  const routeData = router.resolve({ name: 'Client', params: { clientName: client.name } });
  window.open(routeData.href, '_blank');
};

const deleteClient = (client: Client): void => {
  clientsStore.deleteClient(client);
};

// TABLE:

const headers: ReadonlyArray<{
  key: string;
  title: string;
  align: string;
  sortable?: boolean;
}> = [
  {
    key: 'id',
    title: 'Id',
    align: 'start',
  },
  {
    key: 'name',
    title: 'Name',
    align: 'start',
  },
  {
    key: 'description',
    title: 'Description',
    align: 'start',
    sortable: false,
  },
  {
    key: 'isEnabled',
    title: 'Active',
    align: 'start',
  },
  {
    key: 'projects',
    title: 'Projects',
    align: 'start',
    sortable: false,
  },
  {
    key: 'actions',
    title: 'Actions',
    align: 'center',
    sortable: false,
  },
];

const clients = computed(() => clientsStore.clients);

// const handleInputValue = () => {
//   console.log(name);
//   clientsStore.addClient({ name: 'whaterver', description: 'whaterver' });
// };

const goToProjects = (client: Client): void => {
  const routeData = router.resolve({ name: 'ClientProjects', params: { clientId: client.id } });
  window.open(routeData.href, '_blank');
};

const handleAddNewClient = (client: { name: string; description: string }): void => {
  clientsStore.addNewClient(client);
};

// PAGINATION:

const search = ref('');

const page = ref(1);

const itemsPerPage = ref(2);

const pageCount = computed(() => {
  console.log('pageCount', Math.ceil(clients.value.length / itemsPerPage.value));
  return Math.ceil(clients.value.length / itemsPerPage.value);
});
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2 mt-5">
      Clients List

      <v-spacer></v-spacer>

      <!-- Buscador por nombre -->

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table
      v-model:page="page"
      v-model:search="search"
      :headers="headers"
      :items="clients"
      :items-per-page="itemsPerPage"
    >
      <template v-slot:top>
        <v-text-field
          :model-value="itemsPerPage"
          class="pa-2"
          label="Items per page"
          max="15"
          min="-1"
          type="number"
          hide-details
          @update:model-value="itemsPerPage = parseInt($event, 10)"
        ></v-text-field>
      </template>

      <template v-slot:item.projects="{ item }">
        <v-btn icon="mdi-eye-outline" class="icon" variant="text" @click="goToProjects(item)" />
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon="mdi-pencil-outline" class="icon" variant="text" @click="goToClient(item)" />
        <v-btn icon="mdi-delete-outline" class="icon" variant="text" @click="deleteClient(item)" />
      </template>

      <!-- Pagination -->

      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </template>
    </v-data-table>
  </v-card>

  <!-- To add a new client -->

  <InputModal
    @new-item="handleAddNewClient($event)"
    title="New Client"
    name="Add a name to your client"
    description="Add a description to your client"
  />
</template>

<style lang="scss">
.icon {
  &:hover {
    color: #299145;
  }
}
.v-data-table-header__content {
  font-weight: bolder;
  font-size: 1rem;
}
</style>
