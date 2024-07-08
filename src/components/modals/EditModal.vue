<script setup lang="ts">
import { onUpdated, ref } from 'vue';
import { useI18n } from 'vue-i18n'


const { t } = useI18n()

interface Props {
  modelTitle: string;
  modelName: string;
  modelDescription: string;
  modelIcon: string;
  nameToBeEdited: string;
  descriptionToBeEdited: string;
  isEnabledToBeEdited?: boolean;
  clientsModal?: boolean;
}

const props = defineProps<Props>();

const isEnabled = ref(props.isEnabledToBeEdited);
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
  newItem: [{ name: string; description: string; isEnabled: boolean }];
}>();

const submitValue = () => {
  if (!nameValue.value) {
    inputRef.value?.focus();
    return;
  }

  emits('newItem', {
    name: nameValue.value.trim(),
    description: descriptionValue.value.trim(),
    isEnabled: isEnabled.value,
  });

  isModalOpen.value = false;
};

const closeModal = () => {
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

        <div v-if="clientsModal" class="d-flex ga-3 align-center">
          <input
            type="checkbox"
            id="active"
            value="activation-checkbox"
            class="checkbox"
            :checked="isEnabledToBeEdited"
            @change="isEnabled ? !isEnabled : isEnabled"
            v-model="isEnabled"
          />
          <label for="active">{{ $t('modal.active-client') }}</label>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <div>
            <v-btn type="submit" @click="submitValue">{{ $t('modal.save') }}</v-btn>
            <v-btn type="text" @click="closeModal">{{ $t('modal.close') }}</v-btn>
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
@import '@/assets/styles/main.scss';

.hover-color {
  &:hover {
    color: $primary-color;
  }
}

.checkbox {
  width: 20px;
  height: 20px;
  accent-color: $primary-color;
  margin-left: 1rem;
}
</style>
