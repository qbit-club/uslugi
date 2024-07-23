<script setup lang="ts">
import type { RestFromDb } from '@/types/rest-from-db.interface'
let restStore = useRest()

let rest = ref<RestFromDb>()
let res = await restStore.getByAlias('morkovka')
rest.value = res.data.value

let menu = computed(() => {
  if (!rest.value?.menu) return []

  let result = []
  for (let menuItem of rest.value.menu) {
    for (let foodListItem of rest.value.foodList) {
      if (foodListItem._id == menuItem) {
        result.push(foodListItem)
        break
      }
    }
  }
  return result
})
async function moveToMenu(_id: string) {
  let res = await restStore.moveFoodItemToMenu(String(rest.value?._id), _id)
  if (res.status.value == 'success') {
    rest.value = res.data.value
  }
}
async function deleteFromMenu(menuItemId: string) {
  let res = await restStore.deleteFromMenu(menuItemId, String(rest.value?._id))
  if (res.status.value == 'success') {
    rest.value = res.data.value
  }
}
</script>
<template>
  <v-row>
    <v-col cols="12">
      <h3>Меню</h3>
    </v-col>
    <TransitionGroup name="fade" v-if="menu.length > 0">
      <v-col cols="12" md="4" lg="3" xl="2" v-for="item of menu" :key="item._id">
        <v-card class="h-100">
          <v-img :src="item?.images[0]" cover></v-img>
          <v-card-text>
            {{ item.name }}
          </v-card-text>
          <div class="actions-container">
            <v-btn variant="flat" rounded type="primary" size="small" @click="deleteFromMenu(item._id)">
              <v-icon icon="mdi-chevron-down" style="font-size: 24px;"></v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </TransitionGroup>
    <v-col v-else cols="12">
      Пусто
    </v-col>
    <v-col cols="12">
      <h3>Список блюд</h3>
    </v-col>
    <v-col v-if="Number(rest?.foodList?.length) > 0" cols="12" md="4" lg="3" xl="2" v-for="item of rest?.foodList">
      <v-card class="h-100">
        <v-img :src="item?.images[0]" cover></v-img>
        <v-card-text>
          {{ item.name }}
        </v-card-text>
        <div class="actions-container">
          <v-btn variant="flat" rounded type="primary" size="small" @click="moveToMenu(item._id)">
            <v-icon icon="mdi-chevron-up" style="font-size: 24px;"></v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-col>
    <v-col v-else cols="12">
      Пусто
    </v-col>
  </v-row>
</template>
<style scoped lang="scss">
.actions-container {
  top: 4px;
  right: 4px;
  position: absolute;
}
</style>