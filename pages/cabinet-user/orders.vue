<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const authStore = useAuth()
const cartStore = useCart()

let { user } = storeToRefs(authStore)
let { cart } = storeToRefs(cartStore)

let orders = cartStore.getOrdersByOrdersId(user.orders)

</script>

<template>
    {{ user.orders}}
</template>