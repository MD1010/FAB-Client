import io from 'socket.io-client';
import { SERVER_URL } from '../consts/ServerUrl';

export class SocketManager {
  private _socket: SocketIOClient.Socket | null = null;
  private static socketInstance: SocketManager;
  get socket() {
    return this._socket;
  }

  private constructor() {
    if (!this._socket) {
      this._socket = io(SERVER_URL);
    }
  }
  public static getInstance() {
    if (!SocketManager.socketInstance) {
      SocketManager.socketInstance = new SocketManager();
    }
    return SocketManager.socketInstance;
  }
}
export const socket = SocketManager.getInstance().socket;
