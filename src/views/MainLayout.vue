<script setup lang="ts">
import { useRouter } from 'vue-router';

const user = localStorage.getItem('user');
const router = useRouter();

const logout = () => {
  localStorage.removeItem('user');
  router.push('/login');
};
</script>

<template>
  <v-app class="rounded rounded-md">
    <v-app-bar title="PROJECTGLOW" scroll-behavior="hide">
      <template v-slot:prepend>
        <img src="@/assets/images/logo.png" alt="" height="38rem" class="ms-4" />
      </template>

      <template v-slot:append>
        <v-app-bar-title class="text-grey d-none d-sm-block text-subtitle-1 mr-10">
          {{ $t('navbar.welcome') }}{{ user }}</v-app-bar-title
        >

        <v-btn @click="logout" icon="mdi-logout" color="white"></v-btn>
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
