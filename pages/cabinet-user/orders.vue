<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})

const authStore = useAuth()
const cartStore = useCart()

let { user } = storeToRefs(authStore)
let orders = ref<any[]>()


onMounted(async () => {

    let res = await cartStore.getOrdersByOrdersId(user.value?.orders)
    orders.value = res.data.value
})


</script>

<template>
    <v-container>
        <v-row class="justify-center pb-16">

            <v-col :cols="12" sm="10" md="8" lg="6" class="pt-0">
                <div v-for="(item, index) in orders">
                    <div class="text-center text-uppercase  font-weight-bold ma-4 " :id="item.rest">
                        {{ item.rest }}
                    </div>

                    <div v-for="(order, i) in item.orders">
                        <h3>Дата заказа</h3>
                        <div v-for="item, j in order.items" class="d-flex justify-space-between">
                            <span>{{ item.menuItem }}</span> <span>{{ item.count }} * {{ item.price }} = {{ (item.count
                * item.price).toFixed(2) }}
                            </span>

                        </div>
                        <v-divider></v-divider>
                        <div class="text-end"><i> <b> Итого: {{ order.items.reduce((accumulator: number,
                current: any) => accumulator + current.count * current.price, 0) }} </b></i> 
                        </div>
                    </div>

                </div>

            </v-col>
        </v-row>
    </v-container>
</template>