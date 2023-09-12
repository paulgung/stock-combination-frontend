import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

// 页面尾部
const Footer: React.FC = () => {
  const defaultMessage = '中国地质大学(武汉)';
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '工业品采购信息系统',
          title: '工业品采购信息系统',
          href: 'https://github.com/paulgung/mro-boss-frontend',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/paulgung/mro-boss-frontend',
          blankTarget: true,
        },
        {
          key: 'paulgung',
          title: 'paulgung',
          href: 'https://github.com/paulgung/mro-boss-frontend',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
