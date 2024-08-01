export interface Order {
  items: [{
    price: number,
    count: number,
    menuItem: string
  }]
  date: string,
  rest: string,
  user: string
}