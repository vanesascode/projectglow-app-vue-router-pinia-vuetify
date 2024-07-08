<script setup lang="ts">
import FloatingButton from '@/components/main/FloatingButton.vue';
import { onUpdated, ref } from 'vue';
import { useI18n } from 'vue-i18n'


const { t } = useI18n()

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
  newItem: [{ name: string; description: string }];
}>();

const submitValue = () => {
  if (!nameValue.value) {
    inputRef.value?.focus();
    return;
  }

  emits('newItem', { name: nameValue.value.trim(), description: descriptionValue.value.trim() });

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
      <v-form @submit.prevent="submitValue">
        <v-text-field
          id="nameInput"
          v-model="nameValue"
          :label="name"
          ref="inputRef"
          clearable
        ></v-text-field>
        <v-text-field
          id="DescriptionInput"
          v-model="descriptionValue"
          :label="description"
          clearable
        ></v-text-field>

        <v-card-actions>
          <v-spacer></v-spacer>
          <div>
            <v-btn type="submit">{{ $t('modal.save') }}</v-btn>
            <v-btn type="text" @click="closeModal">{{ $t('modal.close') }}</v-btn>
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
