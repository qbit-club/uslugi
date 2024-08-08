<script lang="ts" setup>

useHead({
    title: 'Рестик'
})

const restStore = useRest()
const router = useRouter()

let { data } = await restStore.get()
let rests = ref(data.value)

let isShow = ref(false)
let filter = ref<string>('')

let restsWithFilter = computed(() => {
    if (filter.value == null) {
        filter.value = ''
    }
    if (filter.value.length > 2) {
        return rests.value.filter((rest: any) =>
            rest.title.toLowerCase().includes(filter.value.toLowerCase()) ||
            rest.description.toLowerCase().includes(filter.value.toLowerCase())
        )
    } else {
        let filterHidden = rests.value.filter((rest:any) => rest.isHidden==false)
        if (filterHidden==null){
            return []
        }
        else{
            return filterHidden
        }
    }

})

let showSearch = () => {
    if (filter.value == '') {
        isShow.value = !isShow.value
    }
}

</script>

<template>

    <v-col cols="12" class="d-flex align-center justify-center">

        <ClientOnly>
            <v-text-field v-model='filter' prepend-inner-icon="mdi-magnify" density="compact" max-width="300px"
                variant="solo" hide-details single-line placeholder="поиск еды" clear-icon="mdi-close-circle"
                clearable></v-text-field>
        </ClientOnly>
        <!-- <v-icon icon="mdi-magnify" class="ma-2" @click="showSearch" /> -->
    </v-col>

    <v-col cols="6" md="4" lg="3" v-for="rest, index in restsWithFilter" :key="index">
        <NuxtLink :to="`/${rest.alias}`">
            <div class="h-100 d-flex flex-column justify-space-between">
                <h3 class="text-center">{{ rest.title }}</h3>
                <v-img :src="rest.images?.logo" class="w-100 rounded-lg"></v-img>
            </div>
        </NuxtLink>
    </v-col>


</template>
<style></style>
