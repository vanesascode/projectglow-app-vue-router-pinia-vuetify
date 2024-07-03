<script setup lang="ts">
import { useClientsStore } from '@/stores';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAddPaginationFilters } from '@/use';

import FilterTable from '@/components/tables/FilterTable.vue';

const localProps = withDefaults(
  defineProps<{
    displayInCardMode?: boolean;
  }>(),
  {
    displayInCardMode: true,
  },
);

const router = useRouter();
const clientsStore = useClientsStore();

onBeforeMount(() => {
  listAllClients();
});

interface DataTableHeader {
  text: string;
  value: string;
  class?: string;
  sortable?: boolean;
  width?: string;
}

const headers: Array<DataTableHeader> = [
  {
    text: 'Id',
    value: 'id',
  },
  {
    text: 'Name',
    value: 'name',
  },
  {
    text: 'Description',
    value: 'description',
  },
  {
    text: 'Enabled',
    value: 'isEnabled',
  },
  {
    text: 'Projects',
    value: 'projects',
    width: '100px',
  },
  {
    text: 'Actions',
    value: 'actions',
    width: '100px',
  },
];

const filterKeyList = ['Id', 'Name', 'Description'];
const { addFilters } = useAddPaginationFilters();

const listAllClients = async (): Promise<void> => {
  const request: any = {
    take: 999,
    skip: 0,
    sort: [],
    filters: addFilters(filterKeyList, search.value),
  };
  await clientsStore.getClients(request);
  console.log(clientsStore.clients);
};

const search = ref('');
const searchItem = (event: string) => {
  search.value = event;
  listAllClients();
};

// Go to client's page

export interface ClientBase {
  id: number;
  name: string;
  logoUrl: string | null;
  isEnabled: boolean;
  description: string | null;
  // projects: Project[];
}

const goToClient = (client: ClientBase): void => {
  const routeData = router.resolve({ name: 'Client', params: { clientName: client.name } });
  window.open(routeData.href, '_blank');
};
</script>

<template>
  <h1>Clients List</h1>
  <div v-for="client in clientsStore.clients" :key="client.id">
    {{ client.name }}
    <v-btn
      class="mr-1"
      icon="mdi-logout-variant"
      color="accent"
      size="30"
      @click="goToClient(client)"
    />
  </div>

  <!-- <FilterTable
    :headers="headers"
    :data="clientStore.clients"
    :loading="clientStore.loading"
    :display-in-card-mode="localProps.displayInCardMode"
    @search-item="searchItem"
  > -->
  <!-- ENABLED COLUMMN ADDINGS-->
  <!-- <template #isEnabled="{ item }">
      <v-icon v-if="item.isEnabled" icon="mdi-check" color="success" />
      <v-icon v-else icon="mdi-cancel" color="red" />
    </template> -->

  <!-- ACTIONS  COLUMMN ADDINGS-->
  <!-- <template #actions="{ item }">
      <div class="d-flex ga-4"> -->
  <!-- GO INTO CLIENT'S RESOURCES -->

  <!-- <v-tooltip :text="$t('common.tooltips.viewAs', { msg: item.name })" location="bottom">
          <template #activator="{ props }">
            <v-btn
              class="mr-1"
              icon="mdi-logout-variant"
              color="accent"
              size="30"
              v-bind="props"
              @click="viewAsClient(item as unknown as ClientListItemResponse)"
            />
          </template>
        </v-tooltip> -->

  <!-- EDIT CLIENT -->

  <!-- <v-tooltip :text="$t('common.tooltips.edit', { msg: item.name })" location="bottom">
          <template #activator="{ props }">
            <v-btn
              icon="mdi-pencil"
              color="accent"
              size="30"
              v-bind="props"
              @click="editClient(item as unknown as ClientListItemResponse)"
            />
          </template>
        </v-tooltip> -->

  <!-- DELETE CLIENT -->
  <!-- <v-tooltip :text="$t('common.tooltips.delete', { msg: item.name })" location="bottom"> -->
  <!-- the props bind the template with the v-bind of the button -->

  <!-- <template #activator="{ props }">
          ????? as ClientListItemResponse 
            <v-btn
              icon="mdi-trash-can-outline"
              color="accent"
              size="30"
              v-bind="props"
              @click="deleteClient(item as unknown as ClientListItemResponse)"
            />
          </template> 
        </v-tooltip>
      </div>
    </template>-->
  <!-- </FilterTable> -->
</template>
