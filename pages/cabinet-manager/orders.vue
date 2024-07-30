<script setup lang="ts">
import { OrdersSocketAPI } from "~/api/OrdersSocketAPI"
const userStore = useAuth()

const orderStore = useOrder()
let { orders } = storeToRefs(orderStore)

if (userStore.user?.managingRest) {
  OrdersSocketAPI.createOrdersConnection(String(userStore.user?.managingRest))
  await orderStore.getOrdersByRestId(String(userStore.user?.managingRest))
}
</script>
<template>
  <div>
    {{ orders }}
  </div>
</template>
