<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const authStore = useAuth()
const router = useRouter()

let { user } = storeToRefs(authStore)
await authStore.getUserRests()
</script>
<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <div class="avatar-container">
          <div class="w-100 d-flex justify-center mb-3 mt-2">
            <v-avatar size="100" class="gradient">
            </v-avatar>
          </div>
          <h4 class="text-center">{{ user?.name }}</h4>
        </div>
      </v-col>
      <v-col :cols="12">
        <v-row>
          <v-col :cols="12" v-for="rest of user?.rests">
            <v-card>
              <v-card-title>
                {{ rest.title }}
              </v-card-title>
              <v-card-text>
                {{ rest }}
              </v-card-text>
              <v-card-actions>
                <v-btn variant="tonal" @click="router.push(`/add-tables?rest_id=${rest._id}`)">
                  <v-icon icon="mdi-table-chair"></v-icon>
                </v-btn>
                <v-btn variant="tonal" @click="router.push(`/change-menu?alias=${rest.alias}`)">
                  <v-icon icon="mdi-silverware"></v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">

        Что делает пользователь:
        <ul>
          <li>Редактирует свои данные кроме почты</li>
          <li>Просматривает свои заказы</li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.avatar-container {
  display: flex;
  flex-direction: column;
}

.gradient {
  background: linear-gradient(90deg, rgba(41, 182, 246, 1) 0%, rgba(3, 155, 229, 1) 35%, rgba(2, 136, 209, 1) 100%);
  // background: linear-gradient(90deg, rgba(79,195,247,1) 0%, rgba(41,182,246,1) 41%);

}
</style>