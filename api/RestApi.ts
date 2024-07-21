import type { FoodListItem } from '~/types/food-list-item.interface'
import type { Rest } from '../types/rest.interface'
import type { FoodListItemFromDb } from '~/types/food-list-item-from-db.interface'


export default {
  /**
   * pass a Hall type object and make a POST request to a /hall
   * @param rest 
   * @returns 
   */
  create(rest: Rest): Promise<any> {
    return useApiFetch('/rest', { method: 'POST', body: { rest } })
  },
  get(): Promise<any> {
    return useApiFetch('/rest/all', { method: 'GET' })
  },
  deleteRest(_id: string): Promise<any> {
    return useApiFetch(`/rest/delete?rest_id=${_id}`, { method: 'GET' })
  },
  getByAlias(alias: string): Promise<any> {
    return useApiFetch('/rest/one-by-alias', { method: 'POST', body: { alias } })
  },
  uploadImages(formData: FormData, _id: string): Promise<any> {
    return useApiFetch(`/rest/images?rest_id=${_id}`, { method: 'POST', headers: { 'Content-Type': 'multipart/form-data' }, body: formData })
  },
  /**
   * updates food list
   * @param restId 
   * @param foodListItem 
   * @returns 
   */
  changeFoodList(restId: string, foodListItem: FoodListItem | FoodListItemFromDb): Promise<any> {
    return useApiFetch('/rest/food-list', {
      method: 'PUT',
      body: {
        restId,
        foodListItem
      }
    })
  },
  sendFoodListItemToMenu(_id: string, restId: string): Promise<any> {
    return useApiFetch('/rest/menu', {
      method: 'POST',
      body: {
        foodListItemId: _id,
        restId
      }
    })
  },
  /**
   * create new food list item 
   */
  createFoodListItem(body: any) {
    return useApiFetch('/rest/food-list', {
      method: 'POST',
      body: body
    })
  }
}