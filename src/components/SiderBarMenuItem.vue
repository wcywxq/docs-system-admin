<template>
  <div class="sider-bar-menu-item">
    <!-- 递归子菜单使用 -->
    <div v-for="(menu, index) in menus" :key="index">
      <el-submenu v-if="menu.children" :index="menu.url">
        <template #title>{{ menu.title }}</template>
        <sider-bar-menu-item :menus="menu.children" />
      </el-submenu>
      <el-menu-item v-else :index="menu.url">{{ menu.title }}</el-menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "SiderBarMenuItem",
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    console.log(props.menus);
    return { ...props };
  }
};
</script>

<style lang="scss" scoped>
.sider-bar-menu-item {
}
</style>
