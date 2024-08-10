<script setup lang="ts">
useHead({
  title: 'Глазов - есть!'
})
import type { RestFromDb } from '~/types/rest-from-db.interface';
const props = defineProps<{
  rest: RestFromDb
}>()
</script>
<template>
  <v-container>
    <v-row>
      <v-col >
      
          <p>
            Адрес : {{ props.rest.location.name }}
          </p>
         


      </v-col>
    </v-row>
  </v-container>


</template>
<style lang="scss" scoped></style>
