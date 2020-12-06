<template>
  <el-container class="basic-layout">
    <el-aside class="sider-box" width="250px">
      <el-menu :default-active="route.path" router background-color="#304156" text-color="#fff" active-text-color="#fff">
        <sider-bar-menu-item :menus="menus" />
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header-box">
        <global-header />
      </el-header>
      <!-- <el-container> -->
      <el-main>
        <slot></slot>
      </el-main>
      <!-- </el-container> -->
    </el-container>
  </el-container>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import SiderBarMenuItem from "../components/SiderBarMenuItem.vue";
import GlobalHeader from "./GlobalHeader.vue";

const mockMenus = [
  {
    url: "/category",
    title: "分类管理",
    children: [
      {
        url: "/category/1",
        title: "分类查询",
        children: [
          {
            url: "/category/2",
            title: "分类子分类"
          }
        ]
      }
    ]
  },
  {
    url: "/tag",
    title: "标签管理",
    children: [
      {
        url: "/tag",
        title: "标签查询"
      }
    ]
  },
  {
    url: "/timeline",
    title: "归档管理",
    children: [
      {
        url: "/timeline",
        title: "归档查询"
      }
    ]
  },
  {
    url: "/article",
    title: "文章管理",
    children: [
      {
        url: "/article",
        title: "文章内容"
      }
    ]
  }
];

export default {
  components: { GlobalHeader, SiderBarMenuItem },
  setup() {
    const route = useRoute();
    const menus = ref(mockMenus);
    return { route, menus };
  }
};
</script>
<style lang="scss" scoped>
.basic-layout {
  height: 100vh;
  overflow: scroll;
}
.sider-box {
  background-color: #304156;
}
.header-box {
  // position: fixed;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  height: 60px;
  line-height: 60px;
  // z-index: 999;
}
</style>
