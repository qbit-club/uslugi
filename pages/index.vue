<script lang="ts" setup>
import _ from "lodash"
useHead({
  title: 'Рестик'
})

const resrStore = useRest()
const router = useRouter()


let { data } = await resrStore.get()
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

    return rests.value
  }

})

let showSearch = () => {
  if (filter.value == '') {
    isShow.value = !isShow.value
  }
}

</script>

<template>
  <v-container>
    <v-row class="pt-4 pb-16">
      <v-col cols="12" class="d-flex align-center">
        <v-icon icon="mdi-magnify" class="ma-2" @click="showSearch" />
        <transition name="fade">
          <v-text-field v-model='filter' v-if="isShow" density="compact" variant="solo" hide-details single-line
            placeholder="поиск ресторана" clear-icon="mdi-close-circle" clearable></v-text-field>
        </transition>
       
      </v-col>

      <v-col cols="12" md="6" lg="4" v-for="rest, index in restsWithFilter" :key="index">
        <NuxtLink :to="`/${rest.alias}`">
          <div class="h-100 d-flex flex-column align-center pa-4">
            <h3>{{ rest.title }}</h3>
            <v-img :src="rest.images.logo" class="w-50"></v-img>
          </div>
        </NuxtLink>
      </v-col>

    </v-row>
  </v-container>
</template>
