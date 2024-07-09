import type { RestFromDb } from "./rest-from-db.interface"
export interface User {
	_id: string
	name: string
	email: string
	password: string
	rests: RestFromDb[]
	roles: string[]
}
