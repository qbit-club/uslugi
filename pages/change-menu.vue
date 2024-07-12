<script setup lang="ts">
const CATEGORIES = ["горячее", "закуски", "супы", "пасты"]

import type { FoodListItemFromDb } from "~/types/food-list-item-from-db.interface"
import type { RestFromDb } from "../types/rest-from-db.interface"

const route = useRoute()
const restStore = useRest()

let rest = ref<RestFromDb>()
let res = await restStore.getByAlias(String(route.query.alias))
rest.value = res.data.value

let currentFoodListItemId = ref("")
let form = ref({
  name: "",
  category: "",
})
let loading = ref(false)
async function submit() {
  // если надо будет - добавить _id меню, чтобы обновить его
  // в базе(серверная часть уже написана)
  loading.value = true
  let toSend
  if (currentFoodListItemId.value.length > 0) {
    toSend = {
      _id: currentFoodListItemId.value,
      ...form.value,
    }
  } else {
    toSend = form.value
  }
  let res = await restStore.changeFoodList(String(rest.value?._id), toSend)
  if (res.status.value == "success") {
    rest.value = res.data.value
    loading.value = false
  }
}
function startEditingFoodList(item: FoodListItemFromDb) {
  currentFoodListItemId.value = item._id
  Object.assign(form.value, item)
}
</script>
<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col :cols="10">
        <v-row>
          <v-col :cols="6">
            <div class="caption">Название</div>
            <v-text-field placeholder="Пирожное" variant="outlined" v-model="form.name"></v-text-field>
          </v-col>
          <v-col :cols="6">
            <div class="caption">Категория в меню</div>
            <v-select :items="CATEGORIES" placeholder="пасты" variant="outlined" v-model="form.category"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="12" class="d-flex justify-center">
            <v-btn size="large" @click="submit" :prepend-icon="currentFoodListItemId.length > 0 ? 'mdi-pencil' : ''" :loading="loading">
              отправить
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col :cols="10">
        <h2>Food list</h2>
        <v-row>
          <v-col :cols="4" v-for="item of rest?.foodList">
            <v-card>
              <v-card-text>
                {{ item }}
              </v-card-text>
              <v-card-actions>
                <v-btn variant="tonal" @click="startEditingFoodList(item)">
                  <v-icon icon="mdi-pencil"></v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped lang="scss">
.caption {
  font-size: 12px;
}
</style>
