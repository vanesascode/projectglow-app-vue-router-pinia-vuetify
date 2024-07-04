<script setup lang="ts">
import FloatingButton from '@/components/main/FloatingButton.vue';
import { onUpdated, ref } from 'vue';

interface Props {
  title: string;
  name: string;
  description: string;
}

defineProps<Props>();

const nameValue = ref('');
const descriptionValue = ref('');
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

const emits = defineEmits<{
  newClient: [{ name: string; description: string }];
}>();

const submitValue = () => {
  // console.log(nameValue.value, descriptionValue.value);
  if (!nameValue.value) {
    inputRef.value?.focus();
    return;
  }

  emits('newClient', { name: nameValue.value.trim(), description: descriptionValue.value.trim() });

  nameValue.value = '';
  descriptionValue.value = '';
  isModalOpen.value = false;
};

const closeModal = () => {
  nameValue.value = '';
  descriptionValue.value = '';
  isModalOpen.value = false;
};
</script>

<template>
  <v-dialog max-width="500" v-model="isModalOpen">
    <v-card :title="title">
      <v-form @submit.prevent>
        <v-text-field
          id="nameInput"
          v-model="nameValue"
          :label="name"
          ref="inputRef"
        ></v-text-field>
        <v-text-field
          id="DescriptionInput"
          v-model="descriptionValue"
          :label="description"
        ></v-text-field>

        <v-card-actions>
          <v-spacer></v-spacer>
          <div>
            <v-btn type="submit" @click="submitValue">Save</v-btn>
            <v-btn text="Close" @click="closeModal"></v-btn>
          </div>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>

  <FloatingButton
    @click="
      isModalOpen = true;
      focusInput();
    "
    icon="mdi-plus"
    color="#299145"
  />
</template>
