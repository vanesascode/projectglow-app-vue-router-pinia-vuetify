<template>
  <section>
    <BreadCrumbs :name="project?.name ?? 'Project does not exist'" />
  </section>
  <section>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Finished</th>
          <th class="text-left">Task</th>
          <th class="text-left">Completed at</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in project?.tasks" :key="task.id">
          <td>
            <input
              type="checkbox"
              :checked="!!task.completedAt"
              class="checkbox"
              @change="() => projectsStore.toggleTask(project?.id, task.id)"
            />
          </td>
          <td>{{ task.name }}</td>
          <td>{{ task.completedAt }}</td>
        </tr>
      </tbody>
    </v-table>
  </section>
  <InputModal
    @value="(value) => projectsStore.addTask(project?.id, value)"
    title="New Task"
    label="Add a name to your task"
  />
</template>

<script setup lang="ts">
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useProjectsStore } from '@/modules/projects/store/projects.store';
import type { Project } from '@/modules/projects/interfaces/project.interface';
import { ref, watch } from 'vue';
import InputModal from '@/modules/projects/components/ProjectsView/InputModal.vue';

import { useRouter } from 'vue-router';

interface Props {
  id: string;
}

const router = useRouter();
const props = defineProps<Props>();
const projectsStore = useProjectsStore();
const project = ref<Project>();

watch(
  () => props.id,
  () => {
    project.value = projectsStore.projectList.find((project) => project.id === props.id);
    if (project.value === undefined) {
      router.replace('/projects');
    }
  },
  {
    immediate: true,
  },
);
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';

.checkbox {
  width: 20px;
  height: 20px;
  accent-color: $primary-color;
}
</style>
