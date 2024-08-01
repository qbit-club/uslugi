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
  <v-container>
    <v-row class="justify-center pb-16">
      <v-col :cols="12" sm="10" md="8" lg="6" class="pt-0">
        <div v-for="(order, index) in orders">
          <h3>Дата заказа</h3>
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
              </b></i
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
