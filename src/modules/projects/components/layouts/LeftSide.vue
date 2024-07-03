<template>
  <v-navigation-drawer>
    <div v-if="!projectsStore.noProjects">
      <v-list v-for="project in projectsStore.projectList" :key="project.id">
        <RouterLink :to="`/project/${project.id}`" class="text-decoration-none">
          <v-list-item link class="individual-project-link">
            {{ project.name }}</v-list-item
          ></RouterLink
        >
        <v-list v-for="task in project.tasks" :key="task.id">
          <v-list-item link :subtitle="task.name"></v-list-item>
        </v-list>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useProjectsStore } from '@/stores/projects.store';

const projectsStore = useProjectsStore();
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.individual-project-link {
  color: $primary-color;
  font-weight: 600;
}
</style>
