<script setup lang="ts">
const restStore = useRest()
const userStore = useAuth()

// с его помощью мы определяем, куда добавить новый email
const { mailType } = defineProps<{
  mailType: string,
}>()

let { managingRestObject } = storeToRefs(userStore)

let email = ref<string>('')
let emails = computed(() => {
  // такая магия нужна из-за того, что нельзя получить значение 
  // ключа у объекта, если ключ является обычной строкой
  let mailTo = managingRestObject.value?.mailTo ?? {}
  const key = mailType as keyof typeof mailTo;

  return mailTo[key]
})
let dialog = ref<boolean>(false)
let emailToDelete: string = '';
function showDialog(em: string) {
  emailToDelete = em;
  dialog.value = true;
}

async function deleteEmail() {
  let res = await restStore.deleteEmail(emailToDelete, mailType)
  if (res.status.value == "success") {
    dialog.value = false;
  }
}

let loading = ref(false)
async function submit() {
  loading.value = true
  let res = await restStore.addEmail(email.value, mailType)
  loading.value = false
}
</script>
<template>
  <v-container>
    <v-row class="justify-center pb-16">
      <v-col :cols="12" sm="10" class="pa-0">

        <h3 class="text-center">
          <slot name="title"></slot>
        </h3>
        <div class="caption text-center">
          <slot name="caption"></slot>
        </div>

        <v-col cols="12">
          <v-text-field placeholder="manager-email@gmail.com" variant="outlined" density="compact" :hide-details="true"
            v-model="email"></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn variant="flat" color="primary" class="ml-4" @click="submit" :loading="loading">
            добавить
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-chip variant="outlined" v-for="(em, index) in emails" :key="index" class="ma-2" @click="showDialog(em)">
            {{ em }}
          </v-chip>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog" width="auto">
    <v-card max-width="400" title="Удаляем?">
      <template v-slot:actions>
        <v-btn class="ms-auto" @click="dialog = false">Нет</v-btn>
        <v-btn class="ms-auto" @click="deleteEmail">Да</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
<style scoped lang="scss">
.caption {
  font-size: clamp(0.625rem, 0.5256rem + 0.2841vw, 0.75rem);
  font-weight: 300;
}
</style>