<script setup lang="ts">
const restStore = useRest()

let route = useRoute()

let alias = String(route.params.alias) ?? ''
let res = await restStore.getByAlias(alias)

let rest = res.data
</script>
<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h2>{{ rest }}</h2>
      </v-col>
    </v-row>
  </v-container>
</template>