import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const Spinner = () => <Spin indicator={antIcon} />;
