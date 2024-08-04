<script setup lang="ts">
import type { RestFromDb } from '~/types/rest-from-db.interface';

defineProps<{
  rest: RestFromDb
}>()

</script>
<template>
  <v-container>
    <v-row>
      <v-col>
        <h3 class="mb-4 mt-4">
          Информация
        </h3>
        <p>
          Описание: <span v-html="rest.description"></span>
        </p>

      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped></style>
