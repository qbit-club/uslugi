<script setup lang="ts">
let filters = ref({
  title: '',

})
</script>
<template>
  <div class="card">
    <b>Название</b>
    <v-text-field placeholder="Кубит.Пиво" v-model="filters.title" density="compact" class="w-100" hide-details />
  </div>
</template>
<style lang="scss" scoped>
.card {
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 12px;
  font-size: 14px;

  position: fixed;
  top: 76px;
  width: 400px;
  z-index: 100;
}
</style>