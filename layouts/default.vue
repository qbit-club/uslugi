<script lang="ts" setup>
const router = useRouter()

let navigationDrawer = ref<boolean>(false)

const routes = [
  {
    value: '/hall/create',
    title: "Создать зал",
    icon: "mdi-table-chair"
  }
]

function navigateTo(route: any) {  
  router.push(route.id)
}
</script>
<template>
  <v-responsive>
    <v-app>

      <v-app-bar :elevation="0">
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

      <ClientOnly>
        <v-navigation-drawer :model-value="navigationDrawer" location="right" temporary>
          <v-list nav @click:select="navigateTo">
            <v-list-item v-for="route of routes" :prepend-icon="route.icon" :title="route.title" :value="route.value"></v-list-item>
          </v-list>
        </v-navigation-drawer>
      </ClientOnly>

      <v-main>
        <!-- index.vue goes here -->
        <slot />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped></style>
