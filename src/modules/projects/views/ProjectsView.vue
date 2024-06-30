<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left"></th>
        <th class="text-left">PROJECT</th>
        <th class="text-left">TASKS</th>
        <th class="text-left">PROGRESS</th>
      </tr>
    </thead>

    <tbody>
      <tr
        class="projects-row"
        v-for="(project, index) in projectsStore.projectsWithCompletition"
        :key="project.id"
        @click="$router.push(`/project/${project.id}`)"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ project.name }}</td>
        <td>{{ project.tasks.length }}</td>
        <td>
          <v-progress-linear :model-value="project.progress" height="25" color="rgb(143, 43, 158)">
            <strong v-if="project.tasks && project.tasks.length > 0">
              {{ project.progress ? project.progress : '0' }}%</strong
            >
            <strong v-else>Add tasks</strong>
          </v-progress-linear>
        </td>
      </tr>
    </tbody>
  </v-table>
  <InputModal
    @value="projectsStore.addProject"
    title="New Project"
    label="Add a name to your project"
  />
</template>

<script setup lang="ts">
import InputModal from '@/modules/projects/components/ProjectsView/InputModal.vue';
import { useProjectsStore } from '@/modules/projects/store/projects.store';

const projectsStore = useProjectsStore();
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.projects-row {
  cursor: pointer;
  &:hover {
    color: $primary-color;
  }
}
</style>
