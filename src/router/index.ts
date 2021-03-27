import { RouteConfig } from "react-router-config";
import BasicLayout from "../layouts/BasicLayout";
import RouteView from "../layouts/RouteView";
import LoginPage from "../views/login";
import UserPage from "../views/user";
import ArticleAdd from "../views/article/add";
import ArticleList from "../views/article/list";
import ArticleDetail from "../views/article/detail";
import CategoryPage from "../views/category";
import TagPage from "../views/tag";
import ReviewPage from "../views/review";
import FriendShipPage from "../views/friendPage";
import ForbiddenPage from "../views/exception/403";
import NotFoundPage from "../views/exception/404";
import ServerErrorPage from "../views/exception/500";

const routes: RouteConfig[] = [
  {
    path: "/",
    component: BasicLayout,
    routes: [
      {
        path: "/user",
        title: "用户管理",
        component: UserPage,
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
            exact: true,
          },
          {
            path: "/article/list",
            title: "文章列表",
            component: ArticleList,
            exact: true,
          },
          {
            path: "/article/detail/:id",
            title: "文章详情",
            component: ArticleDetail,
            exact: true,
            hiddenInMenu: true, // 在菜单中隐藏
          },
          {
            path: "*",
            component: NotFoundPage
          }
        ],
      },
      {
        path: "/category",
        title: "分类管理",
        component: CategoryPage,
      },
      {
        path: "/tag",
        title: "标签管理",
        component: TagPage,
      },
      {
        path: "/review",
        title: "评论管理",
        component: ReviewPage,
      },
      {
        path: "/friendship",
        title: "友情链接",
        component: FriendShipPage,
      },
      {
        path: "/exception",
        title: "异常页",
        component: RouteView,
        hiddenInMenu: true,
        routes: [
          {
            path: "/exception/403",
            title: "403",
            component: ForbiddenPage,
            exact: true,
            hiddenInMenu: true,
          },
          {
            path: "/exception/404",
            title: "404",
            component: NotFoundPage,
            exact: true,
            hiddenInMenu: true,
          },
          {
            path: "/exception/500",
            title: "500",
            component: ServerErrorPage,
            exact: true,
            hiddenInMenu: true,
          },
          {
            path: "*",
            component: NotFoundPage
          }
        ],
      },
      {
        path: "*",
        component: NotFoundPage
      }
    ],
  },
];

export default routes;
