import React, { FC } from 'react';
import { socket } from 'src/common/socketManger';

const Logs: FC = () => {
  const listenToEvents = () => {
    socket?.emit('join', 'owner');
    socket?.on('search', (event) => console.log(event));
    socket?.on('message', (msg) => console.log(msg));
  };
  socket && listenToEvents();
  //   const [logs, setLogs] = useState<any>([]);
  return <div>Logs Component</div>;
};

export default Logs;
