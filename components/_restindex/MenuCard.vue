<script setup>
defineProps({
    meal: Object,
})
</script>
<template>

    <v-card class="w-100 meal-card d-flex">


        <div class="w-100">
            <v-img :src="meal.images[0]" v-if="meal.images[0]">

            </v-img>
        </div>
        <div class="w-100 pa-2">
           <div class="text-right font-weight-bold mb-2">{{ meal.name }}</div> 
           <div class="text-subtitle-2">{{ meal.health.ingredients }}</div>
           <div class="text-caption text-right">жиры {{ meal.health.fat }}г белки {{ meal.health.protein }}г углеводы {{ meal.health.carb }}г </div> 
           <div class="text-caption d-flex justify-space-between font-weight-bold"> <div>{{ meal.health.energy }}</div> <div>{{ meal.health.mass }}</div> </div>
           <div class="text-center font-weight-bold ma-2">{{ meal.price }}</div> 
        </div>
       

    </v-card>


</template>

<style scoped>
.meal-card {
    aspect-ratio: 2/1;
}
</style>