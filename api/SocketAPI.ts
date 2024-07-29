import { io, type Socket, Manager } from "socket.io-client";
const runtimeConfig = useRuntimeConfig()
export class SocketAPI {
  static socket: null | Socket;

  static ordersSocket: null | Socket;

  static manager = new Manager(runtimeConfig.public.apiBase, {
    reconnectionDelayMax: 10000,
  })

  static createOrdersConnection() {
    if (!process.client) return
    this.ordersSocket = this.manager.socket('/orders', {})

    this.ordersSocket.on("connect", () => {
      console.log('orders connected');
    })

    this.ordersSocket.on("client-create-order", (data) => {
      console.log(data);
    })
  }

  static createConnection() {
    if (!process.client) return
    

    this.socket = io(runtimeConfig.public.apiBase)

    this.socket.on("connect", () => {
      console.log('connect');
    })

    this.socket.on("disconnect", () => {
      console.log('disconnect');
    })

    this.socket.on("client-create-order", (data) => {
      console.log('sfdf');
      console.log(data);
    })

    this.socket.on('hello', (data) => {
      console.log(data);
    })
  }
}