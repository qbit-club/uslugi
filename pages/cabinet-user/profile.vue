<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const authStore = useAuth()
let { user } = storeToRefs(authStore)

</script>
<template>

    <v-container>
        <v-row class="justify-center pb-16">
            <v-col :cols="12" :sm="10" :md="8" class="pa-0">
                <h3 class="text-center">Мои данные</h3>
                <v-col class="d-flex pa-0" :cols="12" :sm="10">

                    <v-card class="pa-4">
                        <h3> {{ user?.name }}</h3>
                        <h5>{{ user?.email }}</h5>
                    </v-card>
                </v-col>
            </v-col>

        </v-row>
    </v-container>




</template>