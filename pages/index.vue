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
      <v-col :cols="12" :md="8" :lg="9">
        <v-row>
          <v-col :cols="12" :lg="6" v-for="hall of halls">
            <HallCard :hall="hall" />
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="0" :md="4" :lg="3" class="d-none d-md-flex">
        <HallFilters />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
