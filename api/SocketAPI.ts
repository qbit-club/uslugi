import { io, type Socket } from "socket.io-client";

export class SocketAPI {
  static socket: null | Socket;

  static createConnection() {
    const runtimeConfig = useRuntimeConfig()

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

  }
}