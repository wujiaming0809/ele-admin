<template>
  <div class="tabs">
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
      <el-tab-pane v-for="item in editableTabs"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
      </el-tab-pane>
<!--      <el-dropdown>-->
<!--        <span class="el-icon-arrow-down handle-btn"></span>-->
<!--        <el-dropdown-menu slot="dropdown">-->
<!--          <el-dropdown-item>黄金糕</el-dropdown-item>-->
<!--          <el-dropdown-item>狮子头</el-dropdown-item>-->
<!--          <el-dropdown-item>螺蛳粉</el-dropdown-item>-->
<!--          <el-dropdown-item disabled>双皮奶</el-dropdown-item>-->
<!--          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>-->
<!--        </el-dropdown-menu>-->
<!--      </el-dropdown>-->
    </el-tabs>
    <el-dropdown>
      <span class="el-icon-arrow-down handle-btn"></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  components: {},
  data() {
    return {
      editableTabsValue: '/',
      editableTabs: [{ title: '首页', path: '/' }],
    };
  },
  watch: {},
  computed: {},
  created() {
  },
  mounted() {
  },
  methods: {
    removeTab(path) {
      console.log({ path });
    },
  },
};
</script>

<style scoped lang="scss">
  .tabs {
    width: 100%;
    padding: 6px 20px 6px 0;
    .tabs-active {
      color: #1890ff;
    }
    & /deep/ .el-tabs {
      margin-right: 45px;
      .el-tabs__header {
        margin: 0;
      }
      .el-tabs__item {
        height: 32px;
        line-height: 32px;
        background: #fff;
        border-radius: 3px;
        border: none;
        margin-right: 10px;
        &:first-of-type {
          .el-icon-close {
            display: none;
          }
        }
        &:hover {
          padding: 0 20px;
        }
      }
    }
    & /deep/ .el-tabs--card>.el-tabs__header {
      border-bottom: none;
      .el-tabs__nav {
        border: none;
      }
      .el-tabs__nav-next, .el-tabs__nav-prev {
        line-height: 36px;
      }
    }
    /*& /deep/ .el-dropdown {*/
    /*  position: absolute;*/
    /*  right: 20px;*/
    /*  top: 66px;*/
    /*  .handle-btn {*/
    /*    width: 32px;*/
    /*    height: 32px;*/
    /*    line-height: 32px;*/
    /*    text-align: center;*/
    /*    background-color: #fff;*/
    /*    border-radius: 2px;*/
    /*  }*/
    /*}*/
  }
</style>
