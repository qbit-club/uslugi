<script setup lang="ts">
import type { FoodListItemFromDb } from '@/types/food-list-item-from-db.interface'

const props = defineProps<{
  item: FoodListItemFromDb
  inMenu: boolean | undefined
}>()
const emit = defineEmits(['moveToMenu', 'deleteFromMenu'])

let isMenuItem = ref(false)

function toggleMenu() {
  isMenuItem.value ? emit('moveToMenu', props.item._id) : emit('deleteFromMenu', props.item._id)
}

watch(isMenuItem, () => {
  toggleMenu()
})
onMounted(() => {

  isMenuItem.value = props.inMenu
  // toggleMenu()
})

</script>
<template>

  <v-row class="d-flex align-center justify-space-between" :class="[isMenuItem ? 'in-menu' : 'out-menu']">
    <v-col class="d-flex align-center  cursor-pointer">

      <img :src="item?.images[0]" style="height: 50px;" aspect-ratio="1"></img>
      <div class="pa-4">
        {{ item.category }}
      <h4> {{ item.name }}</h4> 
      </div>
      <div>
      <h4 class="pa-4"> {{ item.price }} ₽</h4> 
      </div>


    </v-col>
    <v-col cols="12" md="4" class="pa-0">
      <div class="d-flex justify-center" :class="[isMenuItem ? 'in-menu' : 'out-menu']">

        <div class="d-flex align-center justify-center cursor-pointer">

          <div class="d-flex flex-column align-center pa-2 " @click="">
            <v-icon icon="mdi-pencil" size="x-large" />
            <div class="explanation text-center">редактировать</div>

          </div>

          <div class="d-flex flex-column align-center pa-2" @click="">
            <v-icon icon="mdi-trash-can-outline" size="x-large" />
            <div class="explanation text-center">удалить</div>

          </div>
          <div class="d-flex  align-center pa-2">
            <v-checkbox v-model="isMenuItem" hide-details class="pa-0"></v-checkbox>
            <div class="text-center text-uppercase" v-if="isMenuItem">в меню</div>

          </div>
        </div>
      </div>
    </v-col>
  </v-row>
  <v-divider></v-divider>

</template>
<style scoped lang="scss">
.in-menu {
  color: green;
}

.out-menu {
  opacity: 0.7;
}
</style>