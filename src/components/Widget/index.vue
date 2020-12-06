<template>
  <div class="widget-component">
    <el-card shadow="hover">
      <header>
        <template v-if="$slots.header">
          <slot name="header"></slot>
        </template>
        <template v-else>
          <i :class="['iconfont', iconClass]"></i>
          <span class="ml-2">{{ title }}</span>
        </template>
      </header>
      <div class="content word-break-all">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "WidgetComponent",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    iconClass: {
      type: String,
      default: "iconwarning-circle"
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-card__body {
  padding: 14px;
}

.widget-component {
  margin-bottom: 20px;
  color: var(--color-text);

  header {
    color: var(--color-primary);
  }

  .content {
    font-size: 12px;
  }
}
</style>
