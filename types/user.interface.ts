import type { RestFromDb } from "./studio-from-db.interface"
import type { OrderFromDb } from "./order-from-db.interface"

export interface User {
	_id: string
	name: string
	email: string
	password: string
	rests: RestFromDb[]
	roles: string[]
	orders: OrderFromDb[]
	managerIn?: string[]
	managingRest: string
}
