<script lang="ts" setup>
useHead({
  title: 'Рестик'
})

const hallStore = useHall()
const router = useRouter()

let { data } = await hallStore.get()

let halls = ref(data.value)
</script>

<template>
  <v-container>
    <v-row>
      <v-col :cols="9">
        <v-row>
          <v-col :cols="6" v-for="hall of halls">
            <HallCard :hall="hall" />
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="3" >
        <HallFilters />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
