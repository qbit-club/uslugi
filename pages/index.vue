<script lang="ts" setup>
useHead({
  title: 'Рестик'
})

const router = useRouter()
</script>

<template>
  <v-row>
    <v-col :cols="12">
      <v-btn block @click="router.push('/hall/create')" class="ma-6 bg-blue h-200">создать зал</v-btn>
    </v-col>
  </v-row>
</template>

<style scoped></style>
