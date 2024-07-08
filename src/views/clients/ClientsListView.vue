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
import { useI18n } from 'vue-i18n'


const { t } = useI18n()

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

const headers: ReadonlyArray<{
  readonly key?: (string & {})
  readonly title?: string | undefined;
  readonly align?: 'center' | 'end' | 'start' | undefined;
  readonly sortable?: boolean;
}> = [
    {
      key: 'id',
      title: 'Id',
      align: 'start',
    },
    {
      key: 'name',
      title: t('clients-table.name'),
      align: 'start',
    },
    {
      key: 'description',
      title: t('clients-table.description'),
      align: 'start',
    },
    {
      key: 'isEnabled',
      title: t('clients-table.active'),
      align: 'center',
    },
    {
      key: 'projects',
      title: t('clients-table.projects'),
      align: 'center',
      sortable: false,
    },
    {
      key: 'actions',
      title: t('clients-table.actions'),
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

  <div class="d-flex justify-center align-center flex-column" v-if="clientsStore.loading === true">
    <div>
      <v-card flat class="table-skeleton-width">
        <v-card-title class="d-flex align-center pe-2">
          <BreadCrumbs />
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            density="compact"
            :label="$t('clients-table.search')"
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
          :label="$t('clients-table.search')"
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
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.isEnabled="{ item }">
          <v-icon v-if="item.isEnabled" icon="mdi-check" color="success" />
          <v-icon v-else icon="mdi-cancel" color="red" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </template>

          <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.projects="{ item }">
          <v-btn icon="mdi-eye-outline" class="icon" variant="text" @click="goToProjects(item)" />
        </template>
        
          <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.actions="{ item }">
          <div class="d-flex justify-center align-center ga-15">
            <div>
              <EditModal
                @new-item="handleEditClient($event, item.id)"
                model-icon="mdi-pencil-outline"
                :model-title="$t('modal.edit-client')"
                :model-name="$t('modal.modify-name-client')"
                :model-description="$t('modal.modify-description-client')"
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
    :title="$t('modal.new-client')"
    :name="$t('modal.client-name')"
    :description="$t('modal.client-description')"
  />
</template>
