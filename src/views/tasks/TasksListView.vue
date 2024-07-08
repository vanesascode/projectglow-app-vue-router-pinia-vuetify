<script setup lang="ts">
import { useTasksStore } from '@/stores';
import { computed, onMounted, ref } from 'vue';
import InputModal from '@/components/modals/InputModal.vue';
import EditModal from '@/components/modals/EditModal.vue';
import { Task } from 'types';
import BreadCrumbs from '@/components/main/BreadCrumbs.vue';
import { toastInterface, options as toastOptions } from '@/plugins/toastification';
import { useI18n } from 'vue-i18n'


const { t } = useI18n()

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

  const tableItemsPerPageText = document.querySelector('.v-data-table-footer__items-per-page span');
   if (tableItemsPerPageText) {
   tableItemsPerPageText.textContent = t('clients-table.items-per-page');
 }

  const tableSearchText = document.querySelector('.v-field-label');
  if (tableSearchText) {
    tableSearchText.textContent = t('clients-table.search');
  }
});

const tasks = computed(() => tasksStore.tasks);

// TABLE HEADERS:

const headers: ReadonlyArray<{
  readonly key?: (string & {})
  readonly title?: string | undefined;
  readonly align?: 'center' | 'end' | 'start' | undefined;
  readonly sortable?: boolean;
}> = [
    {
      key: 'checkbox',
      title: '',
      align: 'start',
    },
    {
      key: 'name',
      title: t('tasks-table.name'),
      align: 'start',
    },
    {
      key: 'description',
      title: t('tasks-table.description'),
      align: 'start',
      sortable: false,
    },
    {
      key: 'completedAt',
      title: t('tasks-table.completed-at'),
      align: 'start',
      sortable: false,
    },
    {
      key: 'actions',
      title: t('tasks-table.actions'),
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

  <div v-if="tasksStore.loading === true" class="d-flex justify-center align-center flex-column">
    <div>
      <v-card flat class="table-skeleton-width">
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
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.checkbox="{ item }">
          <input
            type="checkbox"
            :checked="!!item.completedAt"
            class="checkbox"
            @change="editTheCompletedDate(item.completedAt, item.id)"
          />
        </template>

          <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.actions="{ item }">
          <div class="d-flex justify-center align-center ga-15">
            <div>
              <EditModal
                @new-item="handleEditTask($event, item.id)"
                model-icon="mdi-pencil-outline"
                :model-title="$t('modal.edit-task')"
                :model-name="$t('modal.modify-name-task')"
                :model-description="$t('modal.modify-description-task')"
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

  <!-- To add a new task -->

  <InputModal
    @new-item="handleAddNewTask($event)"
    :title="$t('modal.new-task')"
    :name="$t('modal.task-name')"
    :description="$t('modal.task-description')"
  />
</template>
