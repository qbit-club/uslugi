import type { Rest } from "./rest.interface"

export interface RestFromDb extends Rest {
  _id: string
  images: string[]
}