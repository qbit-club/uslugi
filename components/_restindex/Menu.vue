<script setup lang="ts">
const appStore = useApp()
import type { FoodCategory } from "../../types/category.intarface"
let dbFoodCategory = ref<FoodCategory>()

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
    } else { selectedCategory.value = category.toLowerCase() }

}

let getFoodCategory = async () => {
    // надо будет заменить на категории конкретного ресотрана
    let { data }: { data: any } = await appStore.getFoodCategory()
    dbFoodCategory.value = data.value.foodCategory.sort()
}
getFoodCategory()


</script>

<template>
    <v-container>
        <v-row>
            <v-col :cols="12" class="d-flex justify-space-between">
                <div>
                    <h3>
                        Меню
                    </h3>
                    <div>
                        {{ selectedCategory }}
                    </div>
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
            <v-col :cols="12" class="d-flex overflow-x-hide">
                <v-chip-group>
                    <v-chip color="red" variant="outlined" size="small" v-for="(category, index) in dbFoodCategory" :key="index"
                        class="ma-2" @click="selectCategory(category)">
                        {{ category }}
                    </v-chip>
                </v-chip-group>
            </v-col>
            <v-col :cols="12">
                <p>
                    тут будет список блюд
                </p>
            </v-col>

        </v-row>
    </v-container>




</template>
<style scoped></style>
