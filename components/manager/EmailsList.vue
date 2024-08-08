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

let loading = ref(false)
async function submit() {
  loading.value = true
  let res = await restStore.addEmail(email.value, mailType)
  loading.value = false
}
</script>
<template>
  <v-row>
    <v-col cols="12">
      <h3>
        <slot name="title"></slot>
      </h3>
      <div class="caption">
        <slot name="caption"></slot>
      </div>
    </v-col>
    <v-col cols="12" md="6" class="d-flex align-center">
      <v-text-field placeholder="manager-email@gmail.com" variant="outlined" density="compact" :hide-details="true"
        v-model="email"></v-text-field>
      <v-btn variant="tonal" class="ml-4" @click="submit" :loading="loading">
        добавить
      </v-btn>
    </v-col>
    <v-col cols="12">
      {{ emails }}
    </v-col>
  </v-row>
</template>
<style scoped lang="scss">
.caption {
  font-size: clamp(0.625rem, 0.5256rem + 0.2841vw, 0.75rem);
  font-weight: 300;
}
</style>