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
        <div class="w-100">
            {{ meal.name }}
        </div>

    </v-card>


</template>

<style scoped>
.meal-card {
    aspect-ratio: 2/1;
}
</style>