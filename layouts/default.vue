<script setup lang="ts">

import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()

const router = useRouter()
let userStore = useAuth()

let navigationDrawer = ref<boolean>(false)

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

let appStore = useApp()
await userStore.checkAuth()
await appStore.getAppState()


const routes = [
  {
    value: '/',
    title: "Выбор ресторана",
    icon: "mdi-home-outline",
    show: true
  },
  {
    value: '/cabinet-user/profile',
    title: "Пользователь",
    icon: "mdi-account-outline",
    show: true
  },
  {
    value: '/cabinet-admin/rest-list',
    title: "Администратор",
    icon: "mdi-shield-crown-outline",
    show: userStore.checkAdmin()

  },
  {
    value: '/cabinet-manager/orders',
    title: "Менеджер",
    icon: "mdi-account-tie-outline",
    show: userStore.checkManager()

  },

]
</script>
<template>
  <v-responsive>
    <v-app class="overflow-y-auto" style="max-height: 100dvh">
      <!-- <v-app-bar :elevation="0" class="d-none d-md-block">
        <div class="w-100 d-flex justify-space-between align-center">

          <div class="flex-grow-1 flex-shrink-0"> 
            <img src="../assets/images/logo.jpg"  alt="logo" @click="router.push('/')"/>
          </div>
          <v-icon icon="mdi-hamburger" class="ma-6" @click="navigationDrawer = !navigationDrawer" />

        </div>

      </v-app-bar> -->
      <div >
        <v-btn icon="mdi-menu" density="comfortable" outlined class="menu-button" @click="navigationDrawer = !navigationDrawer" />
      </div>

      <!-- <v-speed-dial transition="fade-transition" class="d-flex d-md-none">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="canClickOnSpeedDial ? activatorProps : null"
            style="position: fixed; bottom: 40px; right:20px; z-index: 999;" icon="mdi-menu" class="d-flex d-md-none"
            @click="ensureCanClick"></v-btn>
        </template>

        <v-btn key="1" to="/" icon="mdi-home-outline"></v-btn>
        <v-btn key="2" to="/cabinet-user/profile" icon="mdi-account-outline"></v-btn>
        <v-btn key="3" to="/cabinet-admin/rest-list" icon="mdi-shield-crown-outline"></v-btn>
        <v-btn key="4" to="/cabinet-manager/orders" icon="mdi-account-tie-outline"></v-btn>

      </v-speed-dial> -->


      <ClientOnly>

        <v-navigation-drawer :model-value="navigationDrawer" location="bottom" :mobile="false" elevation="22">
          <v-container>
            <v-row class="justify-center">
              <v-col cols="12" md="6">

                <v-list nav>
                  <v-list-item v-for="route of routes" :prepend-icon="route.icon" :to="route.value" :value="route.value"
                    @click="navigationDrawer = false">
                    <div v-if="route.show" style="font-size: 0.8rem;font-weight: 500;"> {{ route.title }}</div>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
        </v-navigation-drawer>



      </ClientOnly>

      <v-main class="main">
        <!-- pages go here -->
        <NuxtPage />
        <!-- pages go here -->
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped lang="scss">
.menu-button {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999;
}

.logo {
  position: fixed;
  top: 25px;
  left: 25px;
  padding: 5px;
  border-radius: 50%;
  width: 50px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(255, 255, 255, 0.7);
}
</style>
