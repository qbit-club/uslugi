import { defineStore } from "pinia"
import StudioApi from '../api/StudioApi'

// interfaces
import type { Studio } from "../types/studio.interface"


export const useStudio = defineStore('studio', () => {

  async function create(studio: Studio) {
    return await StudioApi.create(studio)
  }
  
  return {
    create, 
  }
})