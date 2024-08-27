<script setup lang="ts">
useHead({
  title: "Создать студию"
})

import { useField, useForm } from "vee-validate"
import gsap from "gsap"
import { toast } from "vue3-toastify";

const studioStore = useStudio()
const router = useRouter()

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

let weekdays = ref([
  {
    weekday: 'Понедельник',
    from: '',
    to: '',
    holiday: false
  },
  {
    weekday: 'Вторник',
    from: '',
    to: '',
    holiday: false
  },
  {
    weekday: 'Среда',
    from: '',
    to: '',
    holiday: false
  },
  {
    weekday: 'Четверг',
    from: '',
    to: '',
    holiday: false
  },
  {
    weekday: 'Пятница',
    from: '',
    to: '',
    holiday: false
  },
  {
    weekday: 'Суббота',
    from: '',
    to: '',
    holiday: false
  },
  {
    weekday: 'Воскресенье',
    from: '',
    to: '',
    holiday: false
  },
])

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

const submit = handleSubmit(async values => {
  let toSend = {
    ...values,
    weekdays: weekdays.value,
  }
  let res = await studioStore.create(toSend)
  if (res.status.value == "success") {
    toast("Успешно!", {
      type: "success",
      onClose: () => {
        router.push('/')
      }
    })
  }
})

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
              <v-col cols="12" md="6" v-for="(wd, index) of weekdays" :key="index">
                <b>
                  {{ wd.weekday }}
                </b>
                <div class="mt-2 w-100 d-flex justify-start">
                  <v-text-field v-model="wd.from" label="Начало работы" variant="outlined" max-width="200" density="compact" :hide-details="true"></v-text-field>
                  <v-text-field v-model="wd.to" class="ml-6" label="Конец работы" variant="outlined" max-width="200" density="compact" :hide-details="true"></v-text-field>
                </div>
                <v-checkbox label="Выходной" v-model="wd.holiday"></v-checkbox>
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
