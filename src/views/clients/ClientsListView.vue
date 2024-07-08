<script setup lang="ts">
import { useClientsStore } from '@/stores';
import { computed, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Client } from 'types';
import InputModal from '@/components/modals/InputModal.vue';
import BreadCrumbs from '@/components/main/BreadCrumbs.vue';
import EditModal from '@/components/modals/EditModal.vue';
import BackendSlowWarningModal from '@/components/modals/BackendSlowWarningModal.vue';
import { toastInterface, options as toastOptions } from '@/plugins/toastification';

const router = useRouter();

// GET CLIENTS:

const clientsStore = useClientsStore();

const listAllClients = async (): Promise<void> => {
  await clientsStore.getAllClients();
};

onBeforeMount(async () => {
  try {
    await listAllClients();
  } catch (error) {
    console.error('Error in onBeforeMount hook:', error);
  }
});

const clients = computed(() => clientsStore.clients);

// TABLE HEADERS:

const headers: any =
  // ReadonlyArray<{ key: string; title: string; align: string; sortable?: boolean }>
  [
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
    },
    {
      key: 'isEnabled',
      title: 'Active',
      align: 'center',
    },
    {
      key: 'projects',
      title: 'Projects',
      align: 'center',
      sortable: false,
    },
    {
      key: 'actions',
      title: 'Actions',
      align: 'center',
      sortable: false,
    },
  ];

// TABLE METHODS:

const goToProjects = (client: Client): void => {
  const routeData = router.resolve({
    name: 'ClientProjects',
    params: { clientId: client.id, clientName: client.name },
  });
  window.open(routeData.href, '_blank');
};

const handleDeleteClient = (client: Client): void => {
  try {
    clientsStore.deleteTheClient(client);
    toastInterface.success('Client deleted successfully', toastOptions);
  } catch (error) {
    console.error(error);
  }
};

const handleAddNewClient = (client: { name: string; description: string }): void => {
  try {
    clientsStore.addNewClient(client);
    toastInterface.success('New client added successfully', toastOptions);
  } catch (error) {
    console.error(error);
  }
};

const handleEditClient = (
  client: { name: string; description: string; isEnabled: boolean },
  clientId: number,
): void => {
  try {
    clientsStore.editTheClient(client, clientId);
    toastInterface.success('Client edited successfully', toastOptions);
  } catch (error) {
    console.error(error);
  }
};

// PAGINATION:

const search = ref('');
const page = ref(1);
const itemsPerPage = ref(10);
</script>

<template>
  <BackendSlowWarningModal />

  <!-- Skeleton loader -->

  <div v-if="clientsStore.loading === true">
    <v-card flat width="1200px" class="hidden">
      <v-card-title class="d-flex align-center pe-2">
        <BreadCrumbs />
        <v-spacer></v-spacer>
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
    </v-card>
    <v-skeleton-loader :elevation="14" type="table-thead"></v-skeleton-loader>
    <v-skeleton-loader :elevation="14" type="table-tbody"></v-skeleton-loader>
  </div>

  <!-- Clients table -->

  <div class="d-flex justify-center" v-if="clientsStore.loading === false">
    <v-card flat width="1200px">
      <v-card-title class="d-flex align-center pe-2">
        <BreadCrumbs />

        <v-spacer></v-spacer>

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
        <template v-slot:item.isEnabled="{ item }">
          <v-icon v-if="item.isEnabled" icon="mdi-check" color="success" />
          <v-icon v-else icon="mdi-cancel" color="red" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </template>

        <template v-slot:item.projects="{ item }">
          <v-btn icon="mdi-eye-outline" class="icon" variant="text" @click="goToProjects(item)" />
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="d-flex justify-center align-center ga-15">
            <div>
              <EditModal
                @new-item="handleEditClient($event, item.id)"
                model-icon="mdi-pencil-outline"
                model-title="Edit Client"
                model-name="Modify the name to your client"
                model-description="Modify the description to your client"
                :name-to-be-edited="item.name"
                :description-to-be-edited="item.description ?? ''"
                clientsModal
                :is-enabled-to-be-edited="item.isEnabled"
              />
            </div>
            <v-btn
              icon="mdi-delete-outline"
              class="icon"
              variant="text"
              @click="handleDeleteClient(item)"
            />
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>

  <!-- To add a new client -->

  <InputModal
    @new-item="handleAddNewClient($event)"
    title="New Client"
    name="Add a name to your client"
    description="Add a description to your client"
  />
</template>

<style lang="scss">
@import '@/assets/styles/main.scss';

.icon {
  &:hover {
    color: $primary-color;
  }
}
.v-data-table-header__content {
  font-weight: bolder;
  font-size: 1rem;
}
</style>
