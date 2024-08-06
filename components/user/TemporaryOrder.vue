<script setup lang="ts">
const userStore = useAuth()

let tmpOrder = ref<any>()

let res = await userStore.getTemporaryOrder()

if (res.status.value == 'success') tmpOrder.value = res.data.value

let amount = computed(() => {
  let res = 0.0
  for (let i of tmpOrder.value.items) {
    res += i.price * i.count
  }
  return res.toFixed(2)
})

function getDate(date: string) {
  return new Date(date).toLocaleString('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
  })
}
</script>
<template>
  <v-row class="justify-center" v-if="tmpOrder?._id">
    <v-col cols="12" sm="10" md="8" lg="6">
      <div class="order-container" >
        <div class="rest-info">
          <h2>{{ tmpOrder?.rest.title }}</h2>
          <div class="d-flex align-center">
            <a :href="tmpOrder?.rest.socialMedia" target="_blank" class="d-flex align-center">
              <img src="../../assets/icons/vk.svg" class="vk" />
            </a>
            <!-- <a :href="`tel:${tmpOrder?.rest.phone}`"><v-icon icon="mdi-phone" class="ml-4" size="20" /></a> -->
            <v-btn variant="outlined" prepend-icon="mdi-phone" class="ml-4" :href="`tel:${tmpOrder?.rest.phone}`"
              size="small">
              позвонить
            </v-btn>
          </div>
        </div>
        <div class="time">
          {{ getDate(tmpOrder.date) }}
        </div>
        <div class="status-container">
          <b>
            огромная картинка лягушки, которая меняется в зависимости от статуса
          </b>
        </div>
        <div class="cart-container">
          <v-row>
            <v-col cols="12" md="6" v-for="item of tmpOrder.items" class="d-flex">
              <img :src="item.images[0]" style="width: 90px; aspect-ratio: 1" />
              <div class="item-info">
                <div class="name">
                  {{ item.menuItem }}
                </div>
                <div class="price">
                  {{ item.price }}₽
                </div>
              </div>
              <div class="x-number">
                x{{ item.count }}
              </div>
            </v-col>
          </v-row>
          <div class="amount">
            Итого: {{ amount }}₽
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<style scoped lang="scss">
.order-container {
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 40px;
}

.status-container {
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rest-info {
  display: flex;
  justify-content: space-between;
}

.item-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;

  .name {
    font-size: clamp(1rem, 0.8011rem + 0.5682vw, 1.25rem);
    font-weight: 600;

  }

  .price {
    font-size: clamp(0.75rem, 0.5511rem + 0.5682vw, 1rem);
  }
}

.x-number {
  height: 100%;
  font-weight: 600;
  font-size: clamp(1.25rem, 1.0511rem + 0.5682vw, 1.5rem);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  word-break: keep-all;
}

.amount {
  display: flex;
  justify-content: end;
  font-weight: 600;
  margin-top: 40px;
}
</style>