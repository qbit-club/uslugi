<script lang="ts" setup>
const restStore = useRest()
const authStore = useAuth()

let user = authStore.user
let rests = ref<any>()
let userEmail = ref("")

async function setManager() {
  if (user?.managingRest) {
    await authStore.setManager(userEmail.value, String(user?.managingRest))
  }
}

onMounted(async () => {
  let res = await restStore.getByIds(user?.managerIn)
  rests.value = res.data.value
})
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        v-model="userEmail"
        placeholder="Электронная почта"
        type="email"
        variant="outlined"
        density="compact"
      >
      </v-text-field>
    </v-col>
  </v-row>
  <v-btn variant="tonal" @click="setManager()">Cделать менеджером</v-btn>
</template>

<style scoped></style>
