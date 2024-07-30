import { defineStore } from "pinia"
import CartAPI from "~/api/CartAPI";
const OrderAPI = CartAPI
// interfaces


export const useOrder = defineStore('order', () => {
  let orders = ref<any>([])

  async function getOrdersByRestId(restId: string) {
    let res = await OrderAPI.getOrdersByRestId(restId)
    
    if (res.status.value == 'success') {
      orders.value = res.data.value
    }
    return res
  }
  return {
    // functions
    getOrdersByRestId,
    // variables
    orders,
  }
})