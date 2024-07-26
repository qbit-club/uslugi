import { defineStore } from "pinia"

// types
import type { FoodListItemFromDb } from "~/types/food-list-item-from-db.interface"
interface CartItem {
  menuItemId: string
  price: number
  count: number
  restId: string
}
export const useCart = defineStore('cart', () => {
  let cart = ref<CartItem[]>([])

  function addToCart(meal: FoodListItemFromDb, restId: string): void {
    cart.value.push({
      menuItemId: meal._id,
      price: parseFloat(meal.price),
      count: 1, 
      restId
    })
  }
  /**
   * 
   * @param _id 
   * @param restId
   * @returns true if success
   */
  function plusCart(_id: string, restId: string): boolean {
    for (let i = 0; i < cart.value.length; i++) {
      if (cart.value[i].menuItemId == _id && cart.value[i].restId == restId) {
        cart.value[i].count += 1
        return true
      }
    }
    return false
  }
  /**
   * 
   * @param _id
   * @param restId
   * @returns true if success
   */
  function minusCart(_id: string, restId: string): boolean {
    for (let i = 0; i < cart.value.length; i++) {
      if (cart.value[i].menuItemId == _id && cart.value[i].restId == restId) {
        if (cart.value[i].count > 1)  {
          cart.value[i].count -= 1
          return true
        }
        if (cart.value[i].count == 1) {
          cart.value.splice(i, 1)
          return true
        }
      }
    }
    return false
  }
  return {
    // variables:
    cart,
    // methods:
    addToCart,
    plusCart,
    minusCart
  }
})
