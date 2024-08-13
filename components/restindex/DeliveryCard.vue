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
        <v-card class="pa-8" width="fit-content" min-width="300">
          <p>
           <span v-html="rest.schedule"></span>
          </p>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped></style>
