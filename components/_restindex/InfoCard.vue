<script setup lang="ts">
const props = defineProps<{
    info?: Object
}>()
console.log(props.info)
</script>
<template>
  <v-card title="Общая информация" variant="outlined" class="w-100" height="450px" style="border-color: #1E90FF;">
    <v-card-text>
        Описание: <span v-html="props.info.description"></span>
    </v-card-text>
  </v-card>
</template>
<style lang="scss" scoped></style>
