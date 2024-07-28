import type { Location } from "./location.interface"
import type { Table } from "./table.interface"

export interface Rest {
  title: string
  alias: string
  phone: string
  socialMedia: string
  location: Location
  author: string
  tables?: Table[] 
  description: string
  schedule: string
  managers?:[]
}