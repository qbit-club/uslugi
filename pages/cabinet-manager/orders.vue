<script setup lang="ts">
import { OrdersSocketAPI } from "~/api/OrdersSocketAPI"
const userStore = useAuth()

OrdersSocketAPI.createOrdersConnection(String(userStore.user?.managingRest))

const orderStore = useOrder()
let { orders } = storeToRefs(orderStore)

await orderStore.getOrdersByRestId(String(userStore.user?.managingRest))
</script>
<template>
  <div>
    {{ orders }}
  </div>
</template>
