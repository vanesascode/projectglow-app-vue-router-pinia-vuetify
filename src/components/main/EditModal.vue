<script setup lang="ts">
import { onUpdated, ref } from 'vue';

interface Props {
  modelTitle: string;
  modelName: string;
  modelDescription: string;
  modelIcon: string;
  nameToBeEdited: string;
  descriptionToBeEdited: string;
}

const props = defineProps<Props>();

const nameValue = ref(props.nameToBeEdited);
const descriptionValue = ref(props.descriptionToBeEdited);
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
    <v-card :title="modelTitle">
      <v-form @submit.prevent>
        <v-text-field
          id="nameInput"
          v-model="nameValue"
          :label="modelName"
          ref="inputRef"
        ></v-text-field>
        <v-text-field
          id="DescriptionInput"
          v-model="descriptionValue"
          :label="modelDescription"
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

  <v-fab
    class="hover-color"
    :icon="modelIcon"
    variant="text"
    @click="
      isModalOpen = true;
      focusInput();
    "
  ></v-fab>
</template>

<style lang="scss">
.hover-color {
  &:hover {
    color: #299145;
  }
}
</style>
