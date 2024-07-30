<script setup lang="ts">
const emit = defineEmits(['closeDialog'])

const cartStore = useCart()

let { cart } = storeToRefs(cartStore)
const route = useRoute()

function plusCart(itemId: string, restId: string) {
  let success = cartStore.plusCart(itemId, restId)
}
function minusCart(itemId: string, restId: string) {
  let success = cartStore.minusCart(itemId, restId)
}
function clearRestCart(restId: string) {
  cartStore.clearRestCart(restId)
  emit('closeDialog')
}

let amount = computed(() => {
  let res = 0.0
  for (let restItem of cart.value) {
    if (restItem.restInfo.alias == route.params.alias) {
      for (let item of restItem.items) {
        res += item.count * item.price
      }
    }
  }
  return res.toFixed(2)
})

let restItem = computed<any>(() => {
  for (let i of cart.value) {
    if (i.restInfo.alias == route.params.alias) {
      return i
    }
  }
  return {}
})

let loading = ref(false)
async function order() {
  loading.value = true
  let response = await cartStore.order(String(route.params.alias))
  if (response.status.value == 'success') {
    loading.value = false
    emit('closeDialog')
  }
}
</script>
<template>
  <v-card class="py-5 px-6">
    <div class="cart-item" v-if="restItem?.restId">
      <div class="rest-info">
        <div class="d-flex flex-column justify-space-between">
          <h3 style="line-height: 1">{{ restItem.restInfo.title }}</h3>
          <span class="text-caption" style="line-height: 1" v-html="restItem.restInfo.schedule"></span>
        </div>
        <div class="d-flex align-center">
          <a :href="restItem.restInfo.socialMedia" target="_blank" class="d-flex align-center ml-4">
            <img src="../../assets/icons/vk.svg" class="vk" />
          </a>
          <a :href="`tel:${restItem.restInfo.phone}`"><v-icon icon="mdi-phone" class="ml-4" size="20" /></a>
        </div>
        <div class="d-flex align-center ml-6">
          <v-btn variant="plain" @click="clearRestCart(restItem.restId)"> очистить </v-btn>
        </div>
      </div>
      <div class="item" v-for="item of restItem.items">
        <img :src="item.images[0]" style="width: 80px; aspect-ratio: 1" />
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="numbers">
            <span style="font-weight: 600">{{ (item.count * item.price).toFixed(2) }}₽</span>&nbsp;
            <span style="font-weight: 300">{{ item.health.mass }}</span>
          </div>
        </div>
        <div class="d-flex justify-start align-center ml-4">
          <div class="cart-actions">
            <div class="cart-plus-minus">
              <v-icon
                icon="mdi-minus"
                class="cursor-pointer"
                @click="minusCart(item.menuItemId, restItem.restId)"
              ></v-icon>
              <div class="cart-count">
                {{ item.count }}
              </div>
              <v-icon
                icon="mdi-plus"
                class="cursor-pointer"
                @click="plusCart(item.menuItemId, restItem.restId)"
              ></v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-center align-center pb-6" style="font-weight: 600;">
      <v-icon icon="mdi-cart-remove"></v-icon>
      пусто
    </div>
    <div class="d-flex justify-space-between">
      <v-btn variant="tonal" size="large" @click="order" :loading="loading">заказать</v-btn>
      <div class="amount d-flex align-center">
        {{ amount }}₽
      </div>
    </div>
  </v-card>
</template>
<style scoped lang="scss">
.cart-item {
  margin-bottom: 38px;
  width: 100%;

  .item {
    display: flex;
    justify-content: space-between;
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 16px;
      margin-left: 10px;

      .name {
        margin-top: 8px;
      }

      .numbers {
        margin-bottom: 12px;
        font-size: 12px;
      }
    }
  }

  .rest-info {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
  }
}

.cart-actions {
  background-color: #e4e4e4;
  border-radius: 14px;
  display: flex;
  align-items: center;
  padding: 8px;
  width: fit-content;

  .cart-plus-minus {
    font-size: 14px;
    display: flex;
    align-items: center;

    .cart-count {
      font-weight: 600;
      font-size: 16px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.amount {
  font-size: 20px !important;
  font-weight: 500 !important;
  margin-left: 8px;
}
.vk {
  height: 20px;
}
</style>
