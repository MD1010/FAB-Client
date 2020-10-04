import 'antd/dist/antd.css';
import React from 'react';
import './App.scss';
import { SocketManager } from './common/socketManger';
import NewLogin from './components/WebAppLogin/NewAccountForm/NewLogin';
const App = () => {
  return (
    <div className='App'>
      {/* <Logs /> */}
      <NewLogin />
      {/* <CardSearch /> */}
    </div>
  );
};

export default App;
