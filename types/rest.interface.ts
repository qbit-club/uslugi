import type { Table } from "./table.interface"

export interface Rest {
  title: string
  alias: string
  tables: Table[]
}