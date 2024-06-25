import type { Rest } from '../types/rest.interface'


export default {
  /**
   * pass a Hall type object and make a POST request to a /hall
   * @param rest 
   * @returns 
   */
  create(rest: Rest): Promise<any> {
    return useApiFetch('/hall', { method: 'POST', body: { rest } })
  },
  get(): Promise<any> {
    return useApiFetch('/hall/all', { method: 'GET' })
  }
}