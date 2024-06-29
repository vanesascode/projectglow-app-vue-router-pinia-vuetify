<template>
  <v-breadcrumbs :items="items"></v-breadcrumbs>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  name: string;
}

const props = defineProps<Props>();

interface BreadcrumbItem {
  title: string;
  disabled: boolean;
  href: string;
}

const items = ref<BreadcrumbItem[]>([]);

watch(
  () => props.name,
  () => {
    items.value = [
      {
        title: 'Projects',
        disabled: false,
        href: '/projects',
      },
      {
        title: props.name,
        disabled: true,
        href: '',
      },
    ];
  },
  {
    immediate: true,
  },
);
</script>
