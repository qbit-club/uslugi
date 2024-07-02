<script lang="ts" setup>
import _ from "lodash"
useHead({
  title: 'Рестик'
})

const hallStore = useRest()
const router = useRouter()

let { data } = await hallStore.get()
let rests = ref(data.value)
let logo = (rest: { images: string[]; }) => {
  if (_.has(rest, 'images')) {
    return rest.images.filter((e: string) => e.includes("logo"))[0] || ''
  }
  return ''
}
</script>

<template>
  <v-container>
    <v-row>

      <v-col cols="12" md="6" lg="4" v-for="rest, index in rests" :key="index">
        <NuxtLink :to="`/${rest.alias}`">
          <v-card class="h-100">
            <h3>{{ rest.title }}</h3>         
              <v-img :src="logo(rest)" class="w-50"></v-img>
          </v-card>
        </NuxtLink>
      </v-col>

    </v-row>
  </v-container>
</template>