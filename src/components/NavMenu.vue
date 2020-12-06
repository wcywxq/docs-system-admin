<!--
 * @Author: magic
 * @Date: 2020-11-23 23:09:03
 * @LastEditTime: 2020-11-30 19:39:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog-client/src/components/NavMenu.vue
-->
<template>
  <div class="nav-menu">
    <el-row type="flex">
      <el-col
        v-for="item in menuOptions"
        :key="item.title"
        :class="{
          'nav-menu-item': true,
          'nav-menu-item__active': active === item.key
        }"
        @click="handleClick(item)"
      >
        <i :class="['iconfont', item.icon]" style="margin-right: 10px"></i>
        <span>{{ item.title }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watch, isReactive, isRef, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const menuList = [
  { icon: "iconhome", title: "首页", key: 0 },
  { icon: "iconfolder-open", title: "分类", key: 1 },
  { icon: "icontags", title: "标签", key: 2 },
  { icon: "icontime-circle", title: "归档", key: 3 }
];

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      active: 0,
      menuList
    });
    const menuOptions = computed(() =>
      state.menuList.map(item => {
        switch (item.key) {
          case 0:
            return { ...item, path: "/" };
          case 1:
            return { ...item, path: "/category" };
          case 2:
            return { ...item, path: "/tag" };
          case 3:
            return { ...item, path: "/timeline" };
        }
      })
    );
    const handleClick = obj => {
      console.log(obj);
      state.active = obj.key;
      router.push(obj.path);
    };
    watch(
      () => route.path,
      newVal => {
        const target = menuOptions.value.find(item => item.path === newVal);
        console.log(target, newVal);
        if (target) {
          state.active = target.key;
        }
      }
    );

    return { ...toRefs(state), menuOptions, handleClick };
  }
};
</script>
<style lang="scss" scoped>
.nav-menu {
  color: var(--color-nav-menu);
  &-item {
    text-align: center;
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAPRSURBVFiF7ZZNa11VFIafd59z7kebD/NVQhtIKS21VYsS6MiUSNsEaxWLpIIgCIL+CcF26k9woELRlGQgtNbixAYshmKDipIOTEOpVWraJDdfvefee85eDm4iTUggN00m0jXaB9Y++9nv2vvdS2bG43Ee3I8XyJdTIiAefo+SwcqkLQw9DvDKMGHuPh0Vx4vO0+6N22HK7w1ZJgf7SbcDIFzx9YDWBN7H87rBDjmmUsdXc/AlML0dAG55IKHA0wC8LNgjmJHRKegupTRIaFsBAAKPA/KIeS9+MFgwT0M2WKXUFsZaPzaMRFAAUgnnK9uze1ilwH8AYOZITcig3kfs7b5A+9khMmJrYVYoUAYCMFXJUjNC4JDznMsEXJ81rvQOMHksZfbRIR6OdpE86RVdr7beUooSD03kzNjjxDvecxKxkAkYyY7z9fFxpvuMYnaOqcsfUNwMjMD03CBR8wKNUR0vOM8nZuQwPgJ2S2RNSMabwG4gh0gxJkyYPOMOLjaGjAz2U6xZgVe/JRPP8azL0aeUYwYdgnGJexXjejbAW0hoFW74hL04Dss4A+yTkSL2eyNcrHBb4q5ZbSqEySwtzngXOI0QnjHgknLcHT7DlFXPhPqHKNw1fqsL+FnGnFKcF7EZHzrHkWJKa/8g96A2xwxDka/AQSAj4/NEXKWOO21FZpZramD0U5aodN3kj10TfEYMPk+HE2+Z0eg8OyZmcDUDeIdIiICiAn7JlLj13WkW10pekrdCFw8kdPwiTeYpS6CQYF9T7VfUlUpgwiO8h3I53fgOXIrJVfMFwcL9TQC4CJOqUvvKmsa0/uQIwy8Bi6BYvxmAtGq9CJzIzLduHCIp4kzVfBM+P1+7DzgiEqs+tc5Ee31CZiMTe64RuAwNTjRjJImnUJyuvWdwLiYW3JHhcLyULdH5xjfs0Pm1lRDo1FWy7h86DboxGhF/ZQMKw+dqBwinmlh4ZpFRjD4ZJ1Jw5UWunDzA2IkB5tI8pfqQMn9DspOwN6DRO/YLXsPoNRGb+L6UUKjVhADC0VHiU4e5WU4YQLwN9HjjKAG3MCaimD+LYpI6UhwtEke856igRVDwxpU04VJblplaF4elnvDsEMFsTEsS8rwTvQbdQKOseqolbNkRDQLgEXDDhVy2hF8r7Uxe6yHZNABUa9vzBdkoR7M3Ok0cdNApo8NEmwlzxqx57uD4yVUYm89xf6Sf+EmeZK1uywXq+pRw107yqSdHRNZ7IgAiEhcTz+eYHxmjZB/jN7vwugBrJi01pJs5ZFsCsJ1Rk/U+BXgK8L8E+BehbK1QiZJKywAAAABJRU5ErkJggg==),
      pointer;
    transition: all 0.3s ease;

    &__active {
      position: relative;
      color: var(--color-primary);
      transition: all 0.3s ease;
      &:after {
        content: "";
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        height: 2px;
        background-color: var(--color-primary);
        animation: showActiveLink 1s forwards;
      }
    }

    &:hover {
      color: var(--color-primary);
    }
  }
}
@keyframes showActiveLink {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
