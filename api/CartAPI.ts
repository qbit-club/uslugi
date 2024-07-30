export default {
  order(cart: any): Promise<any> {
    return useApiFetch('/order', { method: 'POST', body: { order: cart } })
  },
  getOrdersByOrdersId(ordersId:any) : Promise<any>{
    return useApiFetch('/order/order-by-orderId', { method: 'POST', body: { ordersId: ordersId}})
  }
}