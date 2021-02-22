import { RouteConfig } from "react-router-config";
import PageLayout from "../layouts/PageLayout";
import RouteView from "../layouts/RouteView";
import UserList from "../views/user/list";
import ArticleAdd from "../views/article/add";
import ArticleList from "../views/article/list";

const routes: RouteConfig[] = [
  {
    path: "/",
    component: PageLayout,
    routes: [
      {
        path: "/user",
        title: "用户管理",
        component: RouteView,
        routes: [
          {
            path: "/user/list",
            title: "用户列表",
            component: UserList,
          },
        ],
      },
      {
        path: "/article",
        title: "文章管理",
        component: RouteView,
        routes: [
          {
            path: "/article/add",
            title: "添加文章",
            component: ArticleAdd,
          },
          {
            path: "/article/list",
            title: "文章列表",
            component: ArticleList,
          },
        ],
      },
      {
        path: "/category",
        title: "分类管理",
        component: RouteView,
        routes: [
          {
            path: "/article/add",
            title: "添加文章",
            component: ArticleAdd,
          },
          {
            path: "/article/list",
            title: "文章列表",
            component: ArticleList,
          },
        ],
      },
      {
        path: "/tag",
        title: "标签管理",
        component: RouteView,
        routes: [
          {
            path: "/article/add",
            title: "添加文章",
            component: ArticleAdd,
          },
          {
            path: "/article/list",
            title: "文章列表",
            component: ArticleList,
          },
        ],
      },
      {
        path: "/review",
        title: "评论管理",
        component: RouteView,
        routes: [
          {
            path: "/article/add",
            title: "添加文章",
            component: ArticleAdd,
          },
          {
            path: "/article/list",
            title: "文章列表",
            component: ArticleList,
          },
        ],
      },
    ],
  },
];

export default routes;
