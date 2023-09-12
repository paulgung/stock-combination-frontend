import { ProLayoutProps } from '@ant-design/pro-components';
// 系统配置
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#0d47a0',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: '工业品采购信息系统',
  pwa: false,
  logo: undefined,
  iconfontUrl: '',
  splitMenus: false,
  menu: {
    locale:false,
  },
};

export default Settings;
