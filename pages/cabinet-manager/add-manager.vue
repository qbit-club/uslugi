<script lang="ts" setup>
import { toast } from "vue3-toastify"
const restStore = useRest()
const authStore = useAuth()

let user = authStore.user
let rests = ref<any>()
let { managingRestObject } = storeToRefs(authStore)

let userEmail = ref("")


let dialog = ref(false)
let selected_manager = ref("")


async function setManager() {

  await authStore.setManager(userEmail.value, managingRestObject.value._id)
  await authStore.chooseManagingRest(managingRestObject.value._id)
  userEmail.value = ''
}

function showDialog(manager: string) {
  if (managingRestObject.value.managers.length > 1) {
    dialog.value = true
    selected_manager.value = manager
  } else {
    toast('Нельзя удалить единственного менеджера', {
      type: 'error',
      autoClose: false,
    })
  }
}
async function deleteManager() {

  await authStore.deleteManager(selected_manager.value, managingRestObject.value._id)
  await authStore.chooseManagingRest(managingRestObject.value._id)
  dialog.value = false

}


onMounted(async () => {
  let res = await restStore.getByIds(user?.managerIn)
  rests.value = res.data.value
})
</script>

<template>
  <v-container>
    <v-row class="justify-center pb-16">
      <v-col :cols="12" sm="10" class="pa-0">
        <v-text-field v-model="userEmail" placeholder="Электронная почта" type="email" variant="outlined"
          density="compact">
        </v-text-field>
      </v-col>
      <v-btn variant="flat" color="primary" @click="setManager()">Cделать менеджером</v-btn>
      <v-col cols="12">
        <v-chip variant="outlined" v-for="(manager) in managingRestObject.managers" :key="manager" class="ma-2"
          @click="showDialog(manager)">
          {{ manager }}
        </v-chip>
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

  </v-container>
</template>

<style scoped></style>
