<script lang="ts" setup>
// meta
useHead({
  title: "Редактировать ресторан",
});
definePageMeta({
  middleware: "auth",
});

const restStore = useRest();
const router = useRouter();


let response = await restStore.getById(String(router.currentRoute.value.query.rest_id))
let restFromDb = response.data.value;
</script>
<template>
  <EditRest :rest="restFromDb"></EditRest>
</template>