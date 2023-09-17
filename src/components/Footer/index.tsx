import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

// 页面尾部
const Footer: React.FC = () => {
  const defaultMessage = 'B2C集群23届第八组';
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '股票信息管理系统',
          title: '股票信息管理系统',
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: 'github',
          href: '',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
