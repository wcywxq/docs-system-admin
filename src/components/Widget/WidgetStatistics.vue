<template>
  <div class="widget-statistics">
    <widget title="统计信息" icon-class="iconbarchart">
      <el-row type="flex" justify="space-between" tag="p">
        <el-col :span="12">文章数目：</el-col>
        <el-col :span="12" class="text-right">21篇</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" tag="p">
        <el-col :span="12">已运行时间：</el-col>
        <el-col :span="12" class="text-right">991天</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" tag="p">
        <el-col :span="12">本站总字数：</el-col>
        <el-col :span="12" class="text-right">27.3k</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" tag="p">
        <el-col :span="12">最后更新时间：</el-col>
        <el-col :span="12" class="text-right">1周前</el-col>
      </el-row>
    </widget>
  </div>
</template>

<script>
import Widget from "./index";
export default {
  name: "WidgetStatistics",
  components: { Widget }
};
</script>

<style scoped></style>
