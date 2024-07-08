<script setup lang="ts">
import { useProjectsStore } from '@/stores';
import { computed, onMounted, ref } from 'vue';
import InputModal from '@/components/modals/InputModal.vue';
import EditModal from '@/components/modals/EditModal.vue';
import { Project } from 'types';
import router from '@/router';
import BreadCrumbs from '@/components/main/BreadCrumbs.vue';
import { toastInterface, options as toastOptions } from '@/plugins/toastification';
import { useI18n } from 'vue-i18n'


const { t } = useI18n()

const props = defineProps<{
  clientId: string;
  clientName: string;
}>();

// GET PROJECTS:

const projectsStore = useProjectsStore();

const listAllProjects = async (clientId: number): Promise<void> => {
  await projectsStore.getAllProjects(clientId);
};

const clientIdNumber: number = parseInt(props.clientId, 10);

onMounted(async () => {
  try {
    await listAllProjects(clientIdNumber);
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

const projects = computed(() => projectsStore.projects);

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
      key: 'id',
      title: 'Id',
      align: 'start',
    },
    {
      key: 'name',
      title: t('projects-table.name'),
      align: 'start',
    },
    {
      key: 'description',
      title: t('projects-table.description'),
      align: 'start',
      sortable: false,
    },
    {
      key: 'progress',
      title: t('projects-table.progress'),
      align: 'start',
    },
    {
      key: 'tasks',
      title: t('projects-table.tasks'),
      align: 'start',
      sortable: false,
    },
    {
      key: 'actions',
      title: t('projects-table.actions'),
      align: 'center',
      sortable: false,
    },
  ];

// TABLE METHODS:

const goToTasks = (project: Project, clientIdNumber: number): void => {
  const routeData = router.resolve({
    name: 'Tasks',
    params: {
      clientId: clientIdNumber,
      clientName: props.clientName,
      projectId: project.id,
      projectName: project.name,
    },
  });
  window.open(routeData.href, '_blank');
};

const handleAddNewProject = (project: { name: string; description: string }): void => {
  try {
    projectsStore.addNewProject(project, clientIdNumber);
    toastInterface.success('Project added successfully', toastOptions);
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteProject = (project: Project): void => {
  try {
    projectsStore.deleteTheProject(project, clientIdNumber);
    toastInterface.success('Project deleted successfully', toastOptions);
  } catch (error) {
    console.error(error);
  }
};

const handleEditProject = (
  project: { name: string; description: string },
  projectId: number,
): void => {
  try {
    projectsStore.editTheProject(project, projectId, clientIdNumber);
    toastInterface.success('Project edited successfully', toastOptions);
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
  <!-- Skeleton loader -->

  <div class="d-flex justify-center align-center flex-column" v-if="projectsStore.loading === true">
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

  <!-- Projects table -->

  <div class="d-flex justify-center" v-if="projectsStore.loading === false">
    <v-card flat width="1200px">
      <v-card-title>
        <div class="d-flex flex-column flex-sm-row align-sm-center justify-space-between">
          <BreadCrumbs
            :clientId="props.clientId"
            :projectsPage="true"
            :clientName="props.clientName"
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
        :items="projects"
        :items-per-page="itemsPerPage"
      >
      
        <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.progress="{ item }">
          <v-progress-linear :model-value="item.progress" height="25" color="#299145">
            <strong v-if="item.tasks && item.tasks.length > 0">
              {{ item.progress ? item.progress : '0' }}%</strong
            >
            <strong v-else>Add tasks</strong>
          </v-progress-linear>
        </template>

          <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.tasks="{ item }">
          <v-btn
            icon="mdi-eye-outline"
            class="icon"
            variant="text"
            @click="goToTasks(item, clientIdNumber)"
          />
        </template>

          <!-- eslint-disable-next-line vue/valid-v-slot -->
        <template v-slot:item.actions="{ item }">
          <div class="d-flex justify-center align-center ga-15">
            <div>
              <EditModal
                @new-item="handleEditProject($event, item.id)"
                model-icon="mdi-pencil-outline"
                :model-title="$t('modal.edit-project')"
                :model-name="$t('modal.modify-name-project')"
                :model-description="$t('modal.modify-description-project')"
                :name-to-be-edited="item.name"
                :description-to-be-edited="item.description ?? ''"
              />
            </div>
            <v-btn
              icon="mdi-delete-outline"
              class="icon"
              variant="text"
              @click="handleDeleteProject(item)"
            />
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>

  <!-- To add a new project -->

  <InputModal
    @new-item="handleAddNewProject($event)"
    :title="$t('modal.new-project')"
    :name="$t('modal.project-name')"
    :description="$t('modal.project-description')"
  />
</template>
