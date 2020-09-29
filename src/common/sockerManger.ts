import io from 'socket.io-client';
import { SERVER_URL } from '../consts/ServerUrl';

export class SocketManager {
  private _socket: SocketIOClient.Socket;
  get socket() {
    return this._socket;
  }
  constructor() {
    this._socket = io(SERVER_URL);
  }
}
