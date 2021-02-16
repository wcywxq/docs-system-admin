import { RouteConfig } from "react-router-config";
import BasicLayout from "../layouts/BasicLayout";
import RouteView from "../layouts/RouteView";
import ArticleAdd from "../views/article/add";
import ArticleList from "../views/article/list";

const routes: RouteConfig[] = [
  {
    path: "/",
    component: BasicLayout,
    routes: [
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
      { path: "/author", title: "作者管理", component: ArticleAdd },
      { path: "/category", title: "分类管理", component: ArticleAdd },
      { path: "/tag", title: "标签管理", component: ArticleAdd },
      { path: "/review", title: "评论管理", component: ArticleAdd },
    ],
  },
];

export default routes;
