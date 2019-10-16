<template>
  <el-menu
    :default-openeds="['1', '3']"
    class="h-100 s-menu"
    background-color="#001529"
    text-color="rgba(255, 255, 255, 0.65)"
    active-text-color="#fff"
    :collapse="isCollapse"
    style="border-right: none"
  >
    <div class="admin-title h-px-60">
      Sanmi
      <span v-show="!isCollapse">Admin</span>
    </div>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-message"></i>
        <span v-show="!isCollapse">导航一</span>
      </template>
      <el-menu-item index="1-1">选项1</el-menu-item>
      <el-menu-item index="1-2">选项2</el-menu-item>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项4-1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span v-show="!isCollapse">导航二</span>
      </template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项4-1</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span v-show="!isCollapse">导航三</span>
      </template>
      <el-menu-item index="3-1">选项1</el-menu-item>
      <el-menu-item index="3-2">选项2</el-menu-item>
      <el-submenu index="3-4">
        <template slot="title">选项4</template>
        <el-menu-item index="3-4-1">选项4-1</el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'menu',
  props: ['isCollapse'],
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.s-menu {
  .admin-title {
    line-height: 60px;
    background: #001529;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
  }
}
.el-menu-item:focus,
.el-menu-item:hover {
  color: #fff !important;
}
.el-menu-item.is-active {
  background-color: #1890ff !important;
}
</style>
