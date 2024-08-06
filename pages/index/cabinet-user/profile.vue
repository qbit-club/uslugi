<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const authStore = useAuth()
let { user } = storeToRefs(authStore)

</script>
<template>
    <v-container>
        <v-row class="justify-center">
            <v-col class="d-flex pa-0" cols="12" sm="10" md="8">
                <v-card class="pa-4" color="primary">
                    <h3> {{ user?.name }}</h3>
                    <h5>{{ user?.email }}</h5>
                </v-card>
            </v-col>
        </v-row>
    </v-container>



</template>