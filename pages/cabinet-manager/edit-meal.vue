<script lang="ts" setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import getPossibleLocations from "../../composables/dadata";
import type { Location } from "../../types/location.interface";
import { toast } from "vue3-toastify";
import type { FoodListItem } from "~/types/food-list-item.interface";
import type { FoodListItemFromDb } from "~/types/food-list-item-from-db.interface";

// meta
useHead({
  title: "Редактировать меню",
});
definePageMeta({
  middleware: "auth",
});
const config = useRuntimeConfig();
const restStore = useRest();
const userStore = useAuth();
const router = useRouter();
let appStore = useApp();

const CATEGORIES = appStore.appState?.foodCategory || [];

let { user } = storeToRefs(userStore);

let managingRest = ref<any>();
managingRest.value = userStore.user?.managingRest;
watch(user, (newVal) => {
  managingRest.value = newVal?.managingRest;
});

let response = await restStore.getById(managingRest.value);
let restFromDb = response.data.value;
let imagesFormData = new FormData();
let loading = ref(false);
let menuItem = ref();

let form = ref({
  name: "",
  category: "",
  health: {
    protein: 0,
    carb: 0,
    fat: 0,
    energy: "0 ккал",
    mass: "",
    ingredients: "",
  },
  price: "",
  images: [],
});

watch(
  form,
  (newVal, oldVal) => {
    form.value.health.protein = Number(form.value.health.protein);
    form.value.health.carb = Number(form.value.health.carb);
    form.value.health.fat = Number(form.value.health.fat);

    let sum = newVal.health.protein * 4 + newVal.health.carb * 4 + newVal.health.fat * 9;
    form.value.health.energy = String(sum) + " ккал";
  },
  { deep: true }
);

menuItem.value = restFromDb.foodList.filter(
  (item: FoodListItemFromDb) =>
    item._id == String(router.currentRoute.value?.query?.item_id)
)[0];
Object.assign(form.value, menuItem.value);

let previews = ref<string[]>([]);
let headerImagePreview = ref(menuItem.value.images[0]);
function uploadImage(file: File) {
  // example filename: headerimage_216262666_best-burger.jpg
  imagesFormData.set(
    "menuitemimage",
    file,
    "menuitemimage_" + String(Date.now()) + "_" + String(menuItem.value.name) + ".jpg"
  );
  // make a preview
  let reader = new FileReader();
  reader.onloadend = function () {
    headerImagePreview.value = reader.result;
  };
  reader.readAsDataURL(file);
}

async function submit() {
  loading.value = true;
  let res = await restStore.updateFoodListItem(
    managingRest.value,
    String(router.currentRoute.value?.query?.item_id),
    form.value
  );
  if (res.status.value == "success") {
    // find foodItem
    let restId = res.data.value._id;
    let itemId;
    for (let item of res.data.value?.foodList) {
      if (item.name == form.value.name) {
        itemId = item._id;
        break;
      }
    }
    let uploadRes = await restStore.uploadFoodListItemImages(
      restId,
      itemId,
      imagesFormData
    );
    if (uploadRes.status.value == "success") {
      loading.value = false;
    } else {
      console.log(uploadRes);
    }
  } else {
    console.log(res);
  }
}

onMounted(() => {});
</script>
<template>
  <v-row class="mb-16">
    <v-col cols="12">
      <h3>Редактировать блюдо</h3>
    </v-col>

    <v-col cols="12" class="d-flex justify-space-between align-center">
      <MenuItemImageInput @upload-menu-item-image="uploadImage" />
      <v-img
        :src="headerImagePreview"
        class="img-preview"
        alt=""
        v-if="headerImagePreview"
      />
    </v-col>

    <v-col cols="12" md="6">
      Название
      <v-text-field
        hide-details
        v-model="form.name"
        density="compact"
        variant="outlined"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      Категория
      <v-select
        hide-details
        v-model="form.category"
        :items="CATEGORIES"
        placeholder="пасты"
        variant="outlined"
        density="compact"
        clearable
      ></v-select>
    </v-col>
    <v-col cols="12" md="3" class="d-flex flex-column justify-end">
      Белки
      <div>
        <v-text-field
          hide-details
          type="number"
          v-model="form.health.protein"
          density="compact"
          variant="outlined"
          suffix="г."
        ></v-text-field>
      </div>
    </v-col>
    <v-col cols="12" md="3" class="d-flex flex-column justify-end">
      + Жиры
      <div>
        <v-text-field
          hide-details
          type="number"
          v-model="form.health.fat"
          density="compact"
          variant="outlined"
          suffix="г."
        ></v-text-field>
      </div>
    </v-col>
    <v-col cols="12" md="3" class="d-flex flex-column justify-end">
      + Углеводы
      <div>
        <v-text-field
          hide-details
          type="number"
          v-model="form.health.carb"
          density="compact"
          variant="outlined"
          suffix="г."
        ></v-text-field>
      </div>
    </v-col>
    <v-col cols="12" md="3" class="d-flex flex-column justify-end">
      = Энергетическая ценность
      <div>
        <v-text-field
          hide-details
          v-model="form.health.energy"
          density="compact"
          variant="outlined"
        ></v-text-field>
      </div>
    </v-col>
    <v-col cols="12" md="6">
      Цена
      <v-text-field
        hide-details
        v-model="form.price"
        prefix="₽"
        density="compact"
        variant="outlined"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
      Масса
      <v-text-field
        hide-details
        v-model="form.health.mass"
        density="compact"
        variant="outlined"
        placeholder="500 г"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      Состав
      <v-textarea
        auto-grow
        hide-details
        :rows="1"
        v-model="form.health.ingredients"
        density="compact"
        variant="outlined"
        placeholder="Из слабосолёного лосося, с тартаром из огурцов, красной икрой, укропом, луком шнитт и шалот"
      ></v-textarea>
    </v-col>

    <v-col cols="12" class="d-flex justify-center">
      <v-btn size="large" variant="tonal" @click="submit" :loading="loading"
        >отправить</v-btn
      >
    </v-col>
  </v-row>
</template>
<style scoped>
.img-preview {
  max-height: 200px;
}
</style>
