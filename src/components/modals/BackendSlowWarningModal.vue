<script setup lang="ts">
import FloatingButton from '@/components/main/FloatingButton.vue';
import { onMounted, ref } from 'vue';

const isModalOpen = ref(false);

onMounted(() => {
  setTimeout(() => {
    isModalOpen.value = true;
  }, 1000);
});

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <v-dialog max-width="500" v-model="isModalOpen">
    <v-card>
      <v-card-text class="text-subtitle-1">
        The backend is slow to respond. It's located on a free onRender server.
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <div>
          <v-btn text="Ok" @click="closeModal"></v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.v-card-text::before {
  content: 'Please be patient: ';
  color: rgb(183, 62, 62);
  font-weight: bold;
}
</style>
