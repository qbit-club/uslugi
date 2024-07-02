<script setup lang="ts">
import VkSvg from '../../assets/styles/vk.svg'
import InfoCard from '../../components/_restindex/InfoCard.vue'
import DeliveryCard from '../../components/_restindex/DeliveryCard.vue'
import AddressCard from '../../components/_restindex/AddressCard.vue'
const restStore = useRest()

let route = useRoute()
let rest = ref<any>({})

let currentTab= ref<any>({})

let alias = String(route.params.alias) ?? ""

let res = await restStore.getByAlias(alias)

rest.value = res.data.value

let logo = ref(rest.value.images.filter((e: string) => e.includes("logo"))[0])
let headerimage = ref(rest.value.images.filter((e: string) => e.includes("headerimage"))[0])
</script>
<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col :cols="12" :md="10">
        <v-row>
          <v-col :cols="12" style="position: relative; margin-bottom: 80px">
            <v-img :src="headerimage" cover alt="" />
            <div style="
                position: absolute;
                bottom: -50px;
                display: flex;
                justify-content: start;
                width: 100%;
                align-items: end;
              ">
              <v-avatar :image="logo" :size="250" class="logo"></v-avatar>
              <span class="title me-auto ">{{ rest.title }}</span>
              <v-img :max-width="32" :max-height="32" class="mr-6"
                :src="VkSvg"></v-img>
            </div>
          </v-col>
          <v-col :cols="12">
            <div class="d-flex flex-row">
              <v-icon icon="mdi-information-outline" class="mr-8" size="x-large" />
              <v-icon icon="mdi-truck-fast-outline" class="mr-8" size="x-large" />
              <v-icon icon="mdi-map-marker-outline" class="mr-8" size="x-large" />
            </div>
          </v-col>
          <component :is="InfoCard"></component>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.logo {
  border: 4px solid white;
}

.title {
  font-size: clamp(1.5rem, 1.1023rem + 1.1364vw, 2rem);
  font-weight: 700;
}
</style>
