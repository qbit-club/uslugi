<script setup lang="ts">
import { useField, useForm } from 'vee-validate'

let loading = ref(false)

const { meta, handleSubmit, validate } = useForm({
  initialValues: {
    title: '',
    // description: '',
    // price: '',
    // images: <Array<File>>[],
    // location: {
    //   name: '',
    //   geo_lat: null,
    //   geo_lon: null
    // }
  },
  validationSchema: {
    title(value: string) {
      if (value.trim().length < 4) return 'слишком короткий заголовок'
      if (value.length > 32) return 'слишком длинный заголовок'

      return true
    },
  },
})

let title = useField<string>('title')

const submit = handleSubmit(async values => {
  loading.value = true
  console.log(values);
  loading.value = false
})
</script>
<template>
  <v-row class="justify-center">
    <v-col cols="12" md="6" lg="4">
      <v-form @submit.prevent="submit"
        class="global-box d-flex flex-column align-center w-100 h-100 pt-4 pr-6 pb-4 pl-6">
        <div class="font-weight-bold" style="font-size: 20px;">Создать</div>
        
        <v-text-field v-model="title.value.value" :error-messages="title.errorMessage.value" placeholder="Заголовок"
          variant="outlined" density="compact" class="mt-3 w-100" />

        <v-btn class="ma-auto bg-blue mt-4" variant="tonal" type="submit" :loading="loading"
          :disabled="!meta.valid">
          Отправить
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>