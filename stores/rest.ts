import { defineStore } from "pinia"
import RestApi from '../api/RestApi'

// interfaces
import type { Rest } from "../types/rest.interface"
import type { FoodListItemFromDb } from "~/types/food-list-item-from-db.interface"
import type { FoodListItem } from "~/types/food-list-item.interface"

export const useRest = defineStore('rest', () => {
  // let halls = ref<Hall[] | []>()

  async function create(rest: Rest) {
    return await RestApi.create(rest)
  }

  async function get() {
    return await RestApi.get()
  }
  async function deleteRest(rest_id: string) {
    return await RestApi.deleteRest(rest_id)
  }
  async function getByAlias(alias: string) {
    return await RestApi.getByAlias(alias)
  }
  async function uploadImages(formData: FormData, restId: string) {
    return await RestApi.uploadImages(formData, restId)
  }
  async function changeFoodList(restId: string, foodListItem: FoodListItemFromDb | FoodListItem) {
    return await RestApi.changeFoodList(restId, foodListItem)
  }
  async function sendFoodListItemToMenu(_id: string, restId: string) {
    return await RestApi.sendFoodListItemToMenu(_id, restId)
  }
  async function createFoodListItem(_id: string, item: FoodListItem) {
    return await RestApi.createFoodListItem({ restId: _id, foodListItem: item })
  }

  return { create, get, getByAlias, uploadImages, changeFoodList, sendFoodListItemToMenu, deleteRest, createFoodListItem }
})