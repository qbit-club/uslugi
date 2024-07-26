<script setup lang="ts">
const cartStore = useCart()

let { cart } = storeToRefs(cartStore)

function plusCart(itemId: string, restId: string) {
  let success = cartStore.plusCart(itemId, restId)

}
function minusCart(itemId: string, restId: string) {
  let success = cartStore.minusCart(itemId, restId)
}
</script>
<template>
  <v-card class="py-2 px-4">
    <div class="cart-item" v-for="restItem of cart">
      <div class="rest-info">
        <h3 style="line-height: 1;">{{ restItem.restInfo.title }}</h3>
        <span class="text-caption" style="line-height: 1;" v-html="restItem.restInfo.schedule"></span>
      </div>
      <div class="item" v-for="item of restItem.items">
        <img :src="item.images[0]" style="width: 80px; aspect-ratio: 1;" />
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="numbers">
            <span style="font-weight: 600;">{{ (item.count * item.price).toFixed(2) }}₽</span>&nbsp;
            <span style="font-weight: 300;">{{ item.health.mass }}</span>
          </div>
        </div>
        <div class="d-flex justify-start align-center ml-4">
          <div class="cart-actions">
            <div class="cart-plus-minus">
              <v-icon icon="mdi-minus" class="cursor-pointer" @click="minusCart(item.menuItemId, restItem.restId)"></v-icon>
              <div class="cart-count">
                {{ item.count }}
              </div>
              <v-icon icon="mdi-plus" class="cursor-pointer" @click="plusCart(item.menuItemId, restItem.restId)"></v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>
<style scoped lang="scss">
.cart-item {
  margin-bottom: 12px;

  .item {
    display: flex;

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
    margin-bottom: 8px;
  }
}

.cart-actions {
  background-color: #E4E4E4;
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
    // min-width: 90px;
}

</style>