import React, { FC, useEffect, useState } from 'react';
import { makeRequest } from 'src/common/makeRequest';
import { socket } from 'src/common/sockerManger';
import './logs.style.scss';
import Ilog from './Interfaces/Ilog.interface';

const listenToEvents = (cb) => {
  socket?.on('log', (log: Ilog) => {
    return cb(log);
  });
};

const Logs: FC = () => {
  const [logs, setLogs] = useState<Ilog[]>([]);
  useEffect(() => {
    listenToEvents((log) => setLogs((logs) => [...logs, log]));
    makeRequest({ url: 'http://192.168.1.134:5000/api/users/emit-test-logs' });
  }, []);

  return (
    <>
      <div className='logs-container'>
        Logs:
        <ul>
          {logs.length !== 0 ? (
            logs.map((item: Ilog) => (
              <li>
                log from {item.account}: {item.logContent}
              </li>
            ))
          ) : (
            <li>There is no new logs at the moment .. </li>
          )}
        </ul>
      </div>
      <button
        onClick={() => {
          setLogs([]);
        }}
      >
        Clean Logs
      </button>
    </>
  );
};

export default Logs;