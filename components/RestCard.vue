<script setup lang="ts">
import type { Rest } from '../types/rest.interface';

defineProps<{
  rest: Rest
}>()
</script>
<template>
  <div class="card">
    <v-parallax height="200" src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"></v-parallax>
    <div class="content">
      <h3 class="text-center">
        {{ rest.title }}
      </h3>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card {
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 4px;
  height: 100%;
  .content {
    padding: 6px 12px;
  }
}
</style>