<script setup lang="ts">
import type { RestFromDb } from '~/types/rest-from-db.interface';

defineProps<{
    info: RestFromDb
}>()
</script>

<template>
    <div>
        <h3 class="mb-4 mt-4">
            Информация
        </h3>
        <p>
            Описание: <span v-html="info.description"></span>
        </p>
    </div>
</template>
<style lang="scss" scoped></style>
