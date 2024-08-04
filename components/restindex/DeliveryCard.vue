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
          Доставка
        </h3>
        <p>
          Доставка за 1000000000000000руб
        </p>

      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped></style>
