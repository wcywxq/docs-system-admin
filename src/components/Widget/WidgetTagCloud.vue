<template>
  <div class="widget-tag-cloud">
    <widget title="热门标签" icon-class="icontags">
      <p>
        <el-tag type="info" size="small" class="mr-2 mb-2" v-for="(tag, tagIndex) in tags" :key="tagIndex">
          <router-link to="/">
            {{ tag }}
          </router-link>
        </el-tag>
      </p>
    </widget>
  </div>
</template>

<script>
import Widget from "./index";
import { reactive, toRefs } from "vue";
const tags = "Adguard Angular Arrow Function Cities: Skylines Cloud Studio Const DNS DOH Desctructuring ES6 Git Hexo Java Linux NG-ZORRO Office Pjax Powershell Proxy Shell Steam Ubuntu Ubuntu 18.04 Volantis WSL 分页 创意工坊 微信小程序 打包 显卡驱动 破解 组件 网卡驱动 网站 联想Y7000P 隐私".split(
  " "
);
export default {
  name: "WidgetTagCloud",
  components: { Widget },
  setup() {
    const state = reactive({
      tags
    });

    return { ...toRefs(state) };
  }
};
</script>

<style lang="scss" scoped>
.widget-tag-cloud {
  a {
    margin: 4px 0;
    color: var(--color-meta);
    transition: all 0.5s ease;
    border-bottom: 1px solid transparent;

    &:hover {
      border-bottom: 1px solid #ff5722;
    }
  }
}
</style>
