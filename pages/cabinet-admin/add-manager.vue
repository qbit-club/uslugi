<script lang="ts" setup>
import type { Rest } from '~/types/rest.interface';

const auth = useAuth()

const restStore = useRest()
let { data } = await restStore.get()
let rest_ids = ref<[]>()
let chosen_rest=ref("")
let user_id = ref("")

onMounted(async ()=>{
    // console.log(rests)
    rest_ids=data.value.map((item:Rest) => item._id)
})
</script>

<template>
    <v-row>
        <v-col cols="4">

            <v-select label="Рестораны" :items="rest_ids" :v-model="chosen_rest">
            </v-select>
        </v-col>
        <v-col cols="8">
            <v-text-field v-model="user_id" placeholder="Электронная почта" type="email">
            </v-text-field>

        </v-col>
    </v-row>
    <!-- <v-button>сделать манагером</v-button> -->

</template>

<style scoped></style>