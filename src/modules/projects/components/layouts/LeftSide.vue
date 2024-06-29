<template>
  <v-navigation-drawer>
    <div class="project-general-link-wrapper">
      <RouterLink to="/#/projects" class="text-decoration-none">
        <v-list-item class="project-general-link">PROJECTS</v-list-item>
      </RouterLink>

      <v-list-item
        subtitle="There are no projects yet"
        v-if="projectsStore.noProjects"
      ></v-list-item>
    </div>

    <v-divider></v-divider>

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
import { useProjectsStore } from '@/modules/projects/store/projects.store';

const projectsStore = useProjectsStore();
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';

.project-general-link-wrapper {
  padding: 0.75rem;
  padding-left: 1.25rem;
  cursor: pointer;
  text-decoration: none !important;
  &:hover {
    color: $primary-color;
  }
  .project-general-link {
    color: white;
    font-size: 1.15rem;
    &:hover {
      color: $primary-color;
    }
  }
}

.individual-project-link {
  color: $primary-color;
  font-weight: 600;
}
</style>
