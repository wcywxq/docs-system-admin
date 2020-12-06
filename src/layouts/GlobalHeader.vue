<!--
 * @Author: your name
 * @Date: 2020-11-21 16:59:19
 * @LastEditTime: 2020-11-23 23:23:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog-client/src/layouts/GlobalHeader.vue
-->
<template>
  <el-row class="global-header" type="flex" align="middle" justify="space-between">
    <el-col :span="6">
      lucifer 的网络博客
    </el-col>
    <el-col :span="8" :offset="1">
      <nav-menu />
    </el-col>
    <el-col :span="10" :offset="1">
      <search />
    </el-col>
  </el-row>
</template>

<script>
import NavMenu from "../components/NavMenu.vue";
import Search from "../components/Search.vue";

export default {
  components: { NavMenu, Search },
  setup() {}
};
</script>
<style lang="scss">
.global-header {
  margin: 0 auto;
  max-width: 1080px;
}
</style>
