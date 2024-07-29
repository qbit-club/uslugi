<script setup lang="ts">
import { OrdersSocketAPI } from '~/api/OrdersSocketAPI';
const userStore = useAuth()

OrdersSocketAPI.createOrdersConnection(String(userStore.user?.managingRest))
</script>
<template>заказы</template>