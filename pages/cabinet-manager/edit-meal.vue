<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import getPossibleLocations from "../../composables/dadata";
import type { Location } from "../../types/location.interface"
import { useField, useForm } from 'vee-validate'

// meta
useHead({
  title: 'Редактировать меню'
})
definePageMeta({
  middleware: 'auth'
})
const config = useRuntimeConfig()
const restStore = useRest()
const userStore = useAuth()
const router = useRouter()
let appStore = useApp()

const CATEGORIES = appStore.appState?.foodCategory || []

let { user } = storeToRefs(userStore)

let managingRest = ref<string>()
managingRest.value = userStore.user?.managingRest
watch(user, (newVal) => {    
  managingRest.value = newVal?.managingRest
})

let response = await restStore.getById(managingRest.value)
let restFromDb = response.data.value
let imagesFormData = new FormData()
let loading = ref(false)

let form = ref({
  name: '',
  category: '',
  health: {
    protein: 0,
    carb: 0,
    fat: 0,
    energy: '0 ккал',
    mass: '',
    ingredients: ''
  },
  price: ''
})

let previews = ref<string[]>([])
let index = 0
function uploadImage(file: File) {
  // make a preview
  let reader = new FileReader();
  reader.onloadend = function () {
    let img = new Image();
    img.src = String(reader.result);
    img.onload = function (this: any) {
      if (this.width / this.height >= 1.1 || this.width / this.height <= 0.9) {
        toast('Картинка должна быть "более" квадратной', { type: 'error' })
      } else {
        imagesFormData.set('menuitemimage_' + String(index) + `_${managingRest.value}`, file, 'menuitemimage_' + String(index) + `_${managingRest.value}` + '_' + String(Date.now()) + '.jpg')
        previews.value.push(String(reader.result))
        index += 1
      }
    }

  }
  reader.readAsDataURL(file);
}

async function submit() {
  loading.value = true
  let res = await restStore.updateFoodListItem(managingRest.value, form.value)
  if (res.status.value == "success") {
    // find foodItem
    let restId = res.data.value._id
    let itemId;
    for (let item of res.data.value?.foodList) {
      if (item.name == form.value.name) {
        itemId = item._id
        break
      }
    }
    let uploadRes = await restStore.uploadFoodListItemImages(restId, itemId, imagesFormData)
    if (uploadRes.status.value == "success") {
      loading.value = false
    }
  }
}

onMounted(()=>{
  let menuItem = restFromDb.foodList.filter((item)=>item._id==String(router.currentRoute.value?.query?.item_id))[0]
  Object.assign(form.value,menuItem)
})
</script>
<template>
   <v-row class="mb-16">
    <v-col cols="12">
      <h3>Редактировать блюдо</h3>
    </v-col>

    <v-col cols="12" class="d-flex justify-space-between align-center">
      <MenuItemImageInput @upload-menu-item-image="uploadImage" />
      <v-img v-for="img of form.images" :src="img" class="img-preview"></v-img>
      <v-img v-for="pr of previews" :src="pr" class="img-preview"></v-img>
    </v-col>

    <v-col cols="12" md="6">
      Название
      <v-text-field hide-details v-model="form.name" density="compact" variant="outlined"></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      Категория
      <v-select hide-details v-model="form.category" :items="CATEGORIES" placeholder="пасты" variant="outlined"
        density="compact" clearable></v-select>
    </v-col>
    <v-col cols="12" md="3" class="d-flex flex-column justify-end">

      Белки
      <div>
        <v-text-field hide-details type="number" v-model="form.health.protein" density="compact" variant="outlined"
          suffix="г."></v-text-field>
      </div>

    </v-col>
    <v-col cols="12" md="3" class="d-flex flex-column justify-end">
      + Жиры
      <div>
        <v-text-field hide-details type="number" v-model="form.health.fat" density="compact" variant="outlined"
          suffix="г."></v-text-field>
      </div>

    </v-col>
    <v-col cols="12" md="3" class="d-flex flex-column justify-end">
      + Углеводы
      <div>
        <v-text-field hide-details type="number" v-model="form.health.carb" density="compact" variant="outlined"
          suffix="г."></v-text-field>
      </div>

    </v-col>
    <v-col cols="12" md="3" class="d-flex flex-column justify-end">
      = Энергетическая ценность
      <div>
        <v-text-field hide-details v-model="form.health.energy" density="compact" variant="outlined"></v-text-field>
      </div>

    </v-col>
    <v-col cols="12" md="6">
      Цена
      <v-text-field hide-details v-model="form.price" prefix="₽" density="compact" variant="outlined"></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      Масса
      <v-text-field hide-details v-model="form.health.mass" density="compact" variant="outlined"
        placeholder="500 г"></v-text-field>
    </v-col>
    <v-col cols="12">
      Состав
      <v-textarea auto-grow hide-details :rows="1" v-model="form.health.ingredients" density="compact"
        variant="outlined"
        placeholder="Из слабосолёного лосося, с тартаром из огурцов, красной икрой, укропом, луком шнитт и шалот"></v-textarea>
    </v-col>

    <v-col cols="12" class="d-flex justify-center">
      <v-btn size="large" variant="tonal" :loading="loading" @click="submit">отправить</v-btn>
    </v-col>
  </v-row>
</template>
<style scoped>
.img-preview {
  max-height: 200px;
}
</style>