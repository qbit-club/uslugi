<script setup lang="ts">
import InfoCard from '../../components/_restindex/InfoCard.vue'
import DeliveryCard from '../../components/_restindex/DeliveryCard.vue'
import AddressCard from '../../components/_restindex/AddressCard.vue'
const restStore = useRest()

let route = useRoute()
let rest = ref<any>({})

let currentTab = shallowRef<any>(InfoCard)

let alias = String(route.params.alias) ?? ""

let res = await restStore.getByAlias(alias)

rest.value = res.data.value
// window.open(rest.value.socialMedia)
let logo = ref(rest.value.images.filter((e: string) => e.includes("logo"))[0])
let headerimage = ref(rest.value.images.filter((e: string) => e.includes("headerimage"))[0])
</script>
<template>
  <v-container>
    <v-row class="d-flex justify-center pb-16">
      <v-col :cols="12" :md="10">
        <v-row>
          <v-col :cols="12" style="position: relative; margin-bottom: 80px">
            <v-img :src="headerimage" max-height="25vh" cover alt="" />
            <div style="
                position: absolute;
                bottom: -50px;
                display: flex;
                justify-content: start;
                aspect-ratio: 1;
                width: 100%;
                align-items: end;
              ">
              <v-avatar :image="logo" size="20%" class="logo"></v-avatar>
              <span class="title me-auto ">{{ rest.title }}</span>
              <a :href="rest.socialMedia" target="_blank">
                <img src="../../assets/icons/vk.svg" class="mr-6 mb-4" />
              </a>
            </div>
          </v-col>
          <v-col :cols="12">
            <div class="d-flex">
              <div class="d-flex flex-column align-center pa-4">
                <v-icon icon="mdi-silverware-fork-knife" size="x-large" @click="currentTab = InfoCard" />
                <div class="explanation">меню</div>
              </div>
              <div class="d-flex flex-column align-center pa-4">
                <v-icon icon="mdi-table-chair" size="x-large" @click="currentTab = InfoCard" />
                <div class="explanation text-center">бронь <br> столиков</div>
              </div>
              <div class="d-flex flex-column align-center pa-4">
                <v-icon icon="mdi-information-outline" size="x-large" @click="currentTab = InfoCard" />
                <div class="explanation">инфо</div>
              </div>
              <div class="d-flex flex-column align-center pa-4">
                <v-icon icon="mdi-truck-fast-outline" size="x-large" @click="currentTab = DeliveryCard" />
                <div class="explanation">доставка</div>
              </div>
              <div class="d-flex flex-column align-center pa-4">
                <v-icon icon="mdi-map-marker-outline" size="x-large" @click="currentTab = AddressCard" />
                <div class="explanation">адрес</div>
              </div>
            </div>
          </v-col>
          <component :is="currentTab" :info="rest" class="pa-4"></component>
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

.explanation {
  font-size: 8px;
}
</style>
