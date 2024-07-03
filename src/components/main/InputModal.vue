<template>
  <v-dialog max-width="500" v-model="isModalOpen">
    <v-card :title="title">
      <v-form @submit.prevent>
        <v-text-field
          id="input"
          v-model="inputValue"
          :label="label"
          ref="inputRef"
          @keydown.enter="submitValue"
        ></v-text-field>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <div>
          <v-btn type="submit" @click="submitValue">Save</v-btn>
          <v-btn text="Close" @click="closeModal"></v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <FloatingButton
    @click="
      isModalOpen = true;
      focusInput();
    "
    icon="mdi-plus"
    color="rgb(143, 43, 158)"
  />
</template>

<script setup lang="ts">
import FloatingButton from '@/components/main/FloatingButton.vue';
import { onUpdated, ref } from 'vue';

interface Props {
  title: string;
  label: string;
}

defineProps<Props>();

const emits = defineEmits<{
  value: [text: string];
}>();

const inputValue = ref('');
const isModalOpen = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

const focusInput = () => {
  inputRef.value?.focus();
};

onUpdated(() => {
  if (isModalOpen.value === true) {
    inputRef.value?.focus();
  }
});

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
