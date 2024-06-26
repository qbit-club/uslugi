import { defineStore } from "pinia"
import { ref } from "vue"
import RestApi from '../api/RestApi'

// interfaces
import type { Rest } from "../types/rest.interface"

export const useRest = defineStore('rest', () => {
  // let halls = ref<Hall[] | []>()

  async function create(rest: Rest) {
    return await RestApi.create(rest)
  }

  async function get() {
    return await RestApi.get()
  }
  async function getByAlias(alias: string) {
    return await RestApi.getByAlias(alias)
  }
  async function uploadImages(formData: FormData, restId: string) {
    return await RestApi.uploadImages(formData, restId)
  }

  return { create, get, getByAlias,uploadImages }
})