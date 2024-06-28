<template>
  <v-fab icon="mdi-plus" @click="$emit('click')"></v-fab>
</template>

<script setup lang="ts">
defineEmits(['click']);
</script>

<style>
.v-btn {
  margin: 0;
  position: fixed;
  bottom: 50px;
  right: 50px;
  background-color: rgb(143, 43, 158);
}
</style>
