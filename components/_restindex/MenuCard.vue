<script setup>
defineProps({
    meal: Object,
})
</script>
<template>
    
        <v-card class="w-100 meal-card">

            {{ meal }}
        </v-card>
  

</template>

<style scoped>
.meal-card {
    aspect-ratio: 2/1;
}
</style>