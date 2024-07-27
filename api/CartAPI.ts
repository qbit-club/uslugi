export default {
  order(cart: any): Promise<any> {
    return useApiFetch('/order', { method: 'POST', body: { order: cart } })
  },
}