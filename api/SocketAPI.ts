import { io, type Socket, Manager } from "socket.io-client";

// types



export class SocketAPI {
  static socket: null | Socket;

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

  // static createConnection() {
  //   if (!process.client) return


  //   this.socket = io(runtimeConfig.public.apiBase)

  //   this.socket.on("connect", () => {
  //     console.log('connect');
  //   })

  //   this.socket.on("disconnect", () => {
  //     console.log('disconnect');
  //   })

  //   this.socket.on("client-create-order", (data) => {
  //     console.log('sfdf');
  //     console.log(data);
  //   })

  //   this.socket.on('hello', (data) => {
  //     console.log(data);
  //   })
  // }
}