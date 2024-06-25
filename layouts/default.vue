<script lang="ts" setup>
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()

const router = useRouter()

let navigationDrawer = ref<boolean>(false)

const routes = [
{
    value: '/cabinet',
    title: "Я",
    icon: "mdi-account-outline"
  },
  {
    value: '/rest/create',
    title: "Создать зал",
    icon: "mdi-table-chair"
  },
]

function navigateTo(route: any) {
  router.push(route.id)
}
// создает timeout, после которого можно нажать на кнопку,
// без этой функции анимация открытия ломается
let canClickOnSpeedDial = ref(true)
// если не верите - закомментируйте тело функции и нажмите очень много раз
function ensureCanClick() {
  if (canClickOnSpeedDial.value == false) return 
  canClickOnSpeedDial.value = false
  setTimeout(() => {
    canClickOnSpeedDial.value = true
  }, 400)
}
</script>
<template>
  <v-responsive>
    <v-app>
      <v-app-bar :elevation="0" class="d-none d-md-flex">
        <v-row class="d-flex space-between">
          <v-col :cols="2">
            <v-icon icon="$vuetify" class="ml-6" @click="router.push('/')"></v-icon>
          </v-col>
          <v-col :cols="8">main content</v-col>
          <v-col :cols="2" class="d-flex justify-end">
            <v-icon icon="mdi-hamburger" class="mr-6" @click="navigationDrawer = !navigationDrawer" />
          </v-col>
        </v-row>
      </v-app-bar>

      <v-speed-dial transition="fade-transition" class="d-flex d-md-none">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="canClickOnSpeedDial ? activatorProps : null"
            style="position: fixed; bottom: 40px; right:20px; z-index: 999;" icon="mdi-hamburger"
            class="d-flex d-md-none" @click="ensureCanClick"></v-btn>
        </template>

        <v-btn key="2" @click="router.push('/')" icon="mdi-home-outline"></v-btn>
        <v-btn key="2" @click="router.push('/cabinet')" icon="mdi-account-outline"></v-btn>
        <v-btn key="1" @click="router.push('/rest/create')" icon="mdi-table-chair"></v-btn>
      </v-speed-dial>

      <ClientOnly>
        <!-- только на экранах md и больше, потому что на телефоне можно свайпнуть и navigation-drawer появится -->
        <v-navigation-drawer v-if="width > 960" :model-value="navigationDrawer" location="right" temporary>
          <v-list nav @click:select="navigateTo">
            <v-list-item v-for="route of routes" :prepend-icon="route.icon" :title="route.title"
              :value="route.value"></v-list-item>
          </v-list>
        </v-navigation-drawer>
      </ClientOnly>

      <v-main class="main">
        <!-- pages go here -->
        <slot />
        <!-- pages go here -->
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped lang="scss">
@media (max-width: 960px) {
  .main {
    padding-top: 0px;
  }
}
@media (min-width: 960px) {
  .main {
    padding-top: 64px;
  }
}
</style>
