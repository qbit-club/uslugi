<script setup lang="ts">
import { OrdersSocketAPI } from "~/api/OrdersSocketAPI"
const userStore = useAuth()

const orderStore = useOrder()
let { orders } = storeToRefs(orderStore)

let reversedOrders = computed(() => orders.value.reverse())

let getDate = (d: string) => {
  let t = new Date(d)
  return t.toLocaleString("ru-RU", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })
}
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
            <v-badge floating dot color="success" v-if="order.new">
              <h3>{{ getDate(order.date) }}</h3>
            </v-badge>
            <h3 v-else>{{ getDate(order.date) }}</h3>
            <div class="user-info"><v-icon icon="mdi-account-outline"></v-icon>{{ order.user.name }}</div>
            <div class="user-info">
              <v-icon icon="mdi-phone-outline"></v-icon><a :href="'tel:' + order.user.phone"
                class="font-weight-medium">{{ order.user.phone }}</a>
            </div>
            <div class="user-info"><v-icon icon="mdi-home-city-outline"></v-icon>{{ order.user.address }}</div>
            <div class="user-info"><v-icon icon="mdi-paperclip"></v-icon>{{ order.user.comment }}</div>
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

.user-info {
  display: flex;

  align-items: center;

  .v-icon {
    font-size: 16px;
    margin-right: 4px;
  }
}
</style>
