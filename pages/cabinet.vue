<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const authStore = useAuth()

let { user } = storeToRefs(authStore)
</script>
<template>
  <v-container>
    <v-row>
      <v-col :cols="12" :md="4">
        <div class="avatar-container">
          <div class="w-100 d-flex justify-center mb-3 mt-2">
            <v-avatar size="100" class="gradient">
            </v-avatar>
          </div>
          <h4 class="text-center">{{ user?.name }}</h4>
        </div>
      </v-col>
      <v-col :cols="12" :md="4">
        <div class="rests-container">
          <b class="text-white">
            {{ user }}
          </b>
        </div>
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

.rests-container {
  // background: linear-gradient(90deg, rgba(41,182,246,1) 0%, rgba(3,155,229,1) 35%, rgba(2,136,209,1) 100%);
  // background: linear-gradient(90deg, rgba(79,195,247,1) 0%, rgba(41,182,246,1) 41%);
  background: linear-gradient(90deg, rgba(79, 195, 247, 1) 0%, rgba(3, 155, 229, 1) 50%);

  border-radius: 20px;
  padding: 16px;
}
</style>