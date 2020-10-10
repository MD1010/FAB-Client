import 'antd/dist/antd.css';
import React from 'react';
import './App.scss';
import Logs from './components/WebAppEvents/Logs';
const App = () => {
  return (
    <div className='App'>
      <Logs />
      {/* <NewLogin /> */}
      {/* <CardSearch /> */}
    </div>
  );
};

export default App;
