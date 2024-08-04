<script setup lang="ts">
const userStore = useAuth()

let tmpOrder = ref<any>()

let res = await userStore.getTemporaryOrder()

if (res.status.value == 'success') tmpOrder.value = res.data.value
</script>
<template>
  <div class="rest-info">
    <h2>{{ tmpOrder?.rest.title }}</h2>
    <div class="d-flex align-center">
      <a :href="tmpOrder?.rest.socialMedia" target="_blank" class="d-flex align-center ml0">
        <img src="../../assets/icons/vk.svg" class="vk" />
      </a>
      <!-- <a :href="`tel:${tmpOrder?.rest.phone}`"><v-icon icon="mdi-phone" class="ml-4" size="20" /></a> -->
      <v-btn variant="outlined" prepend-icon="mdi-phone" class="ml-4" :href="`tel:${tmpOrder?.rest.phone}`" size="small">
        позвонить
      </v-btn>
    </div>
  </div>
  <div class="time">
    {{ new Date(tmpOrder.date) }}
  </div>
</template>
<style scoped lang="scss">
.rest-info {
  display: flex;
  justify-content: space-between;
}
.time {

}
</style>