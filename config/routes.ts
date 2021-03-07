export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
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
  },
  {
    name: '文章管理',
    icon: 'book',
    routes: [
      {
        name: '文章列表',
        icon: 'smile',
        path: '/article/list',
        component: './article/List',
        exact: true,
      },
      {
        name: '文章创作',
        icon: 'smile',
        path: '/article/create',
        component: './article/Create',
        exact: true,
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
