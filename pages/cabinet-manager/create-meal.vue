<script setup lang="ts">
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
watch(form, (newVal, oldVal) => {
  form.value.health.protein = Number(form.value.health.protein)
  form.value.health.carb = Number(form.value.health.carb)
  form.value.health.fat = Number(form.value.health.fat)

  let sum = newVal.health.protein * 4 + newVal.health.carb * 4 + newVal.health.fat * 9
  form.value.health.energy = String(sum) + ' ккал'
}, { deep: true })

let loading = ref(false)
async function submit() {
  // если надо будет - добавить _id меню, чтобы обновить его
  // в базе(серверная часть уже написана)
  loading.value = true
  // пусть пока в морковку создаются
  let res = await restStore.createFoodListItem("6694096e4901af87e35e23aa", form.value)
  if (res.status.value == "success") {
    loading.value = false
  }
}
</script>
<template>
  <v-row>
    <v-col cols="12">
      <h3>Создать блюдо</h3>
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
<style scoped lang="scss"></style>