<!--
 * @Author: your name
 * @Date: 2020-11-21 17:03:04
 * @LastEditTime: 2020-11-21 17:19:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog-client/src/layouts/PageView.vue
-->
<template>
  <div class="page-view">
    <basic-layout>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </router-view>
    </basic-layout>
  </div>
</template>

<script>
import BasicLayout from "./BasicLayout";

export default {
  components: { BasicLayout }
};
</script>
