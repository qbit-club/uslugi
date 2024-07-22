<script setup lang="ts">
import { toast } from 'vue3-toastify';

let appStore = useApp()
const CATEGORIES = appStore.appState?.foodCategory || []

let restStore = useRest()

let form = ref({
  name: '',
  category: '',
  health: {
    protein: 0,
    carb: 0,
    fat: 0,
    energy: '0 ккал'
  },
  price: ''
})
let imagesFormData = new FormData()

watch(form, (newVal, oldVal) => {
  form.value.health.protein = Number(form.value.health.protein)
  form.value.health.carb = Number(form.value.health.carb)
  form.value.health.fat = Number(form.value.health.fat)

  let sum = newVal.health.protein * 4 + newVal.health.carb * 4 + newVal.health.fat * 9
  form.value.health.energy = String(sum) + ' ккал'
}, { deep: true })

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
        imagesFormData.set('menuitemimage_' + String(index) + '_6694096e4901af87e35e23aa', file, 'menuitemimage_' + String(index) + '_6694096e4901af87e35e23aa' + '_' + String(Date.now()) + '.jpg')
        previews.value.push(String(reader.result))
        index += 1
      }
    }

  }
  reader.readAsDataURL(file);
}

let loading = ref(false)
async function submit() {
  loading.value = true
  // пусть пока в морковку создаются
  let res = await restStore.createFoodListItem("6694096e4901af87e35e23aa", form.value)
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
</script>
<template>
  <v-row>
    <v-col cols="12">
      <h3>Создать блюдо</h3>
    </v-col>
    <v-col cols="12" class="d-flex justify-space-between align-center">
      <MenuItemImageInput @upload-menu-item-image="uploadImage" />
      <v-img v-for="pr of previews" :src="pr" class="img-preview"></v-img>
    </v-col>
    <v-col cols="6">
      Название
      <v-text-field v-model="form.name" density="compact" variant="outlined"></v-text-field>
    </v-col>
    <v-col cols="6">
      Категория
      <v-select v-model="form.category" :items="CATEGORIES" placeholder="пасты" variant="outlined"
        density="compact"></v-select>
    </v-col>
    <v-col cols="2">
      Белки
      <v-text-field type="number" v-model="form.health.protein" density="compact" variant="outlined"></v-text-field>
    </v-col>
    <v-col cols="2">
      + Жиры
      <v-text-field type="number" v-model="form.health.fat" density="compact" variant="outlined"></v-text-field>
    </v-col>
    <v-col cols="2">
      + Углеводы
      <v-text-field type="number" v-model="form.health.carb" density="compact" variant="outlined"></v-text-field>
    </v-col>
    <v-col cols="2">
      = Энергетическая ценность
      <v-text-field v-model="form.health.energy" density="compact" variant="outlined" placeholder=""></v-text-field>
    </v-col>
    <v-col cols="4">
      Цена
      <v-text-field v-model="form.price" prefix="₽" density="compact" variant="outlined"></v-text-field>
    </v-col>
    <v-col cols="12" class="d-flex justify-center">
      <v-btn size="large" variant="tonal" :loading="loading" @click="submit">отправить</v-btn>
    </v-col>
  </v-row>
</template>
<style scoped lang="scss">
.img-preview {
  max-height: 200px;
}
</style>