<script setup lang="ts"></script>
<template>
  <v-container>
    <v-row>
      <v-col :cols="12" :md="4">
        <div class="avatar">
          <div class="w-100 d-flex justify-center mb-3 mt-2">
            <v-avatar size="100" class="gradient">
            </v-avatar>
          </div>
          <h4 class="text-center">Григорий Дзюин</h4>
        </div>
        надо сделать классные карточки с классным градиентом
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss" scoped>
.avatar {
  display: flex;
  flex-direction: column;
}
.gradient {
  background: linear-gradient(90deg, rgba(41,182,246,1) 0%, rgba(3,155,229,1) 35%, rgba(2,136,209,1) 100%);
}
</style>