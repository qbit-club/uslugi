<script setup lang="ts">
const restStore = useRest()

let route = useRoute()
let rest = ref<any>({})

let alias = String(route.params.alias) ?? ''

let res = await restStore.getByAlias(alias)

rest.value = res.data.value

// let logo = ref(rest.value.images.filter((e: string) => e.includes('logo'))[0])
</script>
<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        
        <!-- <v-avatar :image="logo" size="250"></v-avatar> -->
      </v-col>
      <h2>{{ rest }}</h2>
    </v-row>
  </v-container>
</template>