import { RouteConfig } from "react-router-config";
import BasicLayout from "../layouts/BasicLayout";
import RouteView from "../layouts/RouteView";
import UserPage from "../views/user";
import ArticleAdd from "../views/article/add";
import ArticleList from "../views/article/list";
import ArticleDetail from "../views/article/detail";
import CategoryPage from "../views/category";
import TagPage from "../views/tag";
import ReviewPage from "../views/review";
import FriendShipPage from "../views/firend";
import ForbiddenPage from "../views/exception/403";
import NotFoundPage from "../views/exception/404";
import ServerErrorPage from "../views/exception/500";
import WelcomePage from "../views/welcome";
import { UserOutlined, BookOutlined, FileAddOutlined, FileTextOutlined, ShoppingCartOutlined, TagsOutlined, MessageOutlined, LinkOutlined } from "@ant-design/icons";

export interface Routes extends RouteConfig {
  routes?: Routes[];
  hiddenInMenu?: boolean;
  icon?: React.ReactNode;
}

const routes: Routes[] = [
  {
    path: "/",
    component: BasicLayout,
    routes: [
      {
        path: "/welcome",
        title: "首页",
        component: WelcomePage,
        hiddenInMenu: true
      },
      {
        path: "/user",
        title: "用户管理",
        component: UserPage,
        icon: <UserOutlined />
      },
      {
        path: "/article",
        title: "文章管理",
        component: RouteView,
        icon: <BookOutlined />,
        routes: [
          {
            path: "/article/add",
            title: "添加文章",
            component: ArticleAdd,
            exact: true,
            icon: <FileAddOutlined />
          },
          {
            path: "/article/list",
            title: "文章列表",
            component: ArticleList,
            exact: true,
            icon: <FileTextOutlined />
          },
          {
            path: "/article/detail/:id",
            title: "文章详情",
            component: ArticleDetail,
            exact: true,
            hiddenInMenu: true // 在菜单中隐藏
          },
          {
            path: "*",
            component: NotFoundPage
          }
        ]
      },
      {
        path: "/category",
        title: "分类管理",
        component: CategoryPage,
        icon: <ShoppingCartOutlined />
      },
      {
        path: "/tag",
        title: "标签管理",
        component: TagPage,
        icon: <TagsOutlined />
      },
      {
        path: "/review",
        title: "评论管理",
        component: ReviewPage,
        icon: <MessageOutlined />
      },
      {
        path: "/friendship",
        title: "友情链接",
        component: FriendShipPage,
        icon: <LinkOutlined />
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
            hiddenInMenu: true
          },
          {
            path: "/exception/404",
            title: "404",
            component: NotFoundPage,
            exact: true,
            hiddenInMenu: true
          },
          {
            path: "/exception/500",
            title: "500",
            component: ServerErrorPage,
            exact: true,
            hiddenInMenu: true
          },
          {
            path: "*",
            component: NotFoundPage
          }
        ]
      },
      {
        path: "*",
        component: NotFoundPage
      }
    ]
  }
];

export default routes;
