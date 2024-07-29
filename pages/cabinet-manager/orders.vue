<script setup lang="ts">
import { SocketAPI } from '~/api/SocketAPI';
const userStore = useAuth()

SocketAPI.createOrdersConnection(String(userStore.user?.managingRest))
</script>
<template>заказы</template>