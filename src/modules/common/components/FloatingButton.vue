<template>
  <v-fab :icon="icon" @click="$emit('click')" class="floating-button"></v-fab>
</template>

<script setup lang="ts">
defineProps(['icon', 'color']);
defineEmits(['click']);
</script>

<style lang="scss">
.floating-button {
  margin: 0;
  position: fixed;
  bottom: 50px;
  right: 80px;

  button {
    background-color: v-bind(color);
  }
}
</style>
