export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './User/Login'
      }
    ],
  },
  {
    path: '/welcome',
    name: '首页',
    icon: 'home',
    component: './Welcome'
  },
  {
    path: '/opportunity',
    name: '股票组合',
    icon: 'desktop',
    routes: [
      {
        path: '/opportunity',
        redirect: '/opportunity/combination'
      },
      {
        path: '/opportunity/combination',
        name: '组合',
        component: './Ths/combination'
      },
      {
        path: '/opportunity/subcombination/:id',
        name: '子组合',
        component: './Ths/subcombination',
        hideInMenu: false, // 隐藏菜单项

      },
      {
        path: '/opportunity/stocks/:subId',
        name: '股票信息',
        component: './Ths/stocks',
        hideInMenu: false, // 隐藏菜单项

      }
    ],
  },
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '*',
    layout: false,
    component: './404'
  },
];
