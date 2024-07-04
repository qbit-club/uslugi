<script setup lang="ts">
const props = defineProps<{
    info?: Object
}>()
</script>
<template>
  <v-card title="Адрес" variant="outlined" class="w-100" height="450px" style="border-color:#8B4513">
    <v-card-text>
        Адрес : {{props.info.location.name}}<br>
        Расписание : <span v-html="props.info.schedule"></span>
    </v-card-text>
  </v-card>
</template>
<style lang="scss" scoped></style>
