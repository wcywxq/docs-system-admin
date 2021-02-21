import { RouteConfig } from "react-router-config";
import PageLayout from "../layouts/PageLayout";
import RouteView from "../layouts/RouteView";
import ArticleAdd from "../views/article/add";
import ArticleList from "../views/article/list";
import AuthorAdd from "../views/author/list";
import AuthorList from "../views/author/list";

const routes: RouteConfig[] = [
  {
    path: "/",
    component: PageLayout,
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
      {
        path: "/author",
        title: "作者管理",
        component: RouteView,
        routes: [
          {
            path: "/author/add",
            title: "添加作者",
            component: AuthorAdd,
          },
          {
            path: "/author/list",
            title: "作者列表",
            component: AuthorList,
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
