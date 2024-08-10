<script setup lang="ts">
import { OrdersSocketAPI } from "~/api/OrdersSocketAPI"
const userStore = useAuth()

const orderStore = useOrder()
let { orders, hasMoreOrders } = storeToRefs(orderStore)
let page = 1
let loading = ref(true)
async function getOrders() {
  if (userStore.user?.managingRest) {
    OrdersSocketAPI.createOrdersConnection(String(userStore.user?.managingRest))
    await orderStore.getOrdersByRestId(String(userStore.user?.managingRest), page)
  }
}

async function nextOrders() {
  page++;
  await orderStore.getOrdersByRestId(String(userStore.user?.managingRest), page)
 
}

watch(() => userStore.user?.managingRest, () => {
  page = 1
  loading.value = true
  getOrders()
  loading.value = false
})


await getOrders()
loading.value = false
</script>
<template>
  <v-container>
    <v-row class="justify-center pb-16">
      <v-col cols="12" class="d-flex justify-center" v-if="loading">
          <img src="~/assets/icons/kvak.gif" alt="">
        </v-col>
      <v-col :cols="12" sm="10" class="pt-0"> 
        <TransitionGroup name="list">
          <div v-if="!loading" v-for="(order, index) in orders" :key="order._id">
            <ManagerOrderCard :order="order" />
          </div>
        </TransitionGroup>
      </v-col>
     
      <v-col cols="12" class="d-flex justify-center" v-if="hasMoreOrders">
        <v-btn size="large" variant="flat" color="primary" @click="nextOrders">ещё</v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>
<style scoped lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.user-info {
  display: flex;

  align-items: center;

  .v-icon {
    font-size: 16px;
    margin-right: 4px;
  }
}
</style>
