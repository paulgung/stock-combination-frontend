export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    name: '首页',
    icon: 'home',
    component: './Welcome',
    footerRender: false,
    // 不展示菜单
    menuRender: false,
    // 不展示菜单顶栏
    menuHeaderRender: false,
    // 不展示顶栏
    headerRender: false,
  },
  {
    path: '/ths',
    name: '股票组合',
    icon: 'desktop',
    routes: [
      {
        path: '/ths',
        redirect: '/ths/combination',
      },
      {
        path: '/ths/combination',
        name: '组合',
        component: './Ths/combination',
      },
      {
        path: '/ths/subcombination',
        name: '子组合',
        component: './Ths/subcombination',
        hideInMenu: false, // 隐藏菜单项
      },
      {
        path: '/ths/subcombination/:id',
        name: '子组合',
        component: './Ths/subcombination',
        hideInMenu: true, // 隐藏菜单项
      },
      {
        path: '/ths/stocks',
        name: '股票信息',
        component: './Ths/stocks',
        hideInMenu: false, // 隐藏菜单项
      },
      {
        path: '/ths/stocks/:subId',
        name: '股票信息',
        component: './Ths/stocks',
        hideInMenu: true, // 隐藏菜单项
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
  {
    path: '/kline/:sc&:mid',
    name: '分时K线',
    layout: false,
    icon: 'home',
    component: './KLine',
  },
  {
    path: '/kline',
    name: '分时K线',
    layout: false,
    icon: 'home',
    component: './KLine',
  },
];
