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
      
        <p>
          <span v-html="rest.description"></span>
        </p>

      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped></style>
