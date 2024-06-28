<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left"></th>
        <th class="text-left">Project</th>
        <th class="text-left">Task</th>
        <th class="text-left">Progress</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>My project</td>
        <td>My task 1</td>
        <td>50%</td>
      </tr>
    </tbody>
  </v-table>
  <InputModal />
</template>

<script lang="ts">
import InputModal from '@/modules/projects/components/ProjectsView/InputModal.vue'

export default {
  components: {
    InputModal
  }
}
</script>
