<script lang="ts" setup>
import type { Rest } from '~/types/rest.interface';
import type { Role } from '~/types/role.interface';

const restStore = useRest()
const authStore = useAuth()

let user = authStore.user
let rests = ref<any>()
let chosen_rest=ref("")
let user_email = ref("")

async function setManager(){
    await authStore.setManager(user_email.value,chosen_rest.value)
}


onMounted(async ()=>{
    let res = await restStore.getByIds(user?.managerIn)
    rests.value = res.data.value
})
</script>

<template>
  <v-row>
    <v-col cols="4">
      <v-select
        label="Рестораны"
        :items="rests"
        item-title="title"
        item-value="_id"
        v-model="chosen_rest"
         variant="outlined" density="compact"
      >
      </v-select>
    </v-col>
    <v-col cols="8">
      <v-text-field v-model="user_email" placeholder="Электронная почта" type="email"  variant="outlined" density="compact">
      </v-text-field>
    </v-col>
  </v-row>
  <v-btn variant="tonal" @click="setManager()">Cделать менеджером</v-btn>
</template>

<style scoped></style>
