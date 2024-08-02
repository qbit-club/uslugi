<script setup lang="ts">
import type { FoodListItemFromDb } from '@/types/food-list-item-from-db.interface'

defineProps<{
  item: FoodListItemFromDb
}>()
const emit = defineEmits(['deleteFromMenu'])


</script>
<template>
  <div class="d-flex">
    <v-img :src="item?.images[0]"  max-height="50" aspect-ratio="1"></v-img>
    <h5>
      {{ item.category }}<br>
      {{ item.name }} <br>
      {{ item.price }} ₽
    </h5>

  
  
      <v-btn variant="flat" rounded type="primary" size="small" @click="emit('deleteFromMenu', item._id)">
        <v-icon icon="mdi-chevron-down" style="font-size: 24px;"></v-icon>
      </v-btn>


  </div>
</template>
<style scoped lang="scss">

</style>