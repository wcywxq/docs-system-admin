export default [
  {
    path: '/login',
    layout: false,
    component: './Login',
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
    path: '/admin',
    name: '管理员权限',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '账号管理',
        icon: 'smile',
        path: '/admin/account',
        component: './admin/Account',
        exact: true,
      },
      {
        name: '角色管理',
        icon: 'smile',
        path: '/admin/role',
        component: './admin/Role',
        exact: true,
      },
      {
        name: '菜单管理',
        icon: 'smile',
        path: '/admin/menu',
        component: './admin/Menu',
        exact: true,
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: '工作台',
    icon: 'dashboard',
    component: './Dashboard',
  },
  {
    path: '/article',
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
    path: '/category',
    name: '分类管理',
    icon: 'shopping',
    component: './Category',
  },
  {
    path: '/tag',
    name: '标签管理',
    icon: 'tag',
    component: './Tag',
  },
  {
    path: '/review',
    name: '评论管理',
    icon: 'message',
    component: './Review',
  },
  {
    component: './404',
  },
];
