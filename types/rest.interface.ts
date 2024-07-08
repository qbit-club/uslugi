import type { Table } from "./table.interface"

export interface Rest {
  title: string
  alias: string
  phone: string
  socialMedia: string
  location: object
  author: string
  tables: Table[]
}