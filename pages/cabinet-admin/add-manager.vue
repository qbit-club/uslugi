<script lang="ts" setup>
import type { Rest } from '~/types/rest.interface';
import type { User } from '~/types/user.interface';

const restStore = useRest()
const authStore = useAuth()
let { data } = await restStore.get()
let rest_ids = ref<any[]>([])
let rests_with_managers = ref<any[]>([])
let chosen_rest = ref("")
let manager_rest=ref("")
let user_email = ref("")
let dialog = ref(false)
let selected_manager = ref("")

async function setManager() {
  await authStore.setManager(user_email.value, chosen_rest.value)

  let managers: any[] = await restStore.getManagersOfRest(chosen_rest.value)
  managers = managers.map((user: User) => user.email)

  let index: Number = rests_with_managers.value!.findIndex((rest: any) => rest.alias == chosen_rest.value);
  rests_with_managers.value ? [index] = managers:[]
}

function showDialog(manager:string,rest_alias:string){
  console.log(rest_alias)
  dialog.value=true
  selected_manager.value = manager
  manager_rest.value=rest_alias
}

async function deleteManager(){
  await authStore.deleteManager(selected_manager.value,manager_rest.value)
  dialog.value=false
}

onMounted(async () => {
  for (let rest of data.value) {
    rest_ids?.value?.push({ name: rest.title, alias: rest.alias })

    
    let managers = await restStore.getManagersOfRest(rest.alias)
    // console.log(managers.data.value)
    managers = managers.data.value.map((user: User) => user.email)

    rests_with_managers?.value?.push({ name: rest.title, alias: rest.alias, managers: managers })
  }
})
</script>

<template>
  <v-row>
    <v-col :cols="12">
                <h3>Назначить менеджером</h3>
    </v-col>
    <v-col cols="4">
      <v-select label="Рестораны" :items="rest_ids" item-title="name" item-value="alias" v-model="chosen_rest"
        variant="outlined" density="compact">
      </v-select>
    </v-col>
    <v-col cols="8">
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
    <v-col cols="12" md="3" v-for="rest in rests_with_managers">
      <v-card class="pa-4">
        <v-card-title >{{ rest.name }}</v-card-title>
        <!-- <v-divider></v-divider> -->
        <div class="d-flex flex-column">
          <span v-for="manager in rest.managers" @click="showDialog(manager,rest.alias)">{{ manager }}</span>
        </div>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="dialog" width="auto">
        <v-card max-width="400"
    
            title="Удаляем?">
            <template v-slot:actions>
                <v-btn class="ms-auto" @click="dialog = false">Нет</v-btn>
                <v-btn class="ms-auto" @click="deleteManager()">Да</v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<style scoped></style>
