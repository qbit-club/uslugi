<script setup lang="ts">
import MenuCard from './MenuCard.vue'
import { useElementBounding } from '@vueuse/core'
import type { FoodListItemFromDb } from "../../types/food-list-item-from-db.interface";
import type { RestFromDb } from '~/types/rest-from-db.interface';
const props = defineProps<{
    rest: RestFromDb
}>()
type CategoryMeals = {
    category: string;
    meals: FoodListItemFromDb[];
};

const logo = ref<any>()
const { y: logoY }
    = useElementBounding(logo)

const cartStore = useCart()

let groupMeals = ref<CategoryMeals[]>()
let isShow = ref(false)
let filter = ref<string>('')
let selectedCategory = ref<string>("")

let showSearch = () => {
    if (!filter.value) {
        isShow.value = !isShow.value
    }
}
let selectCategory = (category: any) => {
    if (selectedCategory.value == category.toLowerCase()) {
        selectedCategory.value = ""
    } else {
        selectedCategory.value = category.toLowerCase()
        const el = document.getElementById(category);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: "center" });
        }

    }

}


let groupMealsByCategory = (meals: FoodListItemFromDb[]): CategoryMeals[] => {
    const grouped: { [key: string]: FoodListItemFromDb[] } = {};

    meals.forEach(meal => {
        // получаем объект с ключами-категориями и значениями в виде массива блюд этой категории
        const category = meal.category || "Без категории";
        if (!grouped[category]) {
            grouped[category] = [];
        }
        grouped[category].push(meal);
    });
    // формируем массив объектов в соответствии с типом CategoryMeals
    return Object.keys(grouped)
        .sort()
        .map(category => ({
            category,
            meals: grouped[category]
        }));
}

watch(logoY, () => {
    console.log(logo.value.style)
    logoY.value >= 100 ? logo.value.style.display = 'none' : logo.value.style.display = 'block'
})


groupMeals.value = groupMealsByCategory(props.rest?.menu)
selectedCategory.value = groupMeals.value[0].category
onMounted(() => {
    logo.value.style.display = 'none'
})
</script>

<template>

    <v-container>
        <v-row>
            <v-col cols="12" class="d-flex justify-space-between pb-0 pt-0">
                <div>
                    <h3>
                        Меню
                    </h3>
                </div>
                <div class="d-flex align-center">
                    <transition name="fade">
                        <v-text-field min-width="200" v-model='filter' v-if="isShow" density="compact" variant="solo"
                            hide-details single-line placeholder="поиск" clear-icon="mdi-close-circle"
                            clearable></v-text-field>
                    </transition>
                    <v-icon icon="mdi-magnify" class="ma-2" @click="showSearch" />
                </div>
            </v-col>
            <v-col cols="12">
            </v-col>
            <v-col ref="logo" cols="12" class="position-sticky pt-0" style="z-index:2; top:0px; ">
                <div class="d-flex align-center" style="background:white">

                    <ClientOnly>
                        <transition name="fade">
                            <img v-if="logoY < 100" :src="rest.images.logo" style="width: 50px;" class="ma-2"></img>
                        </transition>
                    </ClientOnly>
                    <v-chip-group>
                        <v-chip color="red" variant="outlined" v-for="(item, index) in groupMeals" :key="index"
                            class="mb-2" @click="selectCategory(item.category)">
                            {{ item.category }}
                        </v-chip>
                    </v-chip-group>
                </div>
                <div  class="d-flex align-center w-100 justify-end">
                    <v-badge :content="cartStore.cart.length" color="primary" >
                        <v-btn icon="mdi-cart" >
                        </v-btn>
                    </v-badge>
                </div>
            </v-col>

            <!-- пока нет меню  используется foodList -->

            <v-col :cols="12">
                <div v-for="(item, index) in groupMeals">
                    <div class="text-center text-uppercase  font-weight-bold ma-4 " :id="item.category">
                        {{ item.category }}
                    </div>
                    <v-row>
                        <v-col cols="12" md="6" v-for="(meal, index) in item.meals">
                            <MenuCard :meal="meal"></MenuCard>
                        </v-col>
                    </v-row>
                </div>
            </v-col>

        </v-row>

    </v-container>




</template>
<style scoped></style>
