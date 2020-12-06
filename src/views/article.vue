<!--
 * @Author: your name
 * @Date: 2020-11-30 19:35:58
 * @LastEditTime: 2020-11-30 20:01:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog-client/src/views/article.vue
-->
<template>
  <div class="article">
    <el-card shadow="hover">
      文章 {{ id }}
      <code>
        {{ data.content }}
      </code>
    </el-card>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";

const data = {
  nickname: "枋柚梓",
  avatar: "https://img.inkss.cn/inkss_cn/static/img/avatar.jpg",
  categories: ["前端"],
  tags: ["ES6", "Const", "Arrow Function", "Desctructuring"],
  createTime: "2020年9月3日",
  publishTime: "2020年9月6日",
  wordCount: 1900,
  duration: 3600000,
  content: " ## 1. ajax > `ajax` 是一种使用现有标准的新方法。指一种创建交互式、快速动态网页应用的网页开发技术，无需重新加载整个网页的情况下，能够更新部分网页的技术，接下来我们介绍一下原生的实现。 "
};

export default {
  name: "article",
  setup() {
    const route = useRoute();
    const state = reactive({
      id: route.params.id,
      data
    });
    return { ...toRefs(state) };
  }
};
</script>

<style lang="scss" scoped></style>
