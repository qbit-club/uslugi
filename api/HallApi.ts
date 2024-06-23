import type { Hall } from '../types/hall.interface'


export default {
  /**
   * pass a Hall type object and make a POST request to a /hall
   * @param hall 
   * @returns 
   */
  create(hall: Hall): Promise<any> {
    return useApiFetch('/hall', { method: 'POST', body: { hall } })
  },
  get(): Promise<any> {
    return useApiFetch('/hall/all', { method: 'GET' })
  }
}