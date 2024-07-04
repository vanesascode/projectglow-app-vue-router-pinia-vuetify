<script setup lang="ts">
import { useProjectsStore } from '@/stores';
import { computed, onMounted, ref } from 'vue';
import InputModal from '@/components/main/InputModal.vue';

const projectsStore = useProjectsStore();

const props = defineProps<{
  clientId: string;
}>();

const listAllProjects = async (clientId: number): Promise<void> => {
  await projectsStore.getAllProjects(clientId);
};

onMounted(async () => {
  try {
    const clientIdNumber: number = parseInt(props.clientId, 10);
    console.log('clientIdNumber', clientIdNumber);

    await listAllProjects(clientIdNumber);
    console.log('projectsStore.projects', projectsStore.projects);
  } catch (error) {
    console.error('Error in onMounted hook:', error);
  }
});

const projects = computed(() => projectsStore.projects);

// PAGINATION:

const search = ref('');

const page = ref(1);

const itemsPerPage = ref(2);

const pageCount = computed(() => {
  console.log('pageCount', Math.ceil(projects.value.length / itemsPerPage.value));
  return Math.ceil(projects.value.length / itemsPerPage.value);
});

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
    key: 'tasks',
    title: 'Tasks',
    align: 'start',
    sortable: false,
  },
  {
    key: 'actions',
    title: 'Actions',
    align: 'start',
    sortable: false,
  },
];
</script>

<!-- <template>
  <h1>asdf</h1>
  <v-data-table-virtual :headers="headers" :items="projectsStore.projects" item-value="name">
    <template v-slot:item.tasks="{ item }">
      <v-btn icon="mdi-eye-outline" class="icon" variant="text" />
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon="mdi-pencil-outline" class="icon" variant="text" />
      <v-btn icon="mdi-delete-outline" class="icon" variant="text" />
    </template>
  </v-data-table-virtual>

  <InputModal
    title="New Client"
    name="Add a name to your client"
    description="Add a description to your client"
  />
</template> -->

<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2 mt-5">
      Projects List for {{ props.clientId }}

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
      :items="projects"
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

      <template v-slot:item.tasks="{ item }">
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
    @new-client="handleAddNewProject($event)"
    title="New Project"
    name="Add a name to your project"
    description="Add a description to your project"
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
