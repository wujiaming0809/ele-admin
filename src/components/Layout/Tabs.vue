<template>
  <div class="tabs">
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
      <el-tab-pane v-for="item in editableTabs"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      >
      </el-tab-pane>
    </el-tabs>
    <el-dropdown @command="handleDropdown">
      <span class="el-icon-arrow-down handle-btn"></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="closeAll">关闭全部标签页</el-dropdown-item>
        <el-dropdown-item command="closeOther">关闭其他标签页</el-dropdown-item>
        <el-dropdown-item command="closeCurrent">关闭当前标签页</el-dropdown-item>
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
      editableTabsValue: '/home',
      editableTabs: [{ title: '首页', path: '/home' }],
    };
  },
  watch: {
    $route(to) {
      this.createTabs(to);
    },
  },
  computed: {},
  created() {
    this.createTabs(this.$route);
  },
  mounted() {
  },
  methods: {
    createTabs(data) {
      const hasTab = this.editableTabs.some(item => item.title === data.meta.title);
      if (!hasTab) {
        this.editableTabs.push({ title: data.meta.title, path: data.path });
      }
      this.editableTabsValue = data.path;
    },
    tabClick(tab) {
      if (this.$route.path !== tab.name) {
        this.$router.push(tab.name);
      }
    },
    removeTab(path) {
      const arr = this.editableTabs;
      this.editableTabs = this.editableTabs.filter(item => item.path !== path);
      if (arr[arr.length - 1].path === path) {
        this.editableTabsValue = this.editableTabs[this.editableTabs.length - 1].path;
        this.$router.push(this.editableTabs[this.editableTabs.length - 1].path);
      }
    },
    handleDropdown(command) {
      if (this.editableTabs.length > 1) {
        if (command === 'closeAll') {
          this.editableTabs = [{ title: '首页', path: '/home' }];
          this.editableTabsValue = '/home';
          this.$router.push('/home');
        } else if (command === 'closeOther') {
          this.editableTabs = [
            { title: '首页', path: '/home' },
            { title: this.$route.meta.title, path: this.$route.path },
          ];
        } else {
          const index = this.editableTabs.findIndex(item => item.title === this.$route.meta.title);
          this.editableTabsValue = this.editableTabs[index - 1].path;
          this.editableTabs = this.editableTabs.filter(item => item.title !== this.$route.meta.title);
          this.$router.push(this.editableTabsValue);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .tabs {
    width: 100%;
    padding: 6px 20px;
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
    & /deep/ .el-dropdown {
      position: absolute;
      right: 20px;
      top: 66px;
      .handle-btn {
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background-color: #fff;
        border-radius: 2px;
      }
    }
  }
</style>
