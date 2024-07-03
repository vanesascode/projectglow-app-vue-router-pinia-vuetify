<script setup lang="ts">
import { ref } from 'vue';

import { useSearchWithTimeout } from '@/use';

interface DataTableHeader {
  text: string;
  value: string;
  class?: string;
  sortable?: boolean;
  width?: string;
}

export interface Props {
  loading?: boolean;
  headers: Array<DataTableHeader>;
  data: Record<string, unknown>[];
  displayInCardMode?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  data: () => [],
  displayInCardMode: true,
});

const search = ref('');

// get the return of the useSearchWithTimeout with the emitSearchItem function as parameter
// This will delay the action of the emitSearchItem function:
const { searchItem } = useSearchWithTimeout(emitSearchItem);

// the definition of the emit:
const emit = defineEmits<{
  (event: 'searchItem', search: string): void;
}>();

// the function that actually emits:
function emitSearchItem() {
  emit('searchItem', search.value);
}
</script>

<template>
  <v-sheet
    rounded
    :elevation="props.displayInCardMode ? '1' : '0'"
    :class="props.displayInCardMode ? 'pa-2' : ''"
  >
    <v-row dense>
      <v-col cols="12">
        <!-- <v-text-field
          v-model="search"
          label="Clients List Label"
          :loading="props.loading"
          variant="underlined"
          density="compact"
          hide-details
          append-inner-icon="mdi-magnify"
          @keyup="searchItem()"
        /> -->
      </v-col>
      <v-col cols="12">
        <v-table>
          <!-- TITLES OF TABLE -->

          <thead>
            <tr class="bg-primary">
              <th
                v-for="header in props.headers"
                :key="header.value"
                :class="header.class"
                :style="`width: ${header.width};`"
              >
                {{ header.text }}
              </th>
            </tr>
          </thead>

          <!-- LOADING -->

          <!-- <tbody v-if="props.loading">
            <tr>
              <td :colspan="props.headers.length" class="pa-0" style="height: 0px">
                <v-progress-linear indeterminate color="accent" />
              </td>
            </tr>
          </tbody> -->

          <!-- IF THERE IS NO DATA -->

          <!-- <tbody v-else-if="!props.loading && props.data.length === 0">
            <tr>
              <td :colspan="props.headers.length" class="text-center bg-grey-lighten-3">
                {{ $t('common.noData') }}
              </td>
            </tr>
          </tbody> -->

          <!-- IF THERE IS DATA -->

          <!-- <tbody v-else-if="!props.loading && props.data.length !== 0">
            <tr v-for="(item, index) in props.data" :key="index">
              <td v-for="(header, headerIndex) in props.headers" :key="`${headerIndex}-${index}`">
                <span v-if="$slots[header.value] === undefined">
                  {{ item[header.value] ?? '' }}
                </span>

                <slot :name="header.value" :item="{ ...item }" />
              </td>
            </tr>
          </tbody> -->
        </v-table>
      </v-col>
    </v-row>
  </v-sheet>
</template>
