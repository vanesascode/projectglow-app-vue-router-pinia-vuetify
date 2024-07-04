<template>
  <v-app class="rounded rounded-md">
    <RouterLink to="/#/projects" class="text-decoration-none">
      <v-app-bar title="PROJECTS MANAGEMENT" class="project-title"></v-app-bar>
    </RouterLink>
    <v-main class="" style="min-height: 300px">
      <RouterView />
    </v-main>
  </v-app>
</template>

<style lang="scss">
@import '@/assets/styles/main.scss';

.project-title {
  color: white;
  font-size: 1.15rem;
  &:hover {
    color: $primary-color;
  }
}
</style>
