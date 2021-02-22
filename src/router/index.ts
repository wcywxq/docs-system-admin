import { RouteConfig } from "react-router-config";
import PageLayout from "../layouts/PageLayout";
import RouteView from "../layouts/RouteView";
import UserPage from "../views/user";
import ArticleAdd from "../views/article/add";
import ArticleList from "../views/article/list";
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
    exact: true,
    component: PageLayout,
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
        routes: [
          {
            path: "/exception/403",
            title: "403",
            component: ForbiddenPage,
          },
          {
            path: "/exception/404",
            title: "404",
            component: NotFoundPage,
          },
          {
            path: "/exception/500",
            title: "500",
            component: ServerErrorPage,
          },
        ],
      },
    ],
  },
  {
    component: NotFoundPage,
  },
];

export default routes;
