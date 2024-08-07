<script setup lang="ts">
import type { OrderFromDb } from '@/types/order-from-db.interface'

const orderStore = useOrder()
let props = defineProps<{
  order: OrderFromDb,
}>()

let getDate = (d: string) => {
  let t = new Date(d)
  return t.toLocaleString("ru-RU", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  })
}

let orderStatus = ref<string>(String(props.order.status) ?? 'created')
let loading = ref(false)
watch(orderStatus, async (newStatus) => {
  loading.value = true
  let res = await orderStore.changeStatus(props.order._id, newStatus)
  if (res.status.value == 'success') loading.value = false
})
</script>
<template>
  <v-badge floating dot color="success" v-if="order.new">
    <h3>{{ getDate(order.date) }}</h3>
  </v-badge>
  <h3 v-else>{{ getDate(order.date) }}</h3>
  <v-radio-group inline v-model="orderStatus" :hide-details="true" :disabled="loading">
    <v-radio label="Создан" value="created" color="accent"></v-radio>
    <v-radio label="В работе" value="inWork" color="primary"></v-radio>
    <v-radio label="В пути" value="inDelivery" color="secondary"></v-radio>
    <v-radio label="Доставлен" value="delivered" color="success"></v-radio>
  </v-radio-group>

  <div class="d-flex flex-wrap mt-4 mb-4">
    <div><v-icon icon="mdi-account-outline"></v-icon>{{ order.user.name }}</div>
    <div>
      <v-icon icon="mdi-phone-outline"></v-icon><a :href="'tel:' + order.user.phone">{{
    order.user.phone }}</a>
    </div>
    <div><v-icon icon="mdi-home-city-outline"></v-icon>{{ order.user.address }}</div>
    <div><v-icon icon="mdi-paperclip"></v-icon>{{ order.user.comment }}</div>
  </div>


  <div v-for="(item, j) in order.items" class="d-flex justify-space-between ">
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
    ).toFixed(2)
        }}
      </b></i>
  </div>
</template>
<style scoped>
.user-info {
  font-size: 0.8rem;
  font-weight: 500;
  padding: 5px;
}
</style>