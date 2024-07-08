<script setup lang="ts">
import { useTasksStore } from '@/stores';
import { computed, onMounted, ref } from 'vue';
import InputModal from '@/components/modals/InputModal.vue';
import EditModal from '@/components/modals/EditModal.vue';
import { Task } from 'types';
import BreadCrumbs from '@/components/main/BreadCrumbs.vue';
import { toastInterface, options as toastOptions } from '@/plugins/toastification';

const props = defineProps<{
  clientId: string;
  clientName: string;
  projectId: string;
  projectName: string;
}>();

// GET TASKS:

const tasksStore = useTasksStore();

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

// TABLE HEADERS:

const headers: any =
  // ReadonlyArray<{
  //   key: string;
  //   title: string;
  //   align: string;
  //   sortable?: boolean;
  // }>
  [
    {
      key: 'checkbox',
      title: '',
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
      key: 'completedAt',
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
  try {
    tasksStore.addNewTask(task, clientIdNumber, projectIdNumber);
    toastInterface.success('Task added successfully', toastOptions);
  } catch (error) {
    console.error('Error in handleAddNewTask:', error);
  }
};

const handleDeleteTask = (task: Task) => {
  try {
    tasksStore.deleteTheTask(task, clientIdNumber, projectIdNumber);
    toastInterface.success('Task deleted successfully', toastOptions);
  } catch (error) {
    console.error('Error in handleDeleteTask:', error);
  }
};

const handleEditTask = (task: { name: string; description: string }, taskId: number): void => {
  try {
    tasksStore.editTheTask(task, taskId, projectIdNumber, clientIdNumber);
    toastInterface.success('Task edited successfully', toastOptions);
  } catch (error) {
    console.error('Error in handleEditTask:', error);
  }
};

const editTheCompletedDate = (
  task: { completedAt: string | Date | undefined | null } | string | undefined,
  taskId: number,
) => {
  try {
    if (typeof task === 'string') {
      task = { completedAt: task };
    }
    if (task === undefined) {
      task = { completedAt: undefined };
    }
    if (!task || task.completedAt === undefined || task.completedAt === '') {
      task = {
        completedAt: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
      };
      tasksStore.editTheTask(task, taskId, projectIdNumber, clientIdNumber);
      toastInterface.success('Finish date added successfully', toastOptions);
    } else {
      task = { completedAt: '' };
      tasksStore.editTheTask(task, taskId, projectIdNumber, clientIdNumber);
      toastInterface.error('Careful: Finish date removed', toastOptions);
    }
  } catch (error) {
    console.error('Error in editTheCompletedDate:', error);
  }
};

// PAGINATION:

const search = ref('');
const page = ref(1);
const itemsPerPage = ref(10);
</script>

<template>
  <!-- Skeleton loader -->

  <div v-if="tasksStore.loading === true">
    <v-card flat width="1200px" class="hidden">
      <v-card-title class="d-flex align-center pe-2">
        <BreadCrumbs
          :clientId="props.clientId"
          :clientName="props.clientName"
          :projectId="props.projectId"
          :projectName="props.projectName"
        />
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

  <!-- Tasks table -->

  <div class="d-flex justify-center" v-if="tasksStore.loading === false">
    <v-card flat width="1200px">
      <v-card-title>
        <div class="d-flex flex-column flex-md-row align-md-center justify-space-between">
          <BreadCrumbs
            :clientId="props.clientId"
            :clientName="props.clientName"
            :projectId="props.projectId"
            :projectName="props.projectName"
          />

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
        </div>
      </v-card-title>

      <v-divider></v-divider>

      <v-data-table
        v-model:page="page"
        v-model:search="search"
        :headers="headers"
        :items="tasks"
        :items-per-page="itemsPerPage"
      >
        <template v-slot:item.checkbox="{ item }">
          <input
            type="checkbox"
            :checked="!!item.completedAt"
            class="checkbox"
            @change="editTheCompletedDate(item.completedAt, item.id)"
          />
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex justify-center align-center ga-15">
            <div>
              <EditModal
                @new-item="handleEditTask($event, item.id)"
                model-icon="mdi-pencil-outline"
                model-title="Edit Task"
                model-name="Modify the name to your task"
                model-description="Modify the description to your task"
                :name-to-be-edited="item.name"
                :description-to-be-edited="item.description ?? ''"
              />
            </div>
            <v-btn
              icon="mdi-delete-outline"
              class="icon"
              variant="text"
              @click="handleDeleteTask(item)"
            />
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>

  <!-- To add a new project -->

  <InputModal
    @new-item="handleAddNewTask($event)"
    title="New Task"
    name="Add a name to your task"
    description="Add a description to your task"
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
