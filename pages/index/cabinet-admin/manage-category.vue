<script lang="ts" setup>
const appStore = useApp()
import type { FoodCategory } from "../../types/category.intarface"


let foodCategory = ref('')
let dialog = ref(false)
let dbFoodCategory = ref<FoodCategory>()
let selectedCategory = ref('')


let showDialog = (category: any) => {
    selectedCategory.value = category
    dialog.value = true
}

let deleteCategory = async () => {
    await appStore.deleteFoodCategory(selectedCategory.value)
    getFoodCategory()
    dialog.value = false
}
let createFoodCategory = async () => {
    let category = foodCategory.value.toLowerCase().trim().split(', ')
    await appStore.createFoodCategory(category)
    getFoodCategory()
    foodCategory.value = ''
}
let getFoodCategory = async () => {
    let { data }: { data: any } = await appStore.getFoodCategory()
    dbFoodCategory.value = data.value.foodCategory.sort()
}
getFoodCategory()

</script>
<template>


    <v-container>
        <v-row class="justify-center pb-16">
            <v-col :cols="12" :sm="10" class="pa-0">

                <h3 class="text-center">Управление категориями</h3>

                <v-col>
                    <v-text-field v-model="foodCategory" placeholder="суп, холодные напитки, пицца" variant="outlined"
                        density="compact" class="w-100" />
                    <div class="d-flex justify-center">
                        <v-btn @click="createFoodCategory()" variant="flat" color="primary">создать</v-btn>
                    </div>

                </v-col>
                <v-col :cols="12" class="d-flex flex-wrap">
                    <v-chip variant="outlined" v-for="(category, index) in dbFoodCategory" :key="index" class="ma-2"
                        @click="showDialog(category)">
                        {{ category }}
                    </v-chip>
                </v-col>

                <v-dialog v-model="dialog" width="auto">
                    <v-card max-width="400" title="Удаляем?">
                        <template v-slot:actions>
                            <v-btn class="ms-auto" @click="dialog = false">Нет</v-btn>
                            <v-btn class="ms-auto" @click="deleteCategory()">Да</v-btn>
                        </template>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>



</template>