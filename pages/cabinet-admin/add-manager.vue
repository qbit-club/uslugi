<script lang="ts" setup>
import type { Rest } from '~/types/rest.interface';
import type { User } from '~/types/user.interface';

const restStore = useRest()
const authStore = useAuth()

let rests = ref<any>()
let chosen_rest = ref("")



let user_email = ref("")
let dialog = ref(false)
let selected_manager = ref("")
let restId = ref("")

async function setManager() {
  await authStore.setManager(user_email.value, chosen_rest.value)
  chosen_rest.value = ''
  user_email.value = ''
  getRestsName()
}


function showDialog(manager: string, rest_id: string) {

  dialog.value = true
  selected_manager.value = manager
  restId.value = rest_id
}

async function deleteManager() {

  await authStore.deleteManager(selected_manager.value, restId.value)
  getRestsName()
  dialog.value = false
}
let getRestsName = async () => {
  let restResponse = await restStore.getRestsName()
  rests.value = restResponse.data.value.map((item: any) => {
    return {
      value: item._id,
      title: item.title,
      managers: item.managers
    };
  });
}

onMounted(async () => {
  await getRestsName()
})
</script>

<template>
  <v-row>
    <v-col :cols="12">
      <h3>Назначить менеджером</h3>
    </v-col>
    <v-col cols="12" md="4">
      <v-select label="Рестораны" :items="rests" v-model="chosen_rest" variant="outlined" density="compact">
      </v-select>
    </v-col>
    <v-col cols="12" md="8">
      <v-text-field v-model="user_email" placeholder="Электронная почта" type="email" variant="outlined"
        density="compact">
      </v-text-field>
    </v-col>
  </v-row>
  <v-btn variant="tonal" @click="setManager()" class="mb-16">Cделать менеджером</v-btn>

  <v-row>
    <v-col :cols="12">
      <h3>Управление менеджерами</h3>
    </v-col>
    <v-col cols="12" md="3" v-for="rest in rests">
      <v-card class="pa-4" >
        <h4>{{ rest.title }}</h4>
        <!-- <v-divider></v-divider> -->
        <div class="d-flex flex-column">
          <span v-for="manager in rest.managers" @click="showDialog(manager, rest.value)">{{ manager }}</span>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="dialog" width="auto">
    <v-card max-width="400" title="Удаляем?">
      <template v-slot:actions>
        <v-btn class="ms-auto" @click="dialog = false">Нет</v-btn>
        <v-btn class="ms-auto" @click="deleteManager()">Да</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
