<template>
  <v-breadcrumbs :items="items" divider=""></v-breadcrumbs>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  name?: string;
  id?: number;
  projectsPage?: boolean;
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
        title: 'Clients',
        disabled: false,
        href: '/clients',
      },
      {
        title: props.id ? 'Projects' : '',
        disabled: props.projectsPage ? true : false,
        href: `/clients/${props.id}/projects`,
      },
      {
        title: props.name ? props.name : '',
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
