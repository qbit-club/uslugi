import { io, type Socket } from "socket.io-client";

// types



export class OrdersSocketAPI {
  static ordersSocket: null | Socket;


  static createOrdersConnection(room: string) {
    if (!process.client) return
    const runtimeConfig = useRuntimeConfig()
    // connect to orders namespace
    this.ordersSocket = io(runtimeConfig.public.apiBase + '/orders')

    this.ordersSocket.emit('join-room', { room })

    this.ordersSocket.on("connect", () => {
      console.log('orders connected');
    })

    this.ordersSocket.on("create-order-to-client", (data) => {
      console.log(data);
    })
  }
}