<script lang="ts" setup>
let navigationDrawer = ref<boolean>(false)
</script>
<template>
  <v-responsive>
    <v-app>

      <v-app-bar :elevation="0">
        <v-row class="d-flex space-between">
          <v-col :cols="2">
            <v-icon icon="$vuetify" class="ml-6"></v-icon>
          </v-col>
          <v-col :cols="8">main content</v-col>
          <v-col :cols="2" class="d-flex justify-end">
            <v-icon icon="mdi-hamburger" class="mr-6" @click="navigationDrawer = !navigationDrawer"/>
          </v-col>
        </v-row>
      </v-app-bar>

      <v-navigation-drawer :model-value="navigationDrawer" location="right" temporary>
        <v-list nav>
          <v-list-item prepend-icon="mdi-email" title="Inbox" value="inbox"></v-list-item>
          <v-list-item prepend-icon="mdi-account-supervisor-circle" title="Supervisors" value="supervisors"></v-list-item>
          <v-list-item prepend-icon="mdi-clock-start" title="Clock-in" value="clockin"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <!-- index.vue goes here -->
        <slot />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped></style>
