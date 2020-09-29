import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;

export default () => (
  <div style={{ display: 'grid', placeItems: 'center' }}>
    <Spin indicator={antIcon} />
  </div>
);
