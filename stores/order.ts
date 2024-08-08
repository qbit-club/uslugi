import { defineStore } from "pinia";
import CartAPI from "~/api/CartAPI";
import type { OrderFromDb } from "~/types/order-from-db.interface";
const OrderAPI = CartAPI;
// interfaces

export const useOrder = defineStore("order", () => {
  let orders = ref<any>([]);
  let hasMoreOrders = ref<boolean>(true);

  async function getOrdersByRestId(restId: string, page: number) {
    let res = await OrderAPI.getOrdersByRestId(restId, page);


    if (res.status.value == "success") {
      // 30 - это лимит пагинации на сервере 
     if(page == 1)  {
      hasMoreOrders.value = true;
      orders.value = res.data.value
     } else {
      orders.value.push(...res.data.value)
     }
     res.data.value.length < 30 ? (hasMoreOrders.value = false) : "";
    }
    return res;
  }

  function pushOrder(order: OrderFromDb) {
    orders.value.push({ ...order, new: true });
  }

  async function changeStatus(orderId: string, status: string) {
    return await OrderAPI.changeStatus(orderId, status);
  }
  return {
    // functions
    getOrdersByRestId,
    pushOrder,
    changeStatus,
    // variables
    orders,
    hasMoreOrders,
  };
});
