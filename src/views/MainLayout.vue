<script setup lang="ts">
import { useUserStore } from '@/stores';

const userStore = useUserStore();
</script>

<template>
  <v-app class="rounded rounded-md">
    <v-app-bar title="PROJECTGLOW" scroll-behavior="hide">
      <template v-slot:prepend>
        <img src="https://i.postimg.cc/d3Q5mhbJ/logo.png" alt="" height="40rem" class="ms-2" />
      </template>

      <template v-slot:append>
        <v-app-bar-title class="text-grey d-none d-sm-block text-subtitle-1 mr-10">
          Welcome back, {{ userStore.userName }}</v-app-bar-title
        >
        <RouterLink to="/login">
          <v-btn icon="mdi-logout" color="white"></v-btn>
        </RouterLink>
      </template>
    </v-app-bar>
    <div class="spacer"></div>
    <v-main class="" style="min-height: 300px">
      <RouterView />
    </v-main>
  </v-app>
</template>

<style lang="scss">
.spacer {
  height: 1.5rem;
}
</style>
