<!--
 * @Author: wangxq02
 * @Date: 2020-11-22 23:11:56
 * @LastEditTime: 2020-11-23 00:17:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog-client/src/components/Search.vue
-->
<template>
  <div class="search text-right">
    <el-input v-model="search" size="small" prefix-icon="el-icon-search" placeholder="搜索" clearable style="width: 240px;"></el-input>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const search = ref("");

    return {
      search
    };
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-input {
  &:hover {
    input {
      border-color: var(--color-primary);
    }
    .el-input__icon {
      color: var(--color-primary);
      font-weight: bold;
    }
  }

  input {
    border-radius: 8px;
    color: #333;
    background: #f4f4f4;

    &:focus {
      border-color: var(--color-primary);
      background: rgba(27, 195, 251, 0.15);
      + .el-input__prefix {
        > .el-input__icon {
          color: var(--color-primary);
          font-weight: bold;
        }
      }
    }
  }
}
</style>
