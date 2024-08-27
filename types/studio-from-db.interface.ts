import type { Studio } from "./studio.interface"

export interface StudioFromDb extends Studio {
  _id: string
}