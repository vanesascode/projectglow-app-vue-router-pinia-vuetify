<template>
  <v-breadcrumbs :items="items" divider=""></v-breadcrumbs>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  name?: string;
  clientId?: string;
  clientName?: string;
  projectsPage?: boolean;
  projectId?: string;
  projectName?: string;
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
        href: '/#clients',
      },
      {
        title: props.clientId ? `${props.clientName} Projects` : '',
        disabled: props.projectsPage ? true : false,
        href: `/#clients/${props.clientId}/${props.clientName}/projects`,
      },
      {
        title: props.projectName ? `${props.projectName} Tasks` : '',
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
