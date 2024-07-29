import { defineStore } from "pinia"
import { watch } from 'vue'

import CartAPI from "~/api/CartAPI";

// types
import type { FoodListItemFromDb } from "~/types/food-list-item-from-db.interface"
import type { RestFromDb } from './../types/rest-from-db.interface';
import { SocketAPI } from "~/api/SocketAPI";
interface CartItem {
  items: [{
    price: number,
    count: number,
    name: string,
    health: {
      protein: number,
      carb: number,
      fat: number,
      energy: string,
      mass: string,
      ingredients: string
    },
    images: string[],
    menuItemId: string
  }]
  restId: string
  restInfo: {
    title: string,
    phone: string,
    socialMedia: string,
    schedule: string,
    alias: string
  }
}
export const useCart = defineStore('cart', () => {
  let cart = ref<CartItem[]>([])

  if (process.client) {
    cart.value = JSON.parse(String(localStorage.getItem('cart'))) ?? []
  }

  watch(cart, (newVal) => {
    if (process.client) {
      localStorage.setItem('cart', JSON.stringify(newVal))
    }
  }, { deep: true })

  function addToCart(meal: FoodListItemFromDb, rest: RestFromDb): void {
    const itemToPush = {
      price: parseFloat(meal.price),
      count: 1,
      name: meal.name,
      health: meal.health,
      images: meal.images,
      menuItemId: meal._id,
    }
    // если нет такого ресторана в корзине, то создаем его
    // иначе добавляем в список товаров текущий товар
    if (!cart.value.find((o) => o.restId == rest._id)) {
      cart.value.push({
        restId: rest._id,
        restInfo: {
          title: rest.title,
          phone: rest.phone,
          socialMedia: rest.socialMedia,
          schedule: rest.schedule,
          alias: rest.alias
        },
        items: [itemToPush]
      })
    } else {
      for (let i = 0; i < cart.value.length; i++) {
        if (cart.value[i].restId == rest._id) {
          cart.value[i].items.push(itemToPush)
          break
        }
      }
    }
  }
  /**
   * 
   * @param menuItemId 
   * @param restId
   * @returns true if success
   */
  function plusCart(menuItemId: string, restId: string): boolean {
    for (let i = 0; i < cart.value.length; i++) {
      if (cart.value[i].restId == restId) {
        for (let j = 0; j < cart.value[i].items.length; j++) {
          if (cart.value[i].items[j].menuItemId == menuItemId) {
            cart.value[i].items[j].count += 1;
            return true
          }
        }
      }
    }
    return false
  }
  /**
   * 
   * @param menuItemId 
   * @param restId
   * @returns true if success
   */
  function minusCart(menuItemId: string, restId: string): boolean {
    for (let i = 0; i < cart.value.length; i++) {
      if (cart.value[i].restId == restId) {
        for (let j = 0; j < cart.value[i].items.length; j++) {
          if (cart.value[i].items[j].menuItemId == menuItemId) {
            if (cart.value[i].items[j].count > 1) {
              cart.value[i].items[j].count -= 1;
              return true
            }
            if (cart.value[i].items[j].count == 1) {
              cart.value[i].items.splice(j, 1);
              return true
            }
          }
        }
      }
    }
    return false
  }

  function clearRestCart(restId: string) {
    for (let i = 0; i < cart.value.length; i++) {
      if (cart.value[i].restId == restId) {
        cart.value.splice(i, 1)
      }
    }
  }

  async function order(targetAlias: string): Promise<any> {
    for (let item of cart.value) {
      if (item.restInfo.alias == targetAlias) {
        let itemsToSend: {
          price: number,
          count: number,
          menuItem: string
        }[] = []

        for (let i of item.items) {
          itemsToSend.push({
            price: i.price,
            count: i.count,
            menuItem: i.menuItemId
          })
        }
        const userStore = useAuth()
        let response = await CartAPI.order({
          items: itemsToSend,
          rest: item.restId,
          user: String(userStore.user?._id)
        })

        if (response.status.value == 'success') {
          userStore.user = response.data.value.user
          
          if (!SocketAPI.socket?.active) SocketAPI.createOrdersConnection()
          SocketAPI.ordersSocket?.emit("server-create-order", { order: response.data.value.order })
        }
        return response
      }
    }
    return
  }
  return {
    // variables:
    cart,
    // methods:
    addToCart,
    plusCart,
    minusCart,
    clearRestCart,
    order
  }
})
