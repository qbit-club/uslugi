<script setup>
definePageMeta({
    middleware: 'is-admin'
})

</script>
<template>
    <v-container>
        <v-row>
            <v-col :cols="12">
                <h2>Администратор</h2>
            </v-col>
            <v-col :cols="12" class="d-flex overflow-x-auto">
                <v-btn-toggle color="secondary" style="height:60px" class="d-flex overflow-x-auto">
                    <v-btn to="/cabinet-admin/create-rest" class="d-flex">
                        <div class="d-flex flex-column align-center pa-4">
                            <v-icon icon="mdi-table-chair" size="x-large" />
                            <div class="explanation text-center">создать <br> ресторан</div>
                        </div>
                    </v-btn>
                    <!-- <NuxtLink to="/cabinet-admin/create-hall" class="d-flex">
                        <div class="d-flex flex-column align-center pa-4">
                            <v-icon icon="mdi-table-picnic" size="x-large" />
                            <div class="explanation text-center">создать <br> зал</div>
                        </div>
                    </NuxtLink> -->
                    <v-btn to="/cabinet-admin/manage-category" class="d-flex">
                        <div class="d-flex flex-column align-center pa-4">
                            <v-icon icon="mdi-tune-variant" size="x-large" />
                            <div class="explanation text-center">управлять <br> категориями</div>
                        </div>
                    </v-btn>
                    <v-btn to="/cabinet-admin/add-manager" class="d-flex">
                        <div class="d-flex flex-column align-center pa-4">
                            <v-icon icon="mdi-account-plus-outline" size="x-large" />
                            <div class="explanation text-center">добавить <br> менеджера</div>
                        </div>
                    </v-btn>
                    <!-- <NuxtLink to="/cabinet-admin/orders" class="d-flex">
                        <div class="d-flex flex-column align-center pa-4">
                            <v-icon icon="mdi-cart-check" size="x-large" />
                            <div class="explanation text-center">заказы</div>
                        </div>
                    </NuxtLink> -->
                    <v-btn to="/cabinet-admin/rest-list" class="d-flex">
                        <div class="d-flex flex-column align-center pa-4">
                            <v-icon icon="mdi-silverware-fork-knife" size="x-large" />
                            <div class="explanation text-center"> список <br> ресторанов</div>
                        </div>
                    </v-btn>
                </v-btn-toggle>

            </v-col>
            <v-col :cols="12">
                <NuxtPage />
            </v-col>

        </v-row>

    </v-container>
</template>
