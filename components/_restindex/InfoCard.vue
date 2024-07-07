<script setup lang="ts">
const props = defineProps<{
    info?: Object
}>()

</script>
<template>
  <div>
    <h3 class="mb-4 mt-4">
      Информация
    </h3>
    <p>
      Описание: <span v-html="props.info.description"></span>
    </p>
   
  </div>
</template>
<style lang="scss" scoped></style>
