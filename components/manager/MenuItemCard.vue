<script setup lang="ts">
import type { FoodListItemFromDb } from '@/types/food-list-item-from-db.interface'

defineProps<{
  item: FoodListItemFromDb
}>()
const emit = defineEmits(['deleteFromMenu'])
</script>
<template>
  <v-card class="h-100">
    <v-img :src="item?.images[0]" cover></v-img>
    <v-card-text>
      {{ item.name }}
    </v-card-text>
    <div class="actions-container">
      <v-btn variant="flat" rounded type="primary" size="small" @click="emit('deleteFromMenu', item._id)">
        <v-icon icon="mdi-chevron-down" style="font-size: 24px;"></v-icon>
      </v-btn>
    </div>
  </v-card>
</template>
<style scoped lang="scss">
.actions-container {
  top: 4px;
  right: 4px;
  position: absolute;
}
</style>