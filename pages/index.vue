<script lang="ts" setup>
useHead({
  title: 'Рестик'
})

const hallStore = useRest()
const router = useRouter()

let { data } = await hallStore.get()

let rests = ref(data.value)
</script>

<template>
  <v-container>
    <v-row>
      <v-col :cols="12" :md="8" :lg="9">
        <v-row>
          <v-col :cols="12" :lg="6" v-for="rest of rests">
            <RestCard :rest="rest" />
          </v-col>
        </v-row>
      </v-col>
      <v-col :cols="0" :md="4" :lg="3" class="d-none d-md-flex">
        <RestFilters />
      </v-col>
    </v-row>
  </v-container>
</template>