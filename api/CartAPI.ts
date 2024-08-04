export default {
  order(cart: any): Promise<any> {
    return useApiFetch('/order', { method: 'POST', body: { order: cart } })
  },
  getOrdersByOrdersId(ordersId: any): Promise<any> {
    return useApiFetch('/order/order-by-orderId', { method: 'POST', body: { ordersId } })
  },
  getOrdersByRestId(restId: string): Promise<any> {
    return useApiFetch(`/order/by-rest-id?rest_id=${restId}`, {
      method: 'GET'
    })
  },
  changeStatus(orderId: string, status: string): Promise<any> {
    return useApiFetch('/order/status', {
      method: 'PUT',
      body: {
        orderId,
        status
      }
    })
  }
}