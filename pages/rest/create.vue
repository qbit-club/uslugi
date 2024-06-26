<script setup lang="ts">
// meta
useHead({
  title: 'Рестик | Создать зал'
})
const config = useRuntimeConfig()

// all types
import type { Table } from '../../types/table.interface'

// other imports
import { useField, useForm } from 'vee-validate'

const hallStore = useRest()
const router = useRouter()

let loading = ref(false)
let tablePage = ref(1)

const tablesHeaders = [
  { title: 'Номер места', key: 'number' },
  { title: 'Этаж', key: 'floor' },
  { title: 'Кол-во мест', key: 'seatsNumber' },
]

const { meta, handleSubmit, validate } = useForm({
  initialValues: {
    title: '',
    alias: '',
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
      if (value?.trim().length < 4) return 'слишком короткий заголовок'
      if (value?.length > 32) return 'слишком длинный заголовок'

      return true
    },
    alias(value: String) {
      if (value?.trim().length < 4) return 'слишком короткий псевдоним'
      if (value?.length > 32) return 'слишком длинный псевдоним'
      let regexp = /[а-яё]/i;
      if (regexp.test(value?.trim())) {
        return 'уберите кириллицу'
      }
      return true
    }
  },
})

let title = useField<string>('title')
let alias = useField<string>('alias')
let tables = ref<Table[]>([{
  floor: 1,
  number: 1,
  seatsNumber: 1
}])
let imagesFormData = new FormData()

/**
 * если нет столиков, то добавляем столик на 1 этаже с 1 номером
 * если есть столик, то добавляем новый столик на этаже предыдущего 
 * столика с номером на 1 больше 
 */
function addTable() {
  if (tables.value.length > 0) {
    let prevTable = tables.value[tables.value.length - 1]
    // добавляем новый столик на таком же этаже, что и предыдущий
    tables.value.push({
      floor: Number(prevTable.floor),
      number: Number(prevTable.number) + 1,
      seatsNumber: prevTable.seatsNumber
    })
  } else {
    tables.value.push({
      floor: 1,
      number: 1,
      seatsNumber: 1
    })
  }
}
function ensureNumberType() {
  tables.value = tables.value.map((e) => {
    return { number: Number(e.number), seatsNumber: Number(e.seatsNumber), floor: Number(e.floor) }
  })
}
// base64 img
let logoPreview = ref()
function uploadLogo(file: File) {
  // example filename: logo_216262666_best-burger.jpg
  imagesFormData.set('logo', file, 'logo_' + String(Date.now()) + '_' + String(alias.value.value) + '.jpg')
  // make a preview
  let reader = new FileReader();
  reader.onloadend = function() {
    logoPreview.value = reader.result
  }
  reader.readAsDataURL(file);
}
// base64 img
let headerImagePreview = ref()
function uploadHeaderImage(file: File) {
  // example filename: headerimage_216262666_best-burger.jpg
  imagesFormData.set('headerimage', file, 'headerimage_' + String(Date.now()) + '_' + String(alias.value.value) + '.jpg')
  // make a preview
  let reader = new FileReader();
  reader.onloadend = function() {
    headerImagePreview.value = reader.result
  }
  reader.readAsDataURL(file);
}
const submit = handleSubmit(async values => {
  loading.value = true
  let toSend = {
    ...values,
    tables: tables.value
  }

  let res = await hallStore.create(toSend)
  if (res.status.value == 'success') {
    loading.value = false
    router.push('/')
  }
})
</script>
<template>
  <ClientOnly>
    <v-row class="justify-center mb-8">
      <v-col cols="12" md="8" lg="6">
        <v-form @submit.prevent="submit"
          class="global-box d-flex flex-column align-center w-100 h-100 pt-4 pr-6 pb-4 pl-6">
          <div class="font-weight-bold" style="font-size: 20px;">Создать ресторан</div>
          <h3 class="w-100 mt-6">Главная информация</h3>
          <v-row class="w-100">
            <v-col :cols="6" class="pl-0">
              <div class="label">Название ресторана</div>
              <v-text-field v-model="title.value.value" :error-messages="title.errorMessage.value" placeholder="Шаурма"
                variant="outlined" density="compact" class="w-100" />
            </v-col>
            <v-col :cols="6" class="pr-0">
              <div class="label">Псевдоним</div>
              <v-text-field v-model="alias.value.value" :error-messages="alias.errorMessage.value" placeholder="shaurma"
                variant="outlined" density="compact" class="w-100" />
            </v-col>
          </v-row>
          <!-- режим работы -->
          <!-- логотип  -->
          <!-- шапка сайта(большая, широкая фотка) -->
          <!-- svg залов -->
          <!-- контакты: телефоны, соц сети -->
          <div class="w-100">
            url ресторана: <i style="text-decoration: underline;">{{ config.public.siteUrl + '/' + alias.value.value
              }}</i>
          </div>
          режим работы ещё рано делать
          <h3 class="w-100 mt-4">Фотографии</h3>
          <v-avatar :image="logoPreview" size="100" color="blue"></v-avatar>
          <LogoInput :title="'логотип'" @uploadImage="uploadLogo" />

          <img :src="headerImagePreview" style="max-height: 300px;">
          <HeaderImageInput :title="'шапка ресторана'" @uploadHeaderImage="uploadHeaderImage" />

          <v-data-table :items="tables" :headers="tablesHeaders" :items-per-page="5" v-model:page="tablePage"
            class="mt-4">
            <template v-slot:top>
              <div class="d-flex justify-space-between w-100">
                <h3 class="">Столики</h3>
                <v-btn @click="addTable" variant="tonal" prepend-icon="mdi-plus">добавить</v-btn>
              </div>
            </template>
            <template v-slot:no-data>
              <b class="text-red cursor-pointer" @click="addTable">
                Добавьте столики
              </b>
            </template>
            <template v-slot:item.number="{ item }">
              <v-text-field @change="ensureNumberType" variant="plain" type="number" v-model="item.number"
                :min="0"></v-text-field>
            </template>

            <template v-slot:item.floor="{ item }">
              <v-text-field @change="ensureNumberType" variant="plain" type="number"
                v-model="item.floor"></v-text-field>
            </template>

            <template v-slot:item.seatsNumber="{ item, index }">
              <div class="d-flex justify-space-between align-center">
                <v-text-field @change="ensureNumberType" variant="plain" type="number" v-model="item.seatsNumber"
                  :min="1"></v-text-field>
                <v-tooltip text="Удалить" location="top" :offset="-6">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" icon="mdi-delete-outline" variant="plain" color="red"
                      @click="tables.splice(index, 1)">
                    </v-btn>
                  </template>
                </v-tooltip>
              </div>
            </template>

            <template v-slot:bottom>
              <v-pagination v-model="tablePage" :length="Math.ceil(tables.length / 5)"></v-pagination>
            </template>
          </v-data-table>
          <v-btn class="ma-auto mt-4" variant="tonal" type="submit" :loading="loading"
            :disabled="!meta.valid || tables.length == 0">
            Отправить
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </ClientOnly>
</template>
<style lang="scss" scoped>
.label {
  font-size: 12px;
}
</style>