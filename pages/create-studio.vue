<script setup lang="ts">
import { useField, useForm } from "vee-validate"
import gsap from "gsap"

const { meta, handleSubmit, setValues, validate } = useForm({
  initialValues: {
    title: "",
  },
  validationSchema: {
    title(value: string) {
      if (value?.trim().length < 4) return "слишком короткий заголовок"
      if (value?.length > 32) return "слишком длинный заголовок"

      return true
    },
  },
})

let title = useField<string>("title")

let loading = ref<boolean>(false)

const TITLES_LIST = ["парикмахерскую", "тату-салон", "студию красоты", "салон массажа", "ноготочки девачки"]
let intervalFunctionId: any
let currentTitleIndex = 0
function setTitle() {
  gsap.to("#title", {
    text: "Создать " + TITLES_LIST[currentTitleIndex],
    duration: 1,
  })
  if (currentTitleIndex == TITLES_LIST.length - 1) {
    currentTitleIndex = 0
    return
  }
  currentTitleIndex += 1
}

async function submit() {
  
}

onMounted(() => {
  // обязательно очистить интервал
  intervalFunctionId = setInterval(setTitle, 4000)
})
onUnmounted(() => {
  // обязательно очистить интервал
  clearInterval(intervalFunctionId)
})
</script>
<template>
  <ClientOnly>
    <v-container>
      <v-row class="justify-center pb-16 pt-16">
        <v-col cols="12" sm="8">
          <v-form @submit.prevent="submit">
            <div class="font-weight-bold text-center" style="font-size: 20px" id="title">Создать</div>
            <v-row>
              <v-col cols="12">
                <div class="label">Название</div>
                <v-text-field
                  v-model="title.value.value"
                  :error-messages="title.errorMessage.value"
                  placeholder="Чучмеки"
                  variant="outlined"
                  density="compact"
                  class="w-100"
                />
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <v-btn
                  class="ma-auto mt-4"
                  variant="flat"
                  color="primary"
                  type="submit"
                  :loading="loading"
                  :disabled="!meta.valid"
                >
                  Отправить
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </ClientOnly>
</template>
