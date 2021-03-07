import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';
import { HomeOutlined } from '@ant-design/icons';

const NoFoundPage: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="对不起，页面未找到"
    extra={
      <Button type="primary" icon={<HomeOutlined />} onClick={() => history.push('/')}>
        返回首页
      </Button>
    }
  />
);

export default NoFoundPage;
