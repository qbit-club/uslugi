<script setup lang="ts">
</script>
<template>
  <ManagerEmailsList :mail-type="'order'">
    <template v-slot:title>Уведомления о заказе</template>
    <template v-slot:caption>введите email пользователя, которому будет приходить письмо о заказе</template>
  </ManagerEmailsList>
</template>
