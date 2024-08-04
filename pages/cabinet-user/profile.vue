<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const authStore = useAuth()
let { user } = storeToRefs(authStore)

</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <h3> {{ user?.name }}</h3>
                <h5>{{ user?.email }}</h5>
            </v-col>
        </v-row>
    </v-container>



</template>