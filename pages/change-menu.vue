<script setup lang="ts">
const CATEGORIES = ['горячее', 'закуски', 'супы', 'пасты']

import type { RestFromDb } from '../types/rest-from-db.interface'

const route = useRoute()
const restStore = useRest()

let rest = ref<RestFromDb>()
let res = await restStore.getByAlias(String(route.query.alias))
rest.value = res.data.value

let form = ref({
  name: '',
  category: '',
})

async function submit() {
  // если надо будет - добавить _id меню, чтобы обновить его 
  // в базе(серверная часть уже написана)
  let toSend = form.value
  let res = await restStore.changeFoodList(String(rest.value?._id), toSend)
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
            <v-btn size="large" @click="submit">отправить</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col :cols="10">
        {{ rest }}
        <h1>
          все компоненты меню, которые можно отредактировать и спрятать
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped lang="scss">
.caption {
  font-size: 12px;
}
</style>