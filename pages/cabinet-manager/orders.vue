<script setup lang="ts">
import { OrdersSocketAPI } from "~/api/OrdersSocketAPI"
const userStore = useAuth()

const orderStore = useOrder()
let { orders } = storeToRefs(orderStore)

let reversedOrders = computed(() => orders.value.reverse())

async function getOrders() {
  if (userStore.user?.managingRest) {
    OrdersSocketAPI.createOrdersConnection(String(userStore.user?.managingRest))
    await orderStore.getOrdersByRestId(String(userStore.user?.managingRest))
  }
}
watch(() => userStore.user?.managingRest, () => {
  getOrders()
})


await getOrders()
</script>
<template>
  <v-container>
    <v-row class="justify-center pb-16">
      <v-col :cols="12" sm="10" md="8" lg="6" class="pt-0">
        <TransitionGroup name="list">
          <div v-for="(order, index) in reversedOrders" :key="order._id">
            <ManagerOrderCard :order="order" />
          </div>
        </TransitionGroup>
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
