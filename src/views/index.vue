<template>
  <div class="home h-100">
    <el-container class="h-100">
      <el-aside
        :width="isCollapse ? '64px' : '240px'"
        :style="{ height: '100%', overflowY: 'auto', boxShadow: '2px 0 6px rgba(0,21,41,.35)' }"
      >
        <MyMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="s-header">
          <div class="header-box">
            <div class="header-box__left">
              <span
                class="cur-pointer p-l-19 fz-24 l-h-60"
                @click="isCollapse = !isCollapse"
                :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
              ></span>
            </div>
            <div class="header-box__center"></div>
            <div class="header-box__right"></div>
          </div>
        </el-header>
        <el-main>
          <router-view class="h-100" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MyMenu from '@/components/Layout/Menu.vue';
// import HeaderRight from '@/components/Layout/HeaderRight.vue';

export default {
  name: 'home',
  components: {
    MyMenu,
    // HeaderRight,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
};
</script>
<style scoped lang="scss">
  .header-box {
    width: 100%;
    height: 100%;
    position: relative;
    .header-box__left {
      position: absolute;
      left: 0;
      top: 0;
      width: 80px;
    }
    .header-box__center {
    }
  }
</style>
<style lang="scss">
.home {
  .s-header {
    padding: 0 !important;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
}
</style>
