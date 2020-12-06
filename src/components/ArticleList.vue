<template>
  <div class="article-list">
    <el-card shadow="hover">
      <h2 class="article-list-title">
        <a href="javascript:;">{{ item.title }}</a>
      </h2>
      <div class="article-list-introduction">
        <p>{{ item.description }}</p>
      </div>
      <el-divider />
      <div class="article-list-meta">
        <a href="javascript:;">
          <i class="iconfont iconeye mr-1"></i>
          <span class="mr-2">{{ item.watchCount }}</span>
        </a>
        <a href="javascript:;">
          <i class="iconfont iconheart mr-1"></i>
          <span class="mr-2">{{ item.likedCount }}</span>
        </a>
        <a href="javascript:;">
          <i class="iconfont iconmessage mr-1"></i>
          <span>{{ item.commentCount }}</span>
        </a>
      </div>
      <el-row class="article-list-footer" type="flex" justify="space-between">
        <el-col :span="20" class="word-break-word">
          <a class="d-inline-block mb-2 mr-2">
            <i class="iconfont icontime-circle mr-1"></i>
            <time>{{ item.createTime }}</time>
          </a>
          <a class="d-inline-block mb-2 mr-2">
            <i class="iconfont iconfile-word mr-1"></i>
            <span>{{ item.wordCount }}</span>
          </a>
          <a class="d-inline-block mb-2 mr-2" v-for="(category, categoryIndex) in item.categories" :key="categoryIndex">
            <i class="iconfont iconshopping mr-1"></i>
            <span>{{ category }}</span>
          </a>
          <a class="d-inline-block mb-2 mr-2" v-for="(tag, tagIndex) in item.tags" :key="tagIndex">
            <i class="iconfont icontag mr-1"></i>
            <span>{{ tag }}</span>
          </a>
        </el-col>
        <el-col :span="4" class="text-right">
          <router-link :to="`/article/${item.id}`" class="show-more">阅读全文</router-link>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  props: {
    item: Object
  }
};
</script>

<style lang="scss" scoped>
.article-list {
  position: relative;
  margin-bottom: 20px;

  &-title {
    font-weight: 500;
    margin: 12px auto;
    line-height: 1.4;

    a {
      color: var(--color-h1);
    }
  }

  &-introduction {
    p {
      color: #666;
    }
  }

  &-meta {
    position: absolute;
    right: 20px;
    top: 20px;
    color: var(--color-meta);

    a {
      color: var(--color-meta);
    }
  }

  &-footer {
    color: var(--color-meta);
    margin-bottom: 12px;
  }

  .show-more {
    color: var(--color-primary);
  }
}
</style>
