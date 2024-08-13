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
      <v-col>
        <v-card class="pa-8" width="fit-content" min-width="300">
          <a :href="`https://yandex.ru/maps/?text=${props.rest.location.name}`">
            <p>
            Адрес : {{ props.rest.location.name }}
          </p>
          </a>
         
        </v-card>
      </v-col>
    </v-row>
  </v-container>


</template>
<style lang="scss" scoped></style>
