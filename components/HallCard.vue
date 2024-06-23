<script setup lang="ts">
import type { Hall } from '../types/hall.interface';

defineProps<{
  hall: Hall
}>()
</script>
<template>
  <div class="card">
    {{ hall }}
  </div>
</template>
<style lang="scss" scoped>
.card {
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  height: 100%;
}
</style>