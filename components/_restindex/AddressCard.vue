<script setup lang="ts">
import type { RestFromDb } from '~/types/rest-from-db.interface';
const props = defineProps<{
  info: RestFromDb
}>()
</script>
<template>
  <div>
    <h3 class="mb-4 mt-4">
      Адрес и контакты
    </h3>
    <p>
      Адрес : {{ props.info.location.name }}
    </p>
    <p>
      Расписание : <span v-html="props.info.schedule"></span>
    </p>
  </div>

</template>
<style lang="scss" scoped></style>
