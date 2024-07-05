<script setup lang="ts">
import { useTasksStore } from '@/stores';
import { computed, onMounted, ref } from 'vue';
import InputModal from '@/components/main/InputModal.vue';
import EditModal from '@/components/main/EditModal.vue';
import { Task } from 'types';

// GET TASKS:

const tasksStore = useTasksStore();

const props = defineProps<{
  clientId: string;
  projectId: string;
}>();

const listAllTasks = async (clientId: number, projectId: number): Promise<void> => {
  await tasksStore.getAllTasks(clientId, projectId);
};

const clientIdNumber: number = parseInt(props.clientId, 10);
const projectIdNumber: number = parseInt(props.projectId, 10);

onMounted(async () => {
  try {
    await listAllTasks(clientIdNumber, projectIdNumber);
  } catch (error) {
    console.error('Error in onMounted hook:', error);
  }
});

const tasks = computed(() => tasksStore.tasks);

// TABLE:

const headers: ReadonlyArray<{
  key: string;
  title: string;
  align: string;
  sortable?: boolean;
}> = [
  // TODO: ADD THE TOGGLER TO SET THE COMPLETED DATE
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
    key: 'completed',
    title: 'Completed at',
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

// TABLE METHODS:

const handleAddNewTask = (task: { name: string; description: string }) => {
  console.log(task, clientIdNumber, projectIdNumber);
  tasksStore.addNewTask(task, clientIdNumber, projectIdNumber);
};

const handleDeleteTask = (task: Task) => {
  tasksStore.deleteTheTask(task, clientIdNumber, projectIdNumber);
};

const handleEditTask = (task: { name: string; description: string }, taskId: number): void => {
  tasksStore.editTheTask(task, taskId, projectIdNumber, clientIdNumber);
};

// PAGINATION:

const search = ref('');
const page = ref(1);
const itemsPerPage = ref(20);
const pageCount = computed(() => {
  return Math.ceil(tasks.value.length / itemsPerPage.value);
});
</script>

<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2 mt-5">
      Tasks List for project {{ props.projectId }}

      <v-spacer></v-spacer>

      <!-- Buscador por nombre -->

      <!-- <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field> -->
    </v-card-title>

    <v-divider></v-divider>

    <v-data-table
      v-model:page="page"
      v-model:search="search"
      :headers="headers"
      :items="tasks"
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

      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-start ga-6">
          <EditModal
            @new-item="handleEditTask($event, item.id)"
            model-icon="mdi-pencil-outline"
            model-title="Edit Task"
            model-name="Modify the name to your task"
            model-description="Modify the description to your task"
            :name-to-be-edited="item.name"
            :description-to-be-edited="item.description ?? ''"
          />
          <v-btn
            icon="mdi-delete-outline"
            class="icon"
            variant="text"
            @click="handleDeleteTask(item)"
          />
        </div>
      </template>

      <!-- Pagination -->

      <!-- <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </div>
      </template> -->
    </v-data-table>
  </v-card>

  <!-- To add a new project -->

  <InputModal
    @new-item="handleAddNewTask($event)"
    title="New Task"
    name="Add a name to your task"
    description="Add a description to your task"
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
