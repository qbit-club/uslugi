<script setup lang="ts">
const restStore = useRest()

let route = useRoute()

let alias = String(route.params.alias) ?? ''
let res = await restStore.getByAlias(alias)

console.log(res);
</script>
<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h2>{{ res.data }}</h2>
      </v-col>
    </v-row>
  </v-container>
</template>