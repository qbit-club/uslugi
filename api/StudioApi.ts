import type { Studio } from "../types/studio.interface"


export default {
  create(studio: Studio): Promise<any> {
    return useApiFetch('/studio', { method: 'POST', body: { studio } })
  },
}