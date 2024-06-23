import { defineStore } from "pinia"
import { ref } from "vue"
import HallApi from '../api/HallApi'

// interfaces
import type { Hall } from "../types/hall.interface"

export const useHall = defineStore('hall', () => {
  // let halls = ref<Hall[] | []>()

  async function create(hall: Hall) {
    return await HallApi.create(hall)
  }

  async function get(): any {
    return await HallApi.get()
  }

  return { create, get }
})