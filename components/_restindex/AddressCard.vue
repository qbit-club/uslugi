<script setup lang="ts">
import type { RestFromDb } from '~/types/rest-from-db.interface';
const props = defineProps<{
  rest: RestFromDb
}>()
</script>
<template>
  <div>
    <h3 class="mb-4 mt-4">
      Адрес и контакты
    </h3>
    <p>
      Адрес : {{ props.rest.location.name }}
    </p>
    <p>
      Расписание : <span v-html="props.rest.schedule"></span>
    </p>
  </div>

</template>
<style lang="scss" scoped></style>
