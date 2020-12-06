<template>
  <div class="widget-notice">
    <widget title="公告" icon-class="iconnotification">
      <p>
        本站默认替换了右键菜单，唤醒原系统菜单：
        <kbd>Ctrl</kbd>
        +
        <kbd>右键</kbd>
        ~
      </p>
    </widget>
  </div>
</template>

<script>
import Widget from "./index";
export default {
  name: "WidgetNotice",
  components: { Widget }
};
</script>

<style scoped></style>
