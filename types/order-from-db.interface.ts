import type { Order } from './order.interface'

export interface OrderFromDb extends Order {
  _id: string
}