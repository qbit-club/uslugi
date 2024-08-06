<script setup lang="ts">
definePageMeta({
  middleware: 'is-manager'
})

const userStore = useAuth()
const restStore = useRest()

let managerIn = await userStore.getManagerIn()
let currentRest = ref<string>(userStore.user?.managingRest || "")
let isHidden = ref<boolean>(managerIn.find((rest:any)=>rest.id=currentRest).isHidden)

async function refreshHide(){
  managerIn = await userStore.getManagerIn()
  isHidden.value=managerIn.find((rest:any)=>rest.id=currentRest).isHidden
}
async function hideRest(){
  await restStore.hideRest(currentRest.value)
  await refreshHide()
}

watch(currentRest, async (newVal) => {
  await userStore.chooseManagingRest(String(newVal))
  currentRest.value = userStore.user?.managingRest || ""
  await refreshHide()
})
</script>
<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h2>Кабинет менеджера</h2>
      </v-col>
      <v-col cols="12" md="6" xl="4" class="d-flex">
        <v-select v-model="currentRest" :items="managerIn" item-title="title" item-value="_id" variant="outlined" density="compact"></v-select>
      </v-col>
      <v-col :cols="12" class="d-flex overflow-x-auto">
        <NuxtLink to="/cabinet-manager/orders" class="d-flex">
          <div class="tab pa-4">
            <v-icon icon="mdi-cart-check" size="x-large" />
            <div class="explanation text-center">заказы</div>
          </div>
        </NuxtLink>
        <!-- <NuxtLink to="/cabinet-manager/table-reservation" class="d-flex">
          <div class="tab pa-4">
            <v-icon icon="mdi-table-chair" size="x-large" />
            <div class="explanation text-center">
              бронирование <br />
              столиков
            </div>
          </div>
        </NuxtLink> -->
        <NuxtLink to="/cabinet-manager/create-meal" class="d-flex">
          <div class="tab pa-4">
            <v-icon icon="mdi-bowl-mix-outline" size="x-large" />
            <div class="explanation text-center">
              создать <br />
              блюдо
            </div>
          </div>
        </NuxtLink>
        <NuxtLink to="/cabinet-manager/manage-menu" class="d-flex">
          <div class="tab pa-4">
            <v-icon icon="mdi-food-outline" size="x-large" />
            <div class="explanation text-center">
              управлять <br />
              меню
            </div>
          </div>
        </NuxtLink>
        <NuxtLink to="/cabinet-manager/rest-info" class="d-flex">
          <div class="tab pa-4">
            <v-icon icon="mdi-tune-variant" size="x-large" />
            <div class="explanation text-center">
              информация <br />
              о ресторане
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/cabinet-manager/add-manager" class="d-flex">
          <div class="tab pa-4">
            <v-icon icon="mdi-account-plus-outline" size="x-large" />
            <div class="explanation text-center">
              добавить <br />
              менеджера
            </div>
          </div>
        </NuxtLink>
        <NuxtLink to="/cabinet-manager/manage-email-list" class="d-flex">
          <div class="tab pa-4">
            <v-icon icon="mdi-email-fast-outline" size="x-large" />
            <div class="explanation text-center">
              email список <br />
              для уведомлений
            </div>
          </div>
        </NuxtLink>

          <div class="tab pa-4 cursor-pointer" :class="{'show-hide': isHidden}" @click="hideRest()">
            <div class="explanation text-center">
               ресторан
            </div>
            <v-icon :icon="isHidden ?'mdi-eye-off-outline': 'mdi-eye-outline'" size="x-large" />
            <div class="explanation text-center">
               {{isHidden ? 'показать' : 'скрыть'}} 
            </div>
          </div>

      </v-col>
     

      <v-col :cols="12">
        <NuxtPage />
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.tab{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.show-hide{
  color: red;
}
</style>
