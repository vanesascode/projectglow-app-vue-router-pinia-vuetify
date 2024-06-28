<template>
  <v-dialog max-width="500" v-model="isModalOpen">
    <v-card title="New Project">
      <v-form @submit.prevent>
        <v-text-field
          v-model="inputValue"
          label="Add a name to your new project"
          ref="inputRef"
        ></v-text-field>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <div>
          <v-btn type="submit" @click="submitValue">Submit</v-btn>
          <v-btn text="Close Dialog" @click="closeModal"></v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <FloatingButton @click="isModalOpen = true" />
</template>

<script setup lang="ts">
import FloatingButton from '@/modules/common/components/FloatingButton.vue';
import { ref } from 'vue';

const emits = defineEmits<{
  value: [text: string];
}>();

const inputValue = ref('');
const isModalOpen = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const submitValue = () => {
  if (!inputValue.value) {
    inputRef.value?.focus();
    return;
  }

  emits('value', inputValue.value.trim());

  inputValue.value = '';
  isModalOpen.value = false;
};

const closeModal = () => {
  inputValue.value = '';
  isModalOpen.value = false;
};
</script>
