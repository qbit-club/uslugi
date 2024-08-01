<script setup lang="ts">
import { OrdersSocketAPI } from "~/api/OrdersSocketAPI"
const userStore = useAuth()

const orderStore = useOrder()
let { orders } = storeToRefs(orderStore)

let reversedOrders = computed(() => orders.value.reverse())

let getDate = (d: string) => {
  let t = new Date(d)
  return t.toLocaleString('ru-RU', {
    month: 'short',
    day: "numeric",
    hour: 'numeric',
    minute: 'numeric',
  })
}

if (userStore.user?.managingRest) {
  OrdersSocketAPI.createOrdersConnection(String(userStore.user?.managingRest))
  await orderStore.getOrdersByRestId(String(userStore.user?.managingRest))
}
</script>
<template>
  <v-container>
    <v-row class="justify-center pb-16">
      <v-col :cols="12" sm="10" md="8" lg="6" class="pt-0">
        <TransitionGroup name="list">
          <div v-for="(order, index) in reversedOrders" :key="order._id">
            <v-badge floating dot color="success" v-if="order.new">
              <h3>{{ getDate(order.date) }}</h3>
            </v-badge>
            <h3 v-else>{{ getDate(order.date) }}</h3>
            <div v-for="(item, j) in order.items" class="d-flex justify-space-between">
              <span>{{ item.menuItem }}</span>
              <span>{{ item.count }} * {{ item.price }} = {{ (item.count * item.price).toFixed(2) }} </span>
            </div>
            <v-divider></v-divider>
            <div class="text-end">
              <i>
                <b>
                  Итого:
                  {{
                    order.items.reduce(
                      (accumulator: number, current: any) => accumulator + current.count * current.price,
                      0
                    )
                  }}
                </b></i>
            </div>
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
</style>