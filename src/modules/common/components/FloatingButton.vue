<template>
  <v-fab icon="mdi-plus" @click="$emit('click')" class="floating-button"></v-fab>
</template>

<script setup lang="ts">
defineEmits(['click']);
</script>

<style lang="scss">
.floating-button {
  margin: 0;
  position: fixed;
  bottom: 50px;
  right: 80px;

  button {
    background-color: rgb(143, 43, 158);
  }
}
</style>
