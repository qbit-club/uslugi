import { defineStore } from "pinia"
import AppApi from '../api/AppApi'

// interfaces
import type { App } from "../types/app.interface"


export const useApp = defineStore('app', () => {

  async function createFoodCategory(category: string[]) {
    return await AppApi.createFoodCategory(category)
  }

  async function getFoodCategory() {
    return await AppApi.getFoodCategory()
  }
  async function deleteFoodCategory (category: string) {
    return await AppApi.deleteFoodCategory(category)
  }



  return { createFoodCategory, getFoodCategory, deleteFoodCategory }
})