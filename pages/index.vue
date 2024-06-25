<script lang="ts" setup>
useHead({
  title: 'Рестик'
})

const hallStore = useRest()
const router = useRouter()

let { data } = await hallStore.get()

let rests = ref(data.value)
</script>

<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h1>Лендинг</h1>
      </v-col>
    </v-row>
  </v-container>
</template>