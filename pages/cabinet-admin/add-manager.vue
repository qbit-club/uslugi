<script lang="ts" setup>
import type { Rest } from '~/types/rest.interface';
import type { User } from '~/types/user.interface';

const restStore = useRest()
const authStore = useAuth()
let { data } = await restStore.get()
let rest_ids = ref()
let rests_with_managers = ref<any[]>()
let chosen_rest = ref<any>("")
let user_email = ref("")

async function setManager() {
  await authStore.setManager(user_email.value, chosen_rest.value)

  let managers: any[] = await restStore.getManagersOfRest(chosen_rest.value)
  managers = managers.map((user: User) => user.email)

  let index: Number = rests_with_managers.value!.findIndex((rest: any) => rest.alias == chosen_rest.value);
  rests_with_managers.value ? [index] = managers:[]
}

onMounted(async () => {
  for (let rest of data.value) {
    rest_ids?.value?.push({ name: rest.title, alias: rest.alias })

    let managers = await restStore.getManagersOfRest(rest.alias)
    // console.log(managers.data)
    // managers.data = managers.data.map((user: User) => user.email)

    rests_with_managers?.value?.push({ name: rest.title, managers: managers })
  }
})
</script>

<template>
  <h3>Назначить менеджером</h3>
  <v-row>
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
  <v-btn variant="tonal" @click="setManager()">Cделать менеджером</v-btn>

  <h3>Управление менеджерами</h3>
  <!-- <v-row>
    <v-col cols="12" md="3" v-for="rest in data">

    </v-col>
  </v-row> -->
</template>

<style scoped></style>
