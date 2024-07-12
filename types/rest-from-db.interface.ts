import type { Rest } from "./rest.interface"
import type { FoodListItemFromDb } from "./food-list-item-from-db.interface"

export interface RestFromDb extends Rest {
  _id: string
  images: string[]
  menu: string[]
  foodList: FoodListItemFromDb[]
}