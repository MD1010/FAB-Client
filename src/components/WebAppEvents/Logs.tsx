import React, { FC } from 'react';
import { SocketManager } from '../../common/sockerManger';

const Logs: FC = () => {
  const listenToEvents = (socket: SocketIOClient.Socket) => {
    socket.emit('join', 'owner');
    socket.on('search', (event) => console.log(event));
    socket.on('message', (msg) => console.log(msg));
  };
  const socket = new SocketManager().socket;
  listenToEvents(socket);
  //   const [logs, setLogs] = useState<any>([]);
  return <div>Logs Component</div>;
};

export default Logs;
