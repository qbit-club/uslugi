<script setup lang="ts">
const restStore = useRest()

let route = useRoute()
let rest = ref<any>({})

let alias = String(route.params.alias) ?? ""

let res = await restStore.getByAlias(alias)

rest.value = res.data.value

let logo = ref(rest.value?.images.filter((e: string) => e.includes("logo"))[0])
let headerimage = ref(rest.value?.images.filter((e) => e.includes("headerimage"))[0])
</script>
<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col :cols="12" :md="10">
        <v-row>
          <v-col :cols="12" style="position: relative; margin-bottom: 80px;">
            <v-img :src="headerimage" cover alt="" />
            <div style="position: absolute; bottom: -50px; display: flex; justify-content: start; width: 100%; align-items: end;">
              <v-avatar :image="logo" size="250" class="logo"></v-avatar>
              <h1>{{ rest.title }}</h1>
            </div>
          </v-col>
          <v-col :cols="12">
            <h2>{{ rest }}</h2>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.logo {
  border: 4px solid white;
}
</style>
