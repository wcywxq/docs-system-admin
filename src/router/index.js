/*
 * @Author: your name
 * @Date: 2020-11-21 12:51:39
 * @LastEditTime: 2020-11-30 19:39:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog-client/src/router/index.js
 */
import { createRouter, createWebHashHistory } from "vue-router";
import RouteView from "../layouts/RouteView.vue";

const routes = [
  {
    path: "/",
    component: () => import("../layouts/PageView"),
    children: [
      {
        path: "/home",
        name: "首页",
        component: () => import("../views/home")
      },
      {
        path: "/category",
        name: "分类管理",
        component: RouteView,
        children: [
          {
            path: "/",
            name: "分类查询",
            component: () => import("../views/category")
          }
        ]
      },
      {
        path: "/tag",
        name: "标签管理",
        component: RouteView,
        children: [
          {
            path: "/",
            name: "标签查询",
            component: () => import("../views/tag")
          }
        ]
      },
      {
        path: "/timeline",
        name: "归档管理",
        component: RouteView,
        children: [
          {
            path: "/",
            name: "归档查询",
            component: () => import("../views/timeline")
          }
        ]
      },
      {
        path: "/article",
        name: "文章管理",
        component: RouteView,
        children: [
          {
            path: "/",
            name: "文章内容",
            component: () => import("../views/article")
          }
        ]
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
