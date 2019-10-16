<template>
  <div class="home h-100">
    <el-container class="h-100">
      <el-aside
        :width="isCollapse ? '64px' : '240px'"
        :style="{ height: '100%', overflowY: 'auto', boxShadow: '2px 0 6px rgba(0,21,41,.35)' }"
      >
        <MyMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-container :style="{ height: 'calc(100% - 60px)'}">
        <el-header class="s-header">
          <div class="d-flex align-items_center">
            <span
              class="cur-pointer p-l-19 fz-24 l-h-60"
              @click="isCollapse = !isCollapse"
              :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
            ></span>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MyMenu from '@/components/Layout/Menu.vue';

export default {
  name: 'home',
  components: {
    MyMenu,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
};
</script>
<style lang="scss">
.home {
  .s-header {
    padding: 0 !important;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
}
</style>
