<script setup lang="ts">
// meta
useHead({
  title: 'Рестик | Создать зал'
})

// all types
import type { Table } from '../../types/table.interface'

// other imports
import { useField, useForm } from 'vee-validate'

const hallStore = useHall()
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
  },
})

let title = useField<string>('title')
let tables = ref<Table[]>([{
  floor: 1,
  number: 1,
  seatsNumber: 1
}])

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
      floor: prevTable.floor,
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

const submit = handleSubmit(async values => {
  loading.value = true
  let res = await hallStore.create(values)
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
          <div class="font-weight-bold" style="font-size: 20px;">Создать</div>
          <h3 class="w-100">Главная информация</h3>
          <v-text-field v-model="title.value.value" :error-messages="title.errorMessage.value"
            placeholder="Название ресторана" variant="outlined" density="compact" class="mt-3 w-100" />

          <v-data-table :items="tables" :headers="tablesHeaders" :items-per-page="5" v-model:page="tablePage">
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
              <v-text-field variant="plain" type="number" v-model="item.number" :min="0"></v-text-field>
            </template>

            <template v-slot:item.floor="{ item }">
              <v-text-field variant="plain" type="number" v-model="item.floor"></v-text-field>
            </template>
            
            <template v-slot:item.seatsNumber="{ item, index }">
              <div class="d-flex justify-space-between align-center">
                <v-text-field variant="plain" type="number" v-model="item.seatsNumber" :min="1"></v-text-field>
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
          <v-btn class="ma-auto mt-4" variant="tonal" type="submit" :loading="loading" :disabled="!meta.valid || tables.length == 0">
            Отправить
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </ClientOnly>
</template>