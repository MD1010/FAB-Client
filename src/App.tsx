import 'antd/dist/antd.css';
import React from 'react';
import './App.scss';
import NestedGrid from './components/homePageGrid/GridPage';

const App = () => {
  return (
    <div className='App'>
      <NestedGrid />
      {/* <Logs /> */}
      {/* <NewLogin /> */}
      {/* <CardSearch /> */}
    </div>
  );
};

export default App;
