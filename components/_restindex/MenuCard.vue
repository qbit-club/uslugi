<script setup>
defineProps({
    meal: Object,
})
</script>
<template>
    <v-card class="w-100" aspect-ratio="1">
       
       {{meal}}
    </v-card>
</template>