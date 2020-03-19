<template>
  <el-menu
    :default-active="$route.path"
    class="h-100 s-menu"
    background-color="#001529"
    text-color="rgba(255, 255, 255, 0.65)"
    active-text-color="#fff"
    :collapse="isCollapse"
    style="border-right: none"
    router
  >
    <div class="admin-title h-px-60">
      Sanmi
      <span v-show="!isCollapse">Admin</span>
    </div>
    <template v-for="item in $router.options.routes[0].children">
      <template v-if="!item.children || !item.children.length">
        <el-menu-item :index="item.path" :key="item.name">
          <i :class="item.meta.icon"></i>
          <span v-show="!isCollapse">{{item.meta.title}}</span>
        </el-menu-item>
      </template>
      <template v-else>
        <el-submenu :index="item.path" :key="item.name">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span v-show="!isCollapse">{{item.meta.title}}</span>
          </template>
          <template v-for="val in item.children">
            <el-menu-item :index="val.path" :key="val.name">{{val.meta.title}}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  props: ['isCollapse'],
  created() {
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.s-menu {
  .admin-title {
    line-height: 60px;
    background: #001529;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
  }
  & /deep/ .el-menu-item:focus,
  .el-menu-item:hover {
    color: #fff !important;
  }
  & /deep/ .el-menu-item.is-active {
    background-color: #1890ff !important;
  }
}
</style>
