import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

export default () => (
  <div className='loading'>
    <Spin indicator={antIcon} />
  </div>
);
