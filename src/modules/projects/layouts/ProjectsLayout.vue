<template>
  <v-app class="rounded rounded-md">
    <v-app-bar title="Notion"></v-app-bar>

    <LeftSide />
    <v-main class="" style="min-height: 300px">
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import LeftSide from '@/modules/projects/components/layouts/LeftSide.vue'
</script>
