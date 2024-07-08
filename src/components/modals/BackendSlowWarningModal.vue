<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isModalOpen = ref(false);

onMounted(async () => {
  const hasShownBackendWarning = localStorage.getItem('hasShownBackendWarning');
  if (!hasShownBackendWarning) {
    setTimeout(() => {
      isModalOpen.value = true;
    }, 1000);

    localStorage.setItem('hasShownBackendWarning', 'true');
  }
});

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <v-dialog max-width="500" v-model="isModalOpen">
    <v-card>
      <v-card-text class="text-subtitle-1">
        <span class="text-red font-weight-bold"> {{ $t('backend-warning.patient') }}</span>
        {{ $t('backend-warning.reason') }}
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

